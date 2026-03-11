'use strict';

// ============================================================
// AUTENTICAÇÃO — Vivaci Estética Avançada
// ============================================================

const AUTH_SESSION_KEY = 'vivaci_session';
const AUTH_USERS_KEY   = 'vivaci_users';
const SESSION_TTL      = 8 * 60 * 60 * 1000; // 8 horas

// Admins padrão — sempre garantidos no localStorage
const ADMINS_PADRAO = [
  {
    id:    'admin',
    nome:  'Dra. Natália Mendes',
    login: 'natalia',
    senha: 'Vivaci@2026',
    role:  'admin',
  },
  {
    id:    'eduardo',
    nome:  'Eduardo Mendes',
    login: 'eduardo',
    senha: 'Vivaci@2026',
    role:  'admin',
  },
];

// ------------------------------------------------------------
// Inicializa base de usuários — upsert (adiciona quem não existe)
// ------------------------------------------------------------
function authInit() {
  const users = JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || '[]');
  let changed = false;
  ADMINS_PADRAO.forEach(padrao => {
    if (!users.find(u => u.id === padrao.id)) {
      users.push(padrao);
      changed = true;
    }
  });
  if (changed || users.length === 0) {
    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
  }
}

function getUsers() {
  return JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || '[]');
}

function saveUsers(users) {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

// ------------------------------------------------------------
// Login / Logout / Sessão
// ------------------------------------------------------------
function authLogin(loginInput, senha) {
  const users = getUsers();
  const user = users.find(u => u.login.toLowerCase() === loginInput.trim().toLowerCase());
  if (!user)         return { ok: false, msg: 'Usuário não encontrado.' };
  if (user.senha !== senha) return { ok: false, msg: 'Senha incorreta.' };

  const session = {
    userId: user.id,
    nome:   user.nome,
    login:  user.login,
    role:   user.role,
    expiry: Date.now() + SESSION_TTL,
  };
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  return { ok: true, session };
}

function authLogout() {
  localStorage.removeItem(AUTH_SESSION_KEY);
  location.reload();
}

function getSession() {
  try {
    const s = JSON.parse(localStorage.getItem(AUTH_SESSION_KEY) || 'null');
    if (!s) return null;
    if (Date.now() > s.expiry) {
      localStorage.removeItem(AUTH_SESSION_KEY);
      return null;
    }
    return s;
  } catch { return null; }
}

function isAdmin() {
  const s = getSession();
  return s?.role === 'admin';
}

// ------------------------------------------------------------
// Tela de Login
// ------------------------------------------------------------
function showLoginScreen() {
  const overlay = document.getElementById('login-screen');
  if (overlay) overlay.classList.remove('hidden');
  document.getElementById('app').classList.add('hidden');
}

function hideLoginScreen() {
  const overlay = document.getElementById('login-screen');
  if (overlay) overlay.classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
}

function tentarLogin() {
  const loginInput = document.getElementById('auth-login').value;
  const senhaInput = document.getElementById('auth-senha').value;
  const btn = document.getElementById('auth-btn');
  const err = document.getElementById('auth-erro');

  if (!loginInput || !senhaInput) {
    err.textContent = 'Preencha login e senha.';
    err.classList.remove('hidden');
    return;
  }

  // Animação de loading
  btn.disabled = true;
  btn.innerHTML = '<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Entrando...';

  setTimeout(() => {
    const result = authLogin(loginInput, senhaInput);
    if (result.ok) {
      err.classList.add('hidden');
      // Fade out
      const overlay = document.getElementById('login-screen');
      overlay.style.transition = 'opacity 0.4s';
      overlay.style.opacity = '0';
      setTimeout(() => {
        hideLoginScreen();
        initApp(); // chama o init do sistema principal
      }, 400);
    } else {
      err.textContent = result.msg;
      err.classList.remove('hidden');
      btn.disabled = false;
      btn.innerHTML = 'Entrar';
      document.getElementById('auth-senha').value = '';
      document.getElementById('auth-senha').focus();
      // Shake animation
      const card = document.getElementById('login-card');
      card.style.animation = 'shake 0.4s ease';
      setTimeout(() => card.style.animation = '', 400);
    }
  }, 600);
}

// Enter para logar
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !document.getElementById('login-screen').classList.contains('hidden')) {
    tentarLogin();
  }
});

