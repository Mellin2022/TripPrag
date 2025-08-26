(function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav toggle
  const nav = document.querySelector('.nav');
  const navBtn = document.getElementById('nav-toggle');
  if (nav && navBtn) {
    navBtn.addEventListener('click', () => {
      const opened = nav.classList.toggle('nav--open');
      navBtn.setAttribute('aria-expanded', String(opened));
    });
  }

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme') || 'auto';
      const next = current === 'light' ? 'auto' : current === 'auto' ? 'dark' : 'light';
      html.setAttribute('data-theme', next);
      themeToggle.blur();
    });
  }

  // Reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Quiz logic
  const form = document.getElementById('quiz');
  const scoreOut = document.getElementById('score');
  const showBtn = document.getElementById('show-answers');

  function normalize(s){ return (s || '').trim().toLowerCase().replace(/[\s\-_.]+/g,' '); }

  if (showBtn) {
    showBtn.addEventListener('click', () => {
      document.querySelectorAll('#quiz .a').forEach(p => p.classList.toggle('shown'));
    });
  }

  if (form) {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const answers = [
        { id: 'q1', acceptable: ['moldau','vltava'] },
        { id: 'q2', acceptable: ['beliebig',''] }, // any
        { id: 'q3', acceptable: ['veitsdom','kathedrale des heiligen veit','st. veit','st veit','heiliger veit'] },
        { id: 'q4', acceptable: ['love','peace','láska','mir','friede'] },
        { id: 'q5', acceptable: ['beliebig',''] }, // any
      ];
      let points = 0;
      answers.forEach(a => {
        const val = normalize((document.getElementById(a.id) || {}).value);
        if (a.acceptable.includes('beliebig')) { if (val) points += 1; }
        else if (a.acceptable.some(acc => normalize(acc) === val)) { points += 1; }
      });
      const total = answers.length;
      const pct = Math.round((points/total)*100);
      if (scoreOut) scoreOut.textContent = `Score: ${points}/${total} (${pct}%) – ${pct>=80?'Top!':'Weiter so!'} `;
    });
  }
})();