document.addEventListener('DOMContentLoaded', () => {
  // 1. Highlight nav active link
  const current = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === current || (current === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 2. Dynamic year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // 3. Dark Mode Toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  // 4. Scroll-to-top Button
  const topBtn = document.getElementById('to-top');
  window.addEventListener('scroll', () => {
    topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // 5. Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 6. Form validation
  const form = document.querySelector('form');
  form.addEventListener('submit', e => {
    let valid = true;
    form.querySelectorAll('.error').forEach(el => el.remove());
    form.querySelectorAll('input, textarea').forEach(f => {
      f.classList.remove('error');
      if (!f.value.trim()) {
        valid = false;
        const msg = document.createElement('div');
        msg.className = 'error';
        msg.innerText = `${f.previousElementSibling.innerText} è richiesto.`;
        f.classList.add('error');
        f.parentNode.append(msg);
      }
      if (f.type === 'email' && f.value) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(f.value)) {
          valid = false;
          const msg = document.createElement('div');
          msg.className = 'error';
          msg.innerText = `Inserisci un indirizzo email valido.`;
          f.classList.add('error');
          f.parentNode.append(msg);
        }
      }
    });
    if (!valid) e.preventDefault();
  });
});

