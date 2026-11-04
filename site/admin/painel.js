/* Painel do blog da Contelb. Fala com /admin/api.php (PHP na hospedagem).
   O login é por e-mail e senha; nenhum segredo fica neste arquivo. */
const $ = (id) => document.getElementById(id);

let posts = [], current = null, dirty = false, busy = false, uploadCover = false, selection, csrf = null;

const allowedHTML = { ADD_TAGS: ['iframe', 'video', 'source'], ADD_ATTR: ['allowfullscreen', 'controls', 'preload'] };
const clean = (html) => DOMPurify.sanitize(html, allowedHTML);
const notify = (text) => { $('message').textContent = text; };
const slugify = (value) => value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 240);

async function api(acao, options = {}) {
  const headers = { ...options.headers };
  if (csrf) headers['X-CSRF-Token'] = csrf;
  const response = await fetch(`/admin/api.php?acao=${acao}`, { credentials: 'same-origin', ...options, headers });
  let data = {};
  try { data = await response.json(); } catch { /* resposta sem JSON */ }
  if (response.status === 401 && acao !== 'entrar') signedIn(null);
  if (!response.ok) throw Error(data.error || 'Não foi possível concluir a operação.');
  return data;
}

function renderList() {
  $('posts').replaceChildren();
  const query = $('search').value.toLocaleLowerCase();
  for (const p of posts.filter((p) => p.titulo.toLocaleLowerCase().includes(query))) {
    const li = document.createElement('li'), button = document.createElement('button'), small = document.createElement('small');
    button.textContent = p.titulo;
    small.textContent = `${p.status === 'published' ? 'Publicado' : 'Rascunho'} · ${p.data.slice(0, 10)}`;
    button.append(small);
    button.onclick = () => edit(p);
    li.append(button);
    $('posts').append(li);
  }
}

async function load() {
  try { const data = await api('posts'); posts = data.posts; renderList(); notify(''); }
  catch (error) { notify(error.message); }
}

function edit(post) {
  if (busy || (dirty && !confirm('Descartar as alterações ainda não salvas?'))) return;
  current = post ? structuredClone(post) : null;
  $('empty').hidden = true;
  $('editing').hidden = false;
  for (const key of ['titulo', 'slug', 'resumo', 'capa']) $(key).value = post?.[key] || '';
  $('slug').readOnly = !!post;
  $('cat').value = post?.cat || 'noticia';
  const now = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  const d = post?.data;
  $('date').value = d ? `${d.slice(6, 10)}-${d.slice(3, 5)}-${d.slice(0, 2)}T${d.slice(11)}` : now;
  $('body').innerHTML = clean(post?.body || '<p>Escreva seu artigo aqui.</p>');
  $('editor-heading').textContent = post ? 'Editar artigo' : 'Novo artigo';
  $('state').textContent = post?.status === 'published' ? 'Publicado' : 'Rascunho';
  $('save-note').textContent = '';
  $('public-link').hidden = post?.status !== 'published';
  if (post) $('public-link').href = post.url;
  dirty = false;
}

