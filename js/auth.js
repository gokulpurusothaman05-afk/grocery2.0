/* Stackly - Auth Logic */
document.addEventListener('DOMContentLoaded', () => {
  initSignup();
  initLogin();
  initDatePicker();
});

function initSignup() {
  const form = document.getElementById('signup-form');
  if (!form) return;

  const password = form.querySelector('#password');
  const strengthBar = form.querySelector('.password-strength .bar');

  if (password && strengthBar) {
    password.addEventListener('input', () => {
      const val = password.value;
      let strength = 0;
      if (val.length >= 8) strength++;
      if (/[A-Z]/.test(val)) strength++;
      if (/[0-9]/.test(val)) strength++;
      if (/[^A-Za-z0-9]/.test(val)) strength++;
      const colors = ['#E53935', '#FB8C00', '#FDD835', '#43A047'];
      const widths = ['25%', '50%', '75%', '100%'];
      strengthBar.style.width = widths[strength - 1] || '0';
      strengthBar.style.background = colors[strength - 1] || '#E0E0E0';
    });
  }

  if (typeof $ !== 'undefined' && $.fn.validate) {
    $('#signup-form').validate({
      rules: {
        fullname: { required: true, minlength: 2 },
        email: { required: true, email: true },
        password: { required: true, minlength: 8 },
        confirm_password: { required: true, equalTo: '#password' },
        phone: { required: true, minlength: 10 }
      },
      messages: {
        fullname: 'Please enter your full name',
        email: 'Please enter a valid email',
        password: 'Password must be at least 8 characters',
        confirm_password: 'Passwords do not match',
        phone: 'Please enter a valid phone number'
      },
      errorPlacement: function (error, element) {
        const msg = element.siblings('.error-msg');
        if (msg.length) { msg.text(error.text()).addClass('show'); }
        element.addClass('error');
      },
      success: function (label, element) {
        $(element).removeClass('error');
        $(element).siblings('.error-msg').removeClass('show');
      },
      submitHandler: function () {
        window.location.href = '404.html';
      }
    });
  } else {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const email = data.get('email');
      const pass = data.get('password');
      const confirm = data.get('confirm_password');
      if (email && pass && pass.length >= 8 && pass === confirm) {
        window.location.href = '404.html';
      }
    });
  }
}

function initLogin() {
  const form = document.getElementById('login-form');
  if (!form) return;

  if (typeof $ !== 'undefined' && $.fn.validate) {
    $('#login-form').validate({
      rules: {
        email: { required: true, email: true },
        password: { required: true, minlength: 6 }
      },
      submitHandler: function () {
          const role = document.querySelector('#role')?.value || 'client';
          if (role === 'admin') {
            window.location.href = 'admin-dashboard.html';
          } else {
            window.location.href = 'client-dashboard.html';
          }
        }
    });
  } else {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('#email').value;
      const pass = form.querySelector('#password').value;
        const role = form.querySelector('#role')?.value || 'client';
        if (email && pass.length >= 6) {
          if (role === 'admin') {
            window.location.href = 'admin-dashboard.html';
          } else {
            window.location.href = 'client-dashboard.html';
          }
        }
    });
  }
}

function initDatePicker() {
  if (typeof $ !== 'undefined' && $.fn.datepicker) {
    $('.datepicker').datepicker({
      dateFormat: 'mm/dd/yy',
      changeMonth: true,
      changeYear: true
    });
  }
}
