/* Stackly - Dashboard Sidebar Navigation */
document.addEventListener('DOMContentLoaded', () => {
  initSidebarNav();
  initSidebarToggle();
  initChartBars();
  initDashboardSelect();
});

function initSidebarNav() {
  const links = document.querySelectorAll('.sidebar-nav a[data-section]');
  const sections = document.querySelectorAll('.dashboard-section');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-section');
      const target = document.getElementById(targetId);

      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (typeof gsap !== 'undefined') {
          gsap.from(target, { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' });
        }
      }

      document.querySelector('.dashboard-sidebar')?.classList.remove('open');
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('data-section') === id);
        });
      }
    });
  }, { rootMargin: '-20% 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));

  if (links.length) links[0].classList.add('active');
}

function initSidebarToggle() {
  const toggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.dashboard-sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      const opened = sidebar.classList.toggle('open');
      manageBackdrop(opened);
    });
    const isMobileSidebar = () => window.innerWidth < 1024;

    if (isMobileSidebar()) {
      sidebar.classList.remove('open');
      removeBackdrop();
    }

    window.addEventListener('resize', () => {
      if (isMobileSidebar()) {
        sidebar.classList.remove('open');
        removeBackdrop();
      }
    });
  }
}

function manageBackdrop(show) {
  let backdrop = document.querySelector('.sidebar-backdrop');
  if (show) {
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'sidebar-backdrop';
      document.body.appendChild(backdrop);
      // prevent body scrolling while sidebar is open
      document.body.classList.add('sidebar-open');
      backdrop.addEventListener('click', () => {
        document.querySelector('.dashboard-sidebar')?.classList.remove('open');
        removeBackdrop();
      });
      // small timeout to allow CSS transition
      requestAnimationFrame(() => backdrop.classList.add('show'));
    }
  } else {
    removeBackdrop();
  }
}

function removeBackdrop() {
  const backdrop = document.querySelector('.sidebar-backdrop');
  if (backdrop) {
    backdrop.classList.remove('show');
    setTimeout(() => { if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop); }, 200);
  }
  // restore body scrolling
  document.body.classList.remove('sidebar-open');
}

function initChartBars() {
  const bars = document.querySelectorAll('.chart-bar');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bars.forEach(bar => {
          const h = bar.dataset.height || '50%';
          bar.style.height = h;
        });
      }
    });
  }, { threshold: 0.3 });

  const chart = document.querySelector('.dash-chart-placeholder');
  if (chart) observer.observe(chart);
}

function initDashboardSelect() {
  if (typeof $ !== 'undefined' && $.fn.selectpicker) {
    $('.selectpicker').selectpicker();
  }
}
