// Task 4: Complex Form Validation and Dynamic DOM Manipulation
// - Enhanced form validation (password strength)
// - Dynamic DOM updates based on user interactions
// - Client-side routing (no full page reload)

const appEl = document.getElementById('app');
const navLinks = document.querySelectorAll('nav a');

// In-memory "registered users" list (dynamic DOM demo)
let users = [];

const routes = {
  home: renderHome,
  register: renderRegister,
  profile: renderProfile
};

function navigate(route) {
  navLinks.forEach(a => a.classList.toggle('active', a.dataset.route === route));
  window.history.pushState({ route }, '', `#${route}`);
  (routes[route] || renderHome)();
}

navLinks.forEach(a => {
  a.addEventListener('click', () => navigate(a.dataset.route));
});

window.addEventListener('popstate', (e) => {
  const route = (e.state && e.state.route) || 'home';
  navigate(route);
});

function renderHome() {
  appEl.innerHTML = `
    <h1>Welcome</h1>
    <p>This is a single-page app using client-side routing (no full page reloads).
       Use the nav above to go to <strong>Register</strong> or <strong>Profile</strong>.</p>
    <p>Registered users so far: <strong>${users.length}</strong></p>
  `;
}

function passwordStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0-5
}

function renderRegister() {
  appEl.innerHTML = `
    <h1>Register</h1>
    <form id="regForm">
      <label>Username</label>
      <input id="regUsername" type="text" required minlength="3">
      <small class="hint" id="usernameHint"></small>

      <label>Email</label>
      <input id="regEmail" type="email" required>
      <small class="hint" id="emailHint"></small>

      <label>Password</label>
      <input id="regPassword" type="password" required>
      <div class="strength-bar"><div class="strength-fill" id="strengthFill"></div></div>
      <small id="strengthLabel" style="color:#666;">Strength: -</small>

      <button type="submit">Create Account</button>
    </form>
  `;

  const form = document.getElementById('regForm');
  const pwInput = document.getElementById('regPassword');
  const fill = document.getElementById('strengthFill');
  const label = document.getElementById('strengthLabel');

  const strengthColors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60', '#1abc9c'];
  const strengthText = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'];

  pwInput.addEventListener('input', () => {
    const score = passwordStrength(pwInput.value);
    fill.style.width = `${(score / 5) * 100}%`;
    fill.style.background = strengthColors[score];
    label.textContent = `Strength: ${strengthText[score]}`;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = pwInput.value;

    const usernameHint = document.getElementById('usernameHint');
    const emailHint = document.getElementById('emailHint');
    usernameHint.textContent = '';
    emailHint.textContent = '';

    let valid = true;
    if (username.length < 3) {
      usernameHint.textContent = 'Username must be at least 3 characters.';
      valid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailHint.textContent = 'Enter a valid email address.';
      valid = false;
    }
    if (passwordStrength(password) < 2) {
      alert('Password is too weak. Try adding numbers, symbols, and mixed case.');
      valid = false;
    }
    if (!valid) return;

    // Dynamic DOM manipulation: add new user without reloading page
    users.push({ username, email, id: Date.now() });
    navigate('profile');
  });
}

function renderProfile() {
  appEl.innerHTML = `
    <h1>Registered Users</h1>
    <p>${users.length} user(s) registered this session.</p>
    <ul id="userList"></ul>
  `;

  const list = document.getElementById('userList');

  if (users.length === 0) {
    list.innerHTML = '<li>No users yet. Go to Register to add one.</li>';
    return;
  }

  users.forEach(user => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${user.username} (${user.email})</span>`;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      users = users.filter(u => u.id !== user.id);
      renderProfile(); // re-render DOM dynamically after removal
    });
    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}

// Initial route (support deep-linking via hash)
const initialRoute = window.location.hash.replace('#', '') || 'home';
navigate(routes[initialRoute] ? initialRoute : 'home');
