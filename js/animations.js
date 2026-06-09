/* Stackly - Animation Initializers (safe: content always visible) */
document.addEventListener('DOMContentLoaded', () => {
  ensureVisible();
  initAOS();
  initGSAP();
  initCarousels();
  initIsotope();
  initJarallax();
  initMagnific();
  initCountdown();
  initNoUiSlider();
  initFAQ();
  initCircleType();
  initHeroSlider();

  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') AOS.refresh();
    setTimeout(() => {
      ensureVisible();
      document.body.classList.add('anim-ready');
    }, 1200);
  });
});

/* Force all content visible if animations fail or conflict */
function ensureVisible() {
  document.querySelectorAll('[data-aos], .feature-card, .product-card, .blog-card, .stat-item, .gallery-item, .faq-item, .dashboard-section, .appear-item').forEach(el => {
    el.style.opacity = '1';
    el.style.visibility = 'visible';
    el.style.transform = 'none';
  });
  document.querySelectorAll('.gallery-grid, .products-grid').forEach(el => {
    el.style.opacity = '1';
    el.style.height = 'auto';
  });
}

function initAOS() {
  if (typeof AOS === 'undefined') return;
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 40,
    mirror: false,
    disable: false,
    anchorPlacement: 'top-bottom'
  });
}

function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  /* Hero vegetable 3D — homepage only */
  const vegItems = document.querySelectorAll('.hero .veg-item');
  if (vegItems.length) {
    vegItems.forEach((item, i) => {
      gsap.set(item, { transformPerspective: 900 });

      gsap.to(item, {
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
        rotationY: 180 + i * 40,
        rotationX: 90 + i * 20,
        y: -40 - i * 10,
        ease: 'none'
      });

      gsap.to(item, {
        y: '+=18',
        duration: 2 + i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2
      });
    });
  }

  /* Subtle motion only — never hide opacity */
  gsap.utils.toArray('.feature-card, .product-card, .blog-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' },
      y: 30,
      duration: 0.6,
      delay: (i % 4) * 0.05,
      ease: 'power2.out',
      immediateRender: false
    });
  });

  /* Counter animation — preserve final value */
  gsap.utils.toArray('.stat-item h3').forEach(stat => {
    const raw = stat.textContent.trim();
    const target = parseInt(raw.replace(/[^0-9]/g, '')) || 0;
    if (target > 0 && target < 100000) {
      const suffix = raw.replace(/[0-9]/g, '');
      const obj = { val: 0 };
      gsap.to(obj, {
        scrollTrigger: { trigger: stat, start: 'top 88%', toggleActions: 'play none none none' },
        val: target,
        duration: 1.8,
        ease: 'power1.out',
        onUpdate: () => { stat.textContent = Math.ceil(obj.val) + suffix; }
      });
    }
  });

  /* Hero text entrance — homepage */
  const heroTitle = document.querySelector('.hero .hero-title');
  if (heroTitle) {
    gsap.from('.hero .hero-tag', { x: -20, duration: 0.7, ease: 'power2.out' });
    gsap.from(heroTitle, { y: 30, duration: 0.8, delay: 0.15, ease: 'power2.out' });
    gsap.from('.hero .hero-desc', { y: 15, duration: 0.7, delay: 0.35, ease: 'power2.out' });
    gsap.from('.hero .btn-primary', { y: 10, duration: 0.5, delay: 0.5, ease: 'power2.out' });
  }

  gsap.utils.toArray('.dashboard-section').forEach((section) => {
    gsap.from(section, {
      scrollTrigger: { trigger: section, start: 'top 92%', toggleActions: 'play none none none' },
      y: 24,
      duration: 0.5,
      ease: 'power2.out',
      immediateRender: false
    });
  });
}

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length <= 1) return;
  let current = 0;
  const prev = document.querySelector('.hero-prev');
  const next = document.querySelector('.hero-next');

  function showSlide(index) {
    slides.forEach((s, i) => { s.style.display = i === index ? 'grid' : 'none'; });
    current = index;
  }
  showSlide(0);
  if (prev) prev.addEventListener('click', () => showSlide((current - 1 + slides.length) % slides.length));
  if (next) next.addEventListener('click', () => showSlide((current + 1) % slides.length));
  setInterval(() => showSlide((current + 1) % slides.length), 7000);
}