// ------------------------------------------------------------
// Modal: Alterar Senha (somente admin)
// ------------------------------------------------------------
function abrirAlterarSenha() {
  showModal(`
    <div class="modal-header">
      <div class="modal-title">🔐 Alterar Senha</div>
      <div class="modal-subtitle">Defina uma nova senha de acesso</div>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">Senha Atual</label>
        <input type="password" id="as-atual" class="form-control" placeholder="••••••••">
      </div>
      <div class="form-group">
        <label class="form-label">Nova Senha</label>
        <input type="password" id="as-nova" class="form-control" placeholder="Mínimo 6 caracteres">
      </div>
      <div class="form-group">
        <label class="form-label">Confirmar Nova Senha</label>
        <input type="password" id="as-confirm" class="form-control" placeholder="Repita a nova senha">
      </div>
      <div id="as-erro" class="hidden text-sm text-red-600 font-medium p-3 rounded-lg" style="background:#fef2f2"></div>
    </div>
    <div class="modal-footer">
      <button class="btn-secondary" onclick="closeModal()">Cancelar</button>
      <button class="btn-primary" onclick="confirmarAlterarSenha()">Salvar Nova Senha</button>
    </div>
  `);
}

function confirmarAlterarSenha() {
  const atual   = document.getElementById('as-atual').value;
  const nova    = document.getElementById('as-nova').value;
  const confirm = document.getElementById('as-confirm').value;
  const erro    = document.getElementById('as-erro');

  const session = getSession();
  const users   = getUsers();
  const user    = users.find(u => u.id === session?.userId);

  if (!user || user.senha !== atual) {
    erro.textContent = 'Senha atual incorreta.';
    erro.classList.remove('hidden'); return;
  }
  if (nova.length < 6) {
    erro.textContent = 'A nova senha deve ter pelo menos 6 caracteres.';
    erro.classList.remove('hidden'); return;
  }
  if (nova !== confirm) {
    erro.textContent = 'As senhas não coincidem.';
    erro.classList.remove('hidden'); return;
  }

  user.senha = nova;
  saveUsers(users);
  closeModal();
  showToast('Senha alterada com sucesso!', 'success');
}

// ------------------------------------------------------------
// Painel do usuário logado (dropdown no header)
// ------------------------------------------------------------
function toggleUserMenu() {
  const menu = document.getElementById('user-menu');
  if (!menu) return;
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
    setTimeout(() => {
      document.addEventListener('click', fecharUserMenu, { once: true });
    }, 50);
  } else {
    menu.classList.add('hidden');
  }
}

function fecharUserMenu(e) {
  const menu = document.getElementById('user-menu');
  const btn  = document.getElementById('user-menu-btn');
  if (menu && !menu.contains(e.target) && btn && !btn.contains(e.target)) {
    menu.classList.add('hidden');
  }
}

// ------------------------------------------------------------
// Bootstrap: roda antes do app principal
// ------------------------------------------------------------
function authBootstrap() {
  authInit();
  const session = getSession();

  if (!session) {
    showLoginScreen();
  } else {
    hideLoginScreen();
    // Atualiza UI do header com nome do usuário
    updateHeaderUser(session);
  }
  return !!session;
}

function updateHeaderUser(session) {
  const nameEl = document.getElementById('header-user-name');
  const avatarEl = document.getElementById('header-user-avatar');
  if (nameEl) nameEl.textContent = session.nome;
  if (avatarEl) {
    const initials = session.nome.split(' ').filter(w => /^[A-Z]/.test(w)).slice(0,2).map(w=>w[0]).join('');
    avatarEl.textContent = initials || 'V';
  }
}
