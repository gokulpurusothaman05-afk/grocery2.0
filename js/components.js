/* Stackly - Shared Header & Footer Components */
const STACKLY_NAV = [
  { name: 'Home', href: 'index.html' },
  { name: 'Shop', href: 'shop.html' },
  { name: 'Pages', href: 'pages.html' },
  { name: 'Blog', href: 'blog.html' },
  { name: 'Brand', href: 'brand.html' },
  { name: 'Flash Sale', href: 'flash-sale.html' },
  { name: 'Contact', href: 'contact.html' }
];

const VALID_PAGES = [
  'index.html', 'shop.html', 'pages.html', 'blog.html', 'brand.html',
  'flash-sale.html', 'contact.html', 'login.html', 'signup.html',
  '404.html', 'admin-dashboard.html', 'client-dashboard.html'
];

function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  return page;
}

function isDashboardPage() {
  const page = getCurrentPage();
  return page === 'admin-dashboard.html' || page === 'client-dashboard.html';
}

function renderHeader() {
  if (isDashboardPage()) return;

  const current = getCurrentPage();
  const navLinks = STACKLY_NAV.map(item =>
    `<a href="${item.href}" class="${current === item.href ? 'active' : ''}">${item.name}</a>`
  ).join('');

  const header = document.getElementById('site-header');
  if (!header) return;

  header.innerHTML = `
    <div class="header-inner">
      <a href="index.html" class="logo">Stack<span>ly</span>.</a>
      <button class="nav-toggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
      <nav class="main-nav" id="main-nav">
        ${navLinks}
        <div class="nav-auth-mobile">
          <a href="login.html" class="btn-auth btn-login">Login</a>
          <a href="signup.html" class="btn-auth btn-signup">Sign Up</a>
        </div>
      </nav>
      <div class="header-actions">
        
        <div class="header-auth">
          <a href="login.html" class="btn-auth btn-login">Login</a>
          <a href="signup.html" class="btn-auth btn-signup">Sign Up</a>
        </div>
      </div>
    </div>`;

  const toggle = header.querySelector('.nav-toggle');
  const nav = header.querySelector('.main-nav');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('open');
    });
  });

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  const navCols = STACKLY_NAV.map(item =>
    `<li><a href="${item.href}">${item.name}</a></li>`
  ).join('');

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="logo">Stack<span>ly</span>.</a>
          <p>Your trusted organic grocery partner. We bring the freshest produce from local farms directly to your family's table with care and sustainability.</p>
          <div class="footer-social">
            <a href="404.html" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="404.html" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
            <a href="404.html" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="404.html" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>${navCols}</ul>
        </div>
        <div class="footer-col">
          <h4>Account</h4>
          <ul>
            <li><a href="login.html">Login</a></li>
            <li><a href="signup.html">Sign Up</a></li>
            <li><a href="client-dashboard.html">Client Dashboard</a></li>
            <li><a href="admin-dashboard.html">Admin Dashboard</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact Us</h4>
          <ul>
            <li><i class="fas fa-map-marker-alt"></i> 123 Anna Salai, Chennai, Tamil Nadu</li>
            <li><i class="fas fa-phone"></i> (+91) 98765 43210</li>
            <li><i class="fas fa-envelope"></i> hello@stackly.com</li>
            <li><i class="fas fa-clock"></i> Mon - Sat: 8AM - 10PM</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} Stackly. All rights reserved.</span>
        <span>Made with <a href="index.html">fresh ingredients</a></span>
      </div>
    </div>`;
}

function checkValidPage() {
  const page = getCurrentPage();
  if (!VALID_PAGES.includes(page) && page !== '') {
    window.location.href = '404.html';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  checkValidPage();
});