function initCarousels() {
  if (typeof $ === 'undefined') return;

  $('.owl-carousel:not(.products-grid)').owlCarousel({
    loop: true, margin: 24, nav: true, dots: true, autoplay: true, autoplayTimeout: 4000,
    responsive: { 0: { items: 1 }, 480: { items: 2 }, 768: { items: 3 }, 1024: { items: 4 } }
  });

  if ($.fn.slick) {
    $('.slick-slider').each(function () {
      if (!$(this).hasClass('slick-initialized')) {
        $(this).slick({ dots: true, infinite: true, speed: 500, slidesToShow: 1, autoplay: true, arrows: true });
      }
    });
  }

  if (typeof tns !== 'undefined') {
    document.querySelectorAll('.tiny-slider').forEach(el => {
      if (!el.classList.contains('tns-slider')) {
        tns({ container: el, items: 1, slideBy: 1, autoplay: true, controls: true, nav: true, responsive: { 640: { items: 2 }, 900: { items: 3 } } });
      }
    });
  }
}

function initIsotope() {
  if (typeof $ === 'undefined' || !$.fn.isotope) return;
  const grid = $('.gallery-grid');
  if (!grid.length) return;
  if (grid.data('isotope')) return;

  const run = () => grid.isotope({ itemSelector: '.gallery-item', layoutMode: 'fitRows', percentPosition: true });

  if (typeof imagesLoaded !== 'undefined') {
    grid.imagesLoaded(run);
  } else {
    run();
  }

  $('.filter-btn').on('click', function () {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    grid.isotope({ filter: $(this).data('filter') || '*' });
  });
}

function initJarallax() {
  if (typeof jarallax !== 'undefined') {
    jarallax(document.querySelectorAll('.jarallax'));
  }
}

function initMagnific() {
  if (typeof $ !== 'undefined' && $.fn.magnificPopup) {
    $('.popup-image').magnificPopup({ type: 'image', gallery: { enabled: true } });
  }
}

function initCountdown() {
  const el = document.getElementById('countdown');
  if (!el || typeof $ === 'undefined' || !$.fn.countdown) return;
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);
  $(el).countdown(endDate, function (event) {
    $(this).html(
      `<div class="countdown-item"><span>${event.strftime('%D')}</span><small>Days</small></div>` +
      `<div class="countdown-item"><span>${event.strftime('%H')}</span><small>Hours</small></div>` +
      `<div class="countdown-item"><span>${event.strftime('%M')}</span><small>Minutes</small></div>` +
      `<div class="countdown-item"><span>${event.strftime('%S')}</span><small>Seconds</small></div>`
    );
  });
}

function initNoUiSlider() {
  const slider = document.getElementById('price-slider');
  if (!slider || typeof noUiSlider === 'undefined' || slider.noUiSlider) return;
  noUiSlider.create(slider, {
    start: [10, 100], connect: true, range: { min: 0, max: 200 }, step: 5,
    format: typeof wNumb !== 'undefined' ? wNumb({ decimals: 0, prefix: '₹' }) : undefined
  });
  const minEl = document.getElementById('price-min');
  const maxEl = document.getElementById('price-max');
  if (minEl && maxEl) {
    slider.noUiSlider.on('update', (values) => {
      minEl.textContent = '₹' + Math.round(values[0]);
      maxEl.textContent = '₹' + Math.round(values[1]);
    });
  }
}

function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });
}

function initCircleType() {
  try {
    if (typeof CircleType !== 'undefined') {
      const el = document.querySelector('.curved-text');
      if (el) new CircleType(el).radius(90);
    }
    if (typeof $ !== 'undefined' && $.fn.lettering) {
      $('.lettering-text').lettering();
    }
  } catch (e) { /* circletype optional */ }
}
