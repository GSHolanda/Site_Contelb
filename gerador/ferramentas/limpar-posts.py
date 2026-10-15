"""Converte os posts exportados do blog antigo em HTML semântico limpo.
Uso: python3 -I limpar-posts.py <pasta-com-os-html> <pasta-de-saida>
Mantém o texto como está; remove estilos, spans e parágrafos vazios,
transforma linhas curtas em negrito (ou sem pontuação final) em subtítulos h2."""
import sys, os, re, html
from html.parser import HTMLParser

PERMITIDAS = {'p', 'h2', 'h3', 'ul', 'ol', 'li', 'strong', 'b', 'em', 'i', 'a', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'br'}
BLOCOS = {'p', 'h2', 'h3', 'ul', 'ol', 'table'}

class Limpa(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.dentro = False; self.passou_img = False
        self.out = []; self.pilha = []
    def handle_starttag(self, tag, attrs):
        if tag == 'article': self.dentro = True; return
        if not self.dentro: return
        if tag == 'img': self.passou_img = True; return
        if not self.passou_img: return
        if tag in ('h1', 'h4', 'h5', 'h6'): tag = 'h2'
        if tag == 'b': tag = 'strong'
        if tag == 'i': tag = 'em'
        if tag not in PERMITIDAS: return
        if tag == 'a':
            href = dict(attrs).get('href', '')
            if not href.startswith(('http://', 'https://', 'mailto:')): self.pilha.append(None); return
            self.out.append(f'<a href="{html.escape(href)}" target="_blank" rel="noopener">'); self.pilha.append('a'); return
        if tag == 'br': self.out.append('<br>'); return
        self.out.append(f'<{tag}>'); self.pilha.append(tag)
    def handle_endtag(self, tag):
        if tag == 'article': self.dentro = False; return
        if not (self.dentro and self.passou_img): return
        if tag in ('h1', 'h4', 'h5', 'h6'): tag = 'h2'
        if tag == 'b': tag = 'strong'
        if tag == 'i': tag = 'em'
        if tag not in PERMITIDAS or tag == 'br': return
        if tag == 'a':
            t = self.pilha.pop() if self.pilha else None
            if t: self.out.append('</a>')
            return
        if tag in self.pilha:
            while self.pilha:
                t = self.pilha.pop()
                if t: self.out.append(f'</{t}>')
                if t == tag: break
    def handle_data(self, d):
        if self.dentro and self.passou_img: self.out.append(html.escape(d, quote=False))

def texto(s): return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', html.unescape(s))).strip()

def pos(s):
    s = re.sub(r'\s+', ' ', s)
    s = re.sub(r'<(strong|em|a)[^>]*>\s*</\1>', '', s)
    s = re.sub(r'<p>(\s|<br>)*</p>', '', s)
    s = re.sub(r'\s*<br>\s*</p>', '</p>', s)
    s = re.sub(r'</strong>\s*<strong>', ' ', s)
    s = re.sub(r'(<(p|li|td|th|h2)>)\s+', r'\1', s)
    s = re.sub(r'\s+(</(p|li|td|th|h2)>)', r'\1', s)
    blocos = re.findall(r'<(p|h2|h3|ul|ol|table)>.*?</\1>', s)
    partes = re.findall(r'(<(p|h2|h3|ul|ol|table)>.*?</\2>)', s)
    out = []
    num = 0
    for i, (b, tag) in enumerate(partes):
        t = texto(b)
        if not t: continue
        if tag == 'p':
            so_negrito = re.fullmatch(r'<p>(<strong>.*</strong>)</p>', b) is not None
            curto = len(t) <= 95 and not re.search(r'[.:;!?,…]$', t)
            prox = partes[i + 1][1] if i + 1 < len(partes) else None
            if t.startswith('Por:'): pass
            elif (so_negrito and len(t) <= 120 and not t.endswith('.')) or (curto and prox in ('p', 'ul', 'ol', 'table') and i > 0):
                b = f'<h2>{html.escape(t, quote=False)}</h2>'
        # itens numerados soltos (um <ol> de um item só, ou "5. Título") viram subtítulos h3 numerados
        um = re.fullmatch(r'<ol><li>(?:<p>)?(.*?)(?:</p>)?</li></ol>', b)
        if um and len(texto(um.group(1))) <= 100:
            num += 1
            b = f'<h3>{num}. {html.escape(texto(um.group(1)), quote=False)}</h3>'
        elif tag in ('p', 'h2') and re.match(r'^\d+[.)] ', t) and len(t) <= 100:
            num = int(re.match(r'^(\d+)', t).group(1))
            b = f'<h3>{html.escape(t, quote=False)}</h3>'
        b = re.sub(r'<li><p>(.*?)</p></li>', r'<li>\1</li>', b)
        if tag == 'table': b = f'<div class="tabela">{b}</div>'
        out.append(b)
    # sem h2 antes, os itens numerados sobem para h2 (hierarquia sem pulo de nível)
    visto_h2 = False
    for i, b in enumerate(out):
        if b.startswith('<h2>'): visto_h2 = True
        elif b.startswith('<h3>') and not visto_h2: out[i] = '<h2>' + b[4:-5] + '</h2>'
    return '\n'.join(out) + '\n'

orig, dest = sys.argv[1], sys.argv[2]
os.makedirs(dest, exist_ok=True)
for f in sorted(os.listdir(orig)):
    if not f.endswith('.html'): continue
    fonte = open(os.path.join(orig, f), encoding='utf-8').read()
    titulo = texto(re.search(r'<h1>(.*?)</h1>', fonte, re.S).group(1))
    p = Limpa(); p.feed(fonte)
    corpo = pos(''.join(p.out))
    # o primeiro bloco às vezes repete o título do post
    primeiro = corpo.split('\n', 1)
    if texto(primeiro[0]) == titulo: corpo = primeiro[1]
    open(os.path.join(dest, f), 'w', encoding='utf-8').write(corpo)
    print(f'{f[:60]:60} {corpo.count("<h2>"):3} h2  {len(texto(corpo)):6} car.')