async function save(status) {
  if (busy || !$('form').reportValidity()) return;
  if (status === 'draft' && current?.status === 'published' && !confirm('Salvar como rascunho retira este artigo do blog público. Continuar?')) return;
  busy = true;
  $('form').querySelectorAll('button').forEach((b) => { b.disabled = true; });
  try {
    const d = $('date').value;
    const data = {
      novo: !current,
      titulo: $('titulo').value, slug: $('slug').value, resumo: $('resumo').value, capa: $('capa').value.trim(),
      cat: $('cat').value, body: clean($('body').innerHTML), status,
      data: `${d.slice(8, 10)}/${d.slice(5, 7)}/${d.slice(0, 4)} ${d.slice(11, 16)}`,
    };
    const result = await api('salvar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    dirty = false; busy = false;
    edit(result.post);
    $('save-note').textContent = status === 'published' ? 'Artigo publicado. Já está disponível no blog.' : 'Rascunho salvo. O conteúdo não aparece no blog público.';
    await load();
  } catch (error) { $('save-note').textContent = error.message; }
  finally { busy = false; $('form').querySelectorAll('button').forEach((b) => { b.disabled = false; }); }
}

// ---------- editor de texto
function rememberSelection() {
  const sel = window.getSelection();
  if (sel.rangeCount && $('body').contains(sel.anchorNode)) selection = sel.getRangeAt(0).cloneRange();
}
function restoreSelection() {
  $('body').focus();
  if (selection && $('body').contains(selection.startContainer)) { const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(selection); }
}
function insert(node) {
  restoreSelection();
  const sel = window.getSelection();
  if (sel.rangeCount && $('body').contains(sel.anchorNode)) {
    const range = sel.getRangeAt(0);
    range.deleteContents(); range.insertNode(node); range.setStartAfter(node); range.collapse(true);
    sel.removeAllRanges(); sel.addRange(range);
  } else $('body').append(node);
  dirty = true;
  rememberSelection();
}
$('body').addEventListener('keyup', rememberSelection);
$('body').addEventListener('mouseup', rememberSelection);
$('body').addEventListener('paste', (event) => {
  event.preventDefault();
  const text = event.clipboardData.getData('text/plain');
  restoreSelection();
  document.execCommand('insertText', false, text);
  dirty = true;
});
$('body').addEventListener('drop', (event) => event.preventDefault());
document.querySelectorAll('[data-command],[data-block]').forEach((button) => {
  button.onclick = () => {
    restoreSelection();
    document.execCommand(button.dataset.command || 'formatBlock', false, button.dataset.block || null);
    dirty = true;
    rememberSelection();
  };
});
$('link').onclick = () => {
  const url = prompt('Endereço completo do link (https://...)');
  if (!url) return;
  if (!/^https:\/\//i.test(url)) { alert('Use um link iniciado por https://'); return; }
  const a = document.createElement('a');
  a.href = url;
  a.textContent = prompt('Texto do link') || url;
  insert(a);
};
$('video').onclick = () => {
  try {
    const raw = prompt('Cole o link do vídeo no YouTube ou Vimeo');
    if (!raw) return;
    const u = new URL(raw);
    let src = '';
    if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(u.hostname)) {
      const id = u.searchParams.get('v') || u.pathname.split('/').at(-1);
      if (/^[\w-]{11}$/.test(id)) src = `https://www.youtube-nocookie.com/embed/${id}`;
    }
    if (u.hostname === 'youtu.be' && /^\/[\w-]{11}$/.test(u.pathname)) src = `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}`;
    if (['vimeo.com', 'www.vimeo.com'].includes(u.hostname) && /^\/\d+$/.test(u.pathname)) src = `https://player.vimeo.com/video${u.pathname}`;
    if (!src) throw Error('Use um link válido do YouTube ou Vimeo.');
    const frame = document.createElement('iframe');
    frame.src = src;
    frame.title = 'Vídeo do artigo';
    frame.setAttribute('allowfullscreen', '');
    insert(frame);
  } catch (error) { alert(error.message); }
};

// ---------- arquivos (capa, imagens, PDF, vídeo)
$('cover-upload').onclick = () => { uploadCover = true; $('file').accept = 'image/jpeg,image/png,image/webp'; $('file').click(); };
$('media').onclick = () => { uploadCover = false; rememberSelection(); $('file').accept = 'image/jpeg,image/png,image/webp,application/pdf,video/mp4,video/webm'; $('file').click(); };
$('file').onchange = async () => {
  const file = $('file').files[0];
  if (!file) return;
  if (file.size > 3 * 1024 * 1024) { alert('O limite é 3 MB. Para vídeos maiores, use YouTube ou Vimeo.'); return; }
  try {
    notify('Enviando arquivo…');
    const result = await api('midia', { method: 'POST', headers: { 'Content-Type': file.type || 'application/octet-stream' }, body: file });
    if (uploadCover) { $('capa').value = result.url; dirty = true; }
    else {
      let node;
      if (file.type.startsWith('image/')) {
        node = document.createElement('img');
        node.src = result.url;
        if (result.w) { node.width = result.w; node.height = result.h; }
        node.alt = prompt('Descreva a imagem em poucas palavras (ajuda quem usa leitor de tela e o Google)') || '';
      } else if (file.type.startsWith('video/')) {
        node = document.createElement('video'); node.src = result.url; node.controls = true;
      } else {
        node = document.createElement('a'); node.href = result.url; node.textContent = file.name;
      }
      insert(node);
    }
    notify('Arquivo enviado. Salve o artigo para incluir a alteração.');
  } catch (error) { notify(error.message); }
  finally { $('file').value = ''; }
};

// ---------- prévia
$('preview').onclick = () => {
  const title = document.createElement('h1');
  title.textContent = $('titulo').value;
  const content = clean($('body').innerHTML);
  $('preview-frame').srcdoc = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><base href="${location.origin}/"><link rel="stylesheet" href="/assets/css/site.css"><style>body{margin:0;padding:24px}main{max-width:760px;margin:auto}img,video,iframe{max-width:100%;height:auto}iframe{width:100%;aspect-ratio:16/9}</style></head><body><main class="prosa">${title.outerHTML}${content}</main></body></html>`;
  $('preview-dialog').showModal();
};
$('close-preview').onclick = () => $('preview-dialog').close();

$('titulo').oninput = () => { if (!current) $('slug').value = slugify($('titulo').value); };
$('form').oninput = () => { dirty = true; };
$('form').onsubmit = (event) => { event.preventDefault(); save('published'); };
$('draft').onclick = () => save('draft');
$('new').onclick = () => edit(null);
$('refresh').onclick = load;
$('search').oninput = renderList;
window.addEventListener('beforeunload', (event) => { if (dirty) { event.preventDefault(); event.returnValue = ''; } });

// ---------- login, sair e troca de senha
function signedIn(email) {
  $('login').hidden = !!email;
  $('workspace').hidden = !email;
  $('logout').hidden = !email;
  $('trocar-senha').hidden = !email;
  $('account').textContent = email || '';
  if (email) load();
  else { csrf = null; posts = []; current = null; dirty = false; $('posts').replaceChildren(); $('editing').hidden = true; $('empty').hidden = false; }
}

$('login-form').onsubmit = async (event) => {
  event.preventDefault();
  const botao = $('login-form').querySelector('button');
  botao.disabled = true;
  try {
    const data = await api('entrar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: $('login-email').value, senha: $('login-senha').value }) });
    csrf = data.csrf;
    $('login-senha').value = '';
    notify('');
    signedIn(data.email);
  } catch (error) { notify(error.message); }
  finally { botao.disabled = false; }
};

$('logout').onclick = async () => {
  if (dirty && !confirm('Sair e descartar as alterações não salvas?')) return;
  try { await api('sair', { method: 'POST' }); } catch { /* a sessão pode já ter expirado */ }
  dirty = false;
  signedIn(null);
};

$('trocar-senha').onclick = () => { $('senha-form').reset(); $('senha-msg').textContent = ''; $('senha-dialog').showModal(); };
$('senha-cancelar').onclick = () => $('senha-dialog').close();
$('senha-form').onsubmit = async (event) => {
  event.preventDefault();
  if ($('senha-nova').value !== $('senha-confirma').value) { $('senha-msg').textContent = 'A confirmação não confere.'; return; }
  try {
    await api('senha', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ atual: $('senha-atual').value, nova: $('senha-nova').value }) });
    $('senha-dialog').close();
    notify('Senha trocada.');
  } catch (error) { $('senha-msg').textContent = error.message; }
};

(async () => {
  try {
    const s = await api('sessao');
    if (!s.instalado) notify('O painel ainda não tem contas. Crie os acessos em /admin/instalar.php com o código de instalação.');
    csrf = s.csrf;
    signedIn(s.email);
  } catch (error) { notify(error.message); }
})();
