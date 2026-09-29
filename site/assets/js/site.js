/* Contelb Contabilidade: JavaScript do site (vanilla, sem dependências). */
(() => {
  'use strict';

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const smoothstep = (p, e0, e1) => {
    const t = clamp((p - e0) / (e1 - e0), 0, 1);
    return t * t * (3 - 2 * t);
  };
  const reduzido = matchMedia('(prefers-reduced-motion: reduce)');
  const body = document.body;

  /* ---------- Cabeçalho e menu ---------- */
  const topo = document.querySelector('.topo');
  const menu = document.getElementById('menu');
  const menuBtn = document.querySelector('.menu-btn');
  const subBtn = document.querySelector('.sub-btn');
  let rolou = null;
  function marcaTopo() {
    const r = scrollY > 8;
    if (r !== rolou) { rolou = r; topo.classList.toggle('rolou', r); }
  }
  addEventListener('scroll', marcaTopo, { passive: true });
  marcaTopo();

  function abreMenu(abrir) {
    menuBtn.setAttribute('aria-expanded', String(abrir));
    menuBtn.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('aberto', abrir);
    document.documentElement.classList.toggle('menu-aberto', abrir);
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', () => abreMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) abreMenu(false); });
  }
  if (subBtn) subBtn.addEventListener('click', () => subBtn.setAttribute('aria-expanded', String(subBtn.getAttribute('aria-expanded') !== 'true')));
  addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (menu && menu.classList.contains('aberto')) { abreMenu(false); menuBtn.focus(); }
    if (subBtn && subBtn.getAttribute('aria-expanded') === 'true') subBtn.setAttribute('aria-expanded', 'false');
  });
  const telaLarga = matchMedia('(min-width: 1181px)');
  telaLarga.addEventListener('change', (e) => { if (e.matches) abreMenu(false); });

  /* ---------- Pausa animações com a aba escondida ---------- */
  document.addEventListener('visibilitychange', () => body.classList.toggle('paused', document.hidden));

  /* ---------- Entradas coreografadas ---------- */
  const revela = new IntersectionObserver((itens) => {
    for (const it of itens) {
      if (!it.isIntersecting) continue;
      const el = it.target;
      el.classList.add('in');
      revela.unobserve(el);
      // aposenta o atraso do escalonamento quando a entrada termina, para hovers responderem na hora
      const atraso = parseFloat(getComputedStyle(el).transitionDelay) || 0;
      setTimeout(() => el.classList.add('feito'), atraso * 1000 + 950);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  document.querySelectorAll('.rv').forEach((el) => revela.observe(el));

  /* ---------- Divisão de títulos em palavras (feita uma vez) ---------- */
  document.querySelectorAll('[data-split]').forEach((el) => {
    const palavras = el.textContent.trim().split(/\s+/);
    const spread = parseFloat(el.dataset.spread) || 0.5;
    el.textContent = '';
    palavras.forEach((p, i) => {
      const w = document.createElement('span');
      w.className = 'w';
      w.textContent = p;
      w.style.setProperty('--th', ((i / Math.max(1, palavras.length - 1)) * spread).toFixed(3));
      el.appendChild(w);
      if (i < palavras.length - 1) el.appendChild(document.createTextNode(' '));
    });
  });

  /* ---------- Linhas que se desenham com o scroll ---------- */
  const linhas = [...document.querySelectorAll('.linha.rola')].map((el) => ({ el, p: -1, visivel: false }));
  let linhasRaf = null;
  function atualizaLinhas() {
    linhasRaf = null;
    if (reduzido.matches) return;
    const vh = innerHeight;
    for (const l of linhas) {
      if (!l.visivel) continue;
      const r = l.el.getBoundingClientRect();
      const p = clamp((vh * 0.95 - r.top) / (vh * 0.75), 0, 1);
      if (Math.abs(p - l.p) > 0.004 || ((p === 0 || p === 1) && p !== l.p)) {
        l.p = p;
        l.el.style.setProperty('--p', p.toFixed(3));
      }
    }
  }
  const pedeLinhas = () => { if (linhasRaf === null) linhasRaf = requestAnimationFrame(atualizaLinhas); };
  if (linhas.length) {
    const ioLinhas = new IntersectionObserver((itens) => {
      for (const it of itens) {
        const l = linhas.find((x) => x.el === it.target);
        if (l) l.visivel = it.isIntersecting;
      }
      pedeLinhas();
    });
    linhas.forEach((l) => ioLinhas.observe(l.el));
    addEventListener('scroll', pedeLinhas, { passive: true });
    addEventListener('resize', pedeLinhas, { passive: true });
  }

  /* ---------- Hero guiado por scroll (só na página inicial) ---------- */
  const hero = document.querySelector('.hero');
  let applyHeroMode = () => {};
  if (hero) {
    const midia = hero.querySelector('.hero-midia');
    const linhaHero = hero.querySelector('.hero-linha');
    const bands = [...hero.querySelectorAll('.band')].map((el, i, arr) => ({
      el,
      a: parseFloat(el.dataset.a),
      b: parseFloat(el.dataset.b),
      ramp: parseFloat(el.dataset.ramp) || 0,
      first: i === 0,
      last: i === arr.length - 1,
      op: -1,
      k: -1,
    }));
    let target = 0, shown = 0, rafId = null, lastTick = 0;
    let heroOnScreen = true, scrubOn = false;
    let lastScale = -1, lastLinha = -1, passouTopo = null;
    let loadK = 0, loadIni = 0, loadRaf = null;
    let faixaVh = 260;

    const heroProgress = () => {
      const total = hero.offsetHeight - innerHeight;
      if (total <= 0) return 0;
      return clamp(-hero.getBoundingClientRect().top / total, 0, 1);
    };
    const mede = () => { faixaVh = Math.max(1, ((hero.offsetHeight - innerHeight) / innerHeight) * 100); };

    function updateCaptions(p) {
      const rampaVh = 18 / faixaVh;       // rampas de uns 18vh de scroll
      const montaVh = 20 / faixaVh;       // o texto assenta uns 20vh dentro da faixa
      for (const b of bands) {
        const len = b.b - b.a;
        const f = Math.min(rampaVh, len / 3);
        let op;
        if (b.first) op = 1 - smoothstep(p, b.b - f, b.b);
        else if (b.last) op = smoothstep(p, b.a, b.a + f);
        else op = smoothstep(p, b.a, b.a + f) * (1 - smoothstep(p, b.b - f, b.b));
        let k = clamp((p - b.a) / (b.ramp || Math.min(montaVh, len * 0.35)), 0, 1);
        if (b.first) k = Math.max(k, loadK);
        if (Math.abs(op - b.op) > 0.003 || ((op === 0 || op === 1) && op !== b.op)) {
          b.op = op;
          b.el.style.opacity = op.toFixed(3);
          b.el.style.visibility = op < 0.01 ? 'hidden' : '';
        }
        if (Math.abs(k - b.k) > 0.008 || ((k === 0 || k === 1) && k !== b.k)) {
          b.k = k;
          b.el.style.setProperty('--k', k.toFixed(3));
        }
      }
    }

    function render(p) {
      const s = 1.02 + 0.28 * p;
      if (Math.abs(s - lastScale) > 0.0004) {
        lastScale = s;
        midia.style.transform = `scale(${s.toFixed(4)})`;
      }
      const lp = clamp(p / 0.92, 0, 1);
      if (Math.abs(lp - lastLinha) > 0.004 || ((lp === 0 || lp === 1) && lp !== lastLinha)) {
        lastLinha = lp;
        linhaHero.style.setProperty('--p', lp.toFixed(3));
      }
      const pt = p > 0.02;
      if (pt !== passouTopo) { passouTopo = pt; hero.classList.toggle('passou-topo', pt); }
      updateCaptions(p);
    }

    function tick(now) {
      const dt = Math.min(100, now - (lastTick || now));
      lastTick = now;
      const k = 0.16;
      shown += (target - shown) * (1 - Math.pow(1 - k, dt / 16.667));
      if (Math.abs(target - shown) < 0.0005) {
        shown = target;
        rafId = null;
        lastTick = 0;
      } else {
        rafId = requestAnimationFrame(tick);
      }
      render(shown);
    }

    function onScroll() {
      target = heroProgress();
      if (rafId === null && heroOnScreen) rafId = requestAnimationFrame(tick);
    }

    // A primeira faixa abre montada: uma rampa única no carregamento passa o bastão para o scroll.
    function rampaCarga(now) {
      if (!loadIni) loadIni = now;
      loadK = clamp((now - loadIni) / 1100, 0, 1);
      updateCaptions(shown);
      loadRaf = loadK < 1 ? requestAnimationFrame(rampaCarga) : null;
    }

    new IntersectionObserver((e) => {
      heroOnScreen = e[0].isIntersecting;
      if (heroOnScreen && scrubOn) onScroll();
    }).observe(hero);

    function limpaInline() {
      midia.style.transform = '';
      linhaHero.style.removeProperty('--p');
      bands.forEach((b) => { b.el.style.opacity = ''; b.el.style.visibility = ''; b.el.style.removeProperty('--k'); });
    }

    function enableScrub() {
      if (scrubOn) return;
      scrubOn = true;
      mede();
      addEventListener('scroll', onScroll, { passive: true });
      addEventListener('resize', onResize, { passive: true });
      bands.forEach((b) => { b.op = -1; b.k = -1; });
      lastScale = -1; lastLinha = -1; passouTopo = null;
      shown = target = heroProgress();
      render(shown);
      if (loadK < 1 && loadRaf === null) loadRaf = requestAnimationFrame(rampaCarga);
      onScroll();
    }
    function disableScrub() {
      if (!scrubOn) return;
      scrubOn = false;
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
      if (loadRaf !== null) { cancelAnimationFrame(loadRaf); loadRaf = null; }
      loadK = 1;
      limpaInline();
    }
    function onResize() { mede(); onScroll(); }

    const GATES = [
      '(max-width: 720px)',
      '(orientation: portrait) and (max-width: 1024px)',
      '(orientation: portrait) and (pointer: coarse)',
      '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
      '(prefers-reduced-motion: reduce)',
    ];
    const MQLS = GATES.map((q) => matchMedia(q));
    applyHeroMode = () => { if (MQLS.some((m) => m.matches)) disableScrub(); else enableScrub(); };
    MQLS.forEach((m) => m.addEventListener('change', applyHeroMode));
    applyHeroMode();
  }

  /* ---------- Movimento reduzido ao vivo, nas duas direções ---------- */
  function pinToFinalStates() {
    if (linhasRaf !== null) { cancelAnimationFrame(linhasRaf); linhasRaf = null; }
    linhas.forEach((l) => { l.el.style.removeProperty('--p'); l.p = -1; });
    document.querySelectorAll('.rv').forEach((el) => el.classList.add('in', 'feito'));
    document.querySelectorAll('.momento-painel:not([hidden])').forEach((p) => p.classList.add('ativo'));
  }
  reduzido.addEventListener('change', (e) => {
    if (e.matches) pinToFinalStates();
    else { linhas.forEach((l) => { l.p = -1; }); pedeLinhas(); applyHeroMode(); }
  });
  if (reduzido.matches) pinToFinalStates();

  /* ---------- Momento interativo: escolha a situação, o caminho se desenha ---------- */
  document.querySelectorAll('.momento-caixa').forEach((caixa) => {
    const abas = [...caixa.querySelectorAll('[role="tab"]')];
    const paineis = abas.map((a) => document.getElementById(a.getAttribute('aria-controls')));
    let atual = 0;
    let visto = reduzido.matches;
    if (!visto) paineis[0].classList.remove('ativo');
    new IntersectionObserver((e, io) => {
      if (!e[0].isIntersecting) return;
      visto = true;
      paineis[atual].classList.add('ativo');
      io.disconnect();
    }, { threshold: 0.35 }).observe(caixa);

    function seleciona(i, foco) {
      if (i === atual) return;
      abas[atual].setAttribute('aria-selected', 'false');
      abas[atual].tabIndex = -1;
      paineis[atual].classList.remove('ativo');
      paineis[atual].hidden = true;
      atual = i;
      abas[i].setAttribute('aria-selected', 'true');
      abas[i].tabIndex = 0;
      paineis[i].hidden = false;
      void paineis[i].offsetWidth;          // reinicia a entrada do painel novo
      if (visto) paineis[i].classList.add('ativo');
      if (foco) abas[i].focus();
    }
    abas.forEach((a, i) => a.addEventListener('click', () => seleciona(i, false)));
    caixa.querySelector('[role="tablist"]').addEventListener('keydown', (e) => {
      const n = abas.length;
      const mapa = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      if (e.key in mapa) { e.preventDefault(); seleciona((atual + mapa[e.key] + n) % n, true); }
      else if (e.key === 'Home') { e.preventDefault(); seleciona(0, true); }
      else if (e.key === 'End') { e.preventDefault(); seleciona(n - 1, true); }
    });
  });

  /* ---------- Formulário: monta a mensagem e abre o WhatsApp (ou o e-mail) ---------- */
  document.querySelectorAll('form.form').forEach((form) => {
    const num = form.dataset.whats;
    const email = form.dataset.email;
    const erro = form.querySelector('.form-erro');
    const ok = form.querySelector('.form-ok');
    const linkEmail = form.querySelector('.form-email');
    const campo = (n) => form.elements[n];
    const valor = (n) => (campo(n) ? campo(n).value.trim() : '');

    function mensagem() {
      const linhasMsg = [
        `Olá, Contelb! Meu nome é ${valor('nome') || '(nome)'}.`,
        valor('interesse') && `Assunto: ${valor('interesse')}`,
        valor('empresa') && `Empresa: ${valor('empresa')}`,
        valor('telefone') && `Telefone: ${valor('telefone')}`,
        valor('email') && `E-mail: ${valor('email')}`,
        valor('mensagem') && `Mensagem: ${valor('mensagem')}`,
        '(Enviado pelo site da Contelb)',
      ];
      return linhasMsg.filter(Boolean).join('\n');
    }
    function atualizaEmail() {
      const assunto = `Contato pelo site${valor('interesse') ? ': ' + valor('interesse') : ''}`;
      linkEmail.href = `mailto:${email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(mensagem())}`;
    }
    form.addEventListener('input', (e) => {
      atualizaEmail();
      if (e.target.getAttribute('aria-invalid') === 'true' && e.target.value.trim()) e.target.removeAttribute('aria-invalid');
    });
    atualizaEmail();

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const obrig = ['nome', 'telefone', 'interesse'].map(campo);
      const faltando = obrig.filter((c) => !c.value.trim());
      obrig.forEach((c) => (c.value.trim() ? c.removeAttribute('aria-invalid') : c.setAttribute('aria-invalid', 'true')));
      if (faltando.length) {
        erro.hidden = false;
        faltando[0].focus();
        return;
      }
      erro.hidden = true;
      const url = `https://wa.me/${num}?text=${encodeURIComponent(mensagem())}`;
      ok.querySelector('.form-ok-link').href = url;
      ok.hidden = false;
      window.open(url, '_blank', 'noopener');
    });
  });

  /* ---------- Mapas carregam só quando o visitante pede ---------- */
  document.querySelectorAll('.mapa-caixa').forEach((caixa) => {
    const btn = caixa.querySelector('.mapa-btn');
    btn.addEventListener('click', () => {
      const f = document.createElement('iframe');
      f.src = caixa.dataset.mapa;
      f.title = caixa.dataset.titulo;
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.allowFullscreen = true;
      caixa.replaceChildren(f);
    });
  });
})();
