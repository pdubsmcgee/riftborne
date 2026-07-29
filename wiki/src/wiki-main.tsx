import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Asterisk,
  BookOpen,
  ChevronRight,
  CircleDot,
  Compass,
  ExternalLink,
  Gauge,
  Menu,
  Orbit,
  Search,
  Shield,
  Sparkles,
  Swords,
  X
} from 'lucide-react';
import guideSource from '../../GUIDE.md?raw';
import './wiki.css';

type Article = {
  id: string;
  title: string;
  body: string;
  summary: string;
  headings: string[];
  words: number;
};

type Block =
  | { kind: 'heading'; level: number; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'quote'; text: string }
  | { kind: 'list'; ordered: boolean; items: string[] }
  | { kind: 'code'; text: string }
  | { kind: 'table'; rows: string[][] };

const slug = (value: string) => value.toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

function stripMarkdown(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildArticles(source: string): Article[] {
  const sections = source.split(/\n(?=## )/);
  const introduction = sections.shift() ?? '';
  const introTitle = introduction.match(/^# (.+)$/m)?.[1] ?? 'The Riftborne Field Manual';
  const introBody = introduction.replace(/^# .+\n?/, '').trim();
  const all = [{ title: introTitle, body: introBody }, ...sections.map(section => {
    const [first, ...rest] = section.split('\n');
    return { title: first.replace(/^## /, '').trim(), body: rest.join('\n').trim() };
  })];

  return all.map((item, index) => {
    const plain = stripMarkdown(item.body);
    const firstParagraph = plain.split(/(?<=[.!?])\s+/).slice(0, 2).join(' ');
    return {
      id: index === 0 ? 'field-manual' : slug(item.title),
      title: item.title,
      body: item.body,
      summary: firstParagraph.slice(0, 190),
      headings: [...item.body.matchAll(/^### (.+)$/gm)].map(match => match[1]),
      words: plain.split(/\s+/).filter(Boolean).length
    };
  });
}

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.split('\n');
  const blocks: Block[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index].trimEnd();
    if (!line.trim()) { index += 1; continue; }

    if (line.startsWith('```')) {
      const content: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith('```')) content.push(lines[index++]);
      index += 1;
      blocks.push({ kind: 'code', text: content.join('\n') });
      continue;
    }

    const heading = line.match(/^(#{3,4}) (.+)$/);
    if (heading) {
      blocks.push({ kind: 'heading', level: heading[1].length, text: heading[2] });
      index += 1;
      continue;
    }

    if (line.startsWith('> ')) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].startsWith('> ')) quote.push(lines[index++].slice(2));
      blocks.push({ kind: 'quote', text: quote.join(' ') });
      continue;
    }

    if (line.startsWith('|') && lines[index + 1]?.trim().match(/^\|?[\s:|-]+\|/)) {
      const table: string[][] = [];
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        const cells = lines[index].trim().slice(1, -1).split('|').map(cell => cell.trim());
        if (!cells.every(cell => /^:?-+:?$/.test(cell))) table.push(cells);
        index += 1;
      }
      blocks.push({ kind: 'table', rows: table });
      continue;
    }

    const listMatch = line.match(/^(\d+\.|-)\s+(.+)/);
    if (listMatch) {
      const ordered = listMatch[1] !== '-';
      const items: string[] = [];
      while (index < lines.length) {
        const match = lines[index].trim().match(/^(\d+\.|-)\s+(.+)/);
        if (!match || (match[1] !== '-') !== ordered) break;
        items.push(match[2]);
        index += 1;
      }
      blocks.push({ kind: 'list', ordered, items });
      continue;
    }

    const paragraph = [line.trim()];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{3,4}) |^```|^> |^(\d+\.|-)\s+|^\|/.test(lines[index].trim())
    ) paragraph.push(lines[index++].trim());
    blocks.push({ kind: 'paragraph', text: paragraph.join(' ') });
  }
  return blocks;
}

function inline(text: string): React.ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  return text.split(pattern).filter(Boolean).map((part, index) => {
    if (part.startsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={index} href={link[2]} target="_blank" rel="noreferrer">{link[1]} <ExternalLink size={12}/></a>;
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

function ArticleBody({ body }: { body: string }) {
  const blocks = useMemo(() => parseBlocks(body), [body]);
  return <div className="article-body">{blocks.map((block, index) => {
    if (block.kind === 'heading') {
      const id = slug(block.text);
      return block.level === 3
        ? <h2 id={id} key={index}>{block.text}</h2>
        : <h3 id={id} key={index}>{block.text}</h3>;
    }
    if (block.kind === 'paragraph') return <p key={index}>{inline(block.text)}</p>;
    if (block.kind === 'quote') return <blockquote key={index}>{inline(block.text)}</blockquote>;
    if (block.kind === 'code') return <pre key={index}><code>{block.text}</code></pre>;
    if (block.kind === 'list') {
      const List = block.ordered ? 'ol' : 'ul';
      return <List key={index}>{block.items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</List>;
    }
    return <div className="table-scroll" key={index}><table>
      <thead><tr>{block.rows[0]?.map((cell, cellIndex) => <th key={cellIndex}>{inline(cell)}</th>)}</tr></thead>
      <tbody>{block.rows.slice(1).map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{inline(cell)}</td>)}</tr>)}</tbody>
    </table></div>;
  })}</div>;
}

const routeIcons = [BookOpen, Gauge, Compass, Shield, Orbit, Swords, Sparkles];

function WikiApp() {
  const articles = useMemo(() => buildArticles(guideSource), []);
  const initialHash = window.location.hash.slice(1).split('/')[0];
  const [activeId, setActiveId] = useState(articles.some(article => article.id === initialHash) ? initialHash : articles[0].id);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const active = articles.find(article => article.id === activeId) ?? articles[0];
  const activeIndex = articles.indexOf(active);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return articles.slice(0, 8);
    return articles
      .map(article => {
        const haystack = `${article.title} ${article.body}`.toLowerCase();
        return { article, score: (article.title.toLowerCase().includes(term) ? 10 : 0) + haystack.split(term).length - 1 };
      })
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(result => result.article);
  }, [articles, query]);

  function navigate(id: string) {
    setActiveId(id);
    setSearchOpen(false);
    setMenuOpen(false);
    setQuery('');
    window.history.pushState(null, '', `#${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.slice(1).split('/')[0];
      if (articles.some(article => article.id === id)) setActiveId(id);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === '/' && !(event.target instanceof HTMLInputElement)) {
        event.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchRef.current?.focus(), 30);
      }
      if (event.key === 'Escape') { setSearchOpen(false); setMenuOpen(false); }
    };
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(100, window.scrollY / height * 100) : 0);
    };
    window.addEventListener('hashchange', onHash);
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
    };
  }, [articles]);

  return <div className="wiki-shell">
    <div className="reading-progress" style={{ width: `${progress}%` }}/>
    <header className="wiki-header">
      <button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu/></button>
      <button className="wordmark" onClick={() => navigate('field-manual')}>
        <span className="sigil"><Orbit size={19}/></span>
        <span><strong>RIFTBORNE</strong><small>FIELD ARCHIVE / 11.73</small></span>
      </button>
      <button className="search-trigger" onClick={() => { setSearchOpen(true); setTimeout(() => searchRef.current?.focus(), 30); }}>
        <Search size={15}/><span>Search the archive</span><kbd>/</kbd>
      </button>
      <a className="command-link" href="https://github.com/pdubsmcgee/riftborne" target="_blank" rel="noreferrer">Source <ArrowRight size={14}/></a>
    </header>

    <aside className={`wiki-nav ${menuOpen ? 'open' : ''}`}>
      <div className="nav-mobile-head"><span>Archive index</span><button onClick={() => setMenuOpen(false)}><X/></button></div>
      <div className="nav-label">The manual</div>
      <nav>{articles.map((article, index) => {
        const Icon = routeIcons[index % routeIcons.length];
        return <button key={article.id} className={article.id === active.id ? 'active' : ''} onClick={() => navigate(article.id)}>
          <Icon size={15}/><span>{article.title}</span><small>{String(index + 1).padStart(2, '0')}</small>
        </button>;
      })}</nav>
      <div className="nav-footer"><CircleDot size={13}/><span>Patch-aware reference<br/><b>Updated July 2026</b></span></div>
    </aside>

    <main className="wiki-main">
      {active.id === 'field-manual' ? <ArchiveHome articles={articles} navigate={navigate}/> : <>
        <article className="wiki-article" key={active.id}>
          <header className="article-header">
            <div className="article-overline"><span>FIELD ARCHIVE</span><i/> <span>{String(activeIndex + 1).padStart(2, '0')} / {articles.length}</span></div>
            <h1>{active.title}</h1>
            <p>{active.summary}</p>
            <div className="article-meta"><span>{active.words.toLocaleString()} words</span><span>{active.headings.length || 1} sections</span><span>Patch 11.73</span></div>
          </header>
          <ArticleBody body={active.body}/>
          <footer className="article-footer">
            <span>Continue reading</span>
            {articles[activeIndex + 1] && <button onClick={() => navigate(articles[activeIndex + 1].id)}>{articles[activeIndex + 1].title}<ChevronRight/></button>}
          </footer>
        </article>
        <aside className="article-toc">
          <span>On this page</span>
          {active.headings.map(heading => <a key={heading} href={`#${slug(heading)}`}>{heading}</a>)}
          <div><Asterisk size={13}/><p>Exact figures are versioned. Live server settings and Codex previews take precedence.</p></div>
        </aside>
      </>}
    </main>

    {searchOpen && <div className="search-layer" role="dialog" aria-modal="true" onMouseDown={event => { if (event.target === event.currentTarget) setSearchOpen(false); }}>
      <section className="search-modal">
        <div className="search-input"><Search/><input ref={searchRef} value={query} onChange={event => setQuery(event.target.value)} placeholder="Search mechanics, ships, objectives, strategies…"/><button onClick={() => setSearchOpen(false)}><X/></button></div>
        <div className="search-caption"><span>{query ? `${results.length} matching chapters` : 'Suggested chapters'}</span><kbd>ESC to close</kbd></div>
        <div className="search-results">{results.map(article => <button key={article.id} onClick={() => navigate(article.id)}>
          <div><strong>{article.title}</strong><p>{article.summary}</p></div><ChevronRight/>
        </button>)}</div>
        {!results.length && <div className="no-results">No signal found. Try a broader term.</div>}
      </section>
    </div>}
  </div>;
}

function ArchiveHome({ articles, navigate }: { articles: Article[]; navigate: (id: string) => void }) {
  const featured = ['how-to-win-official-multiplayer', 'combat-without-the-fog-machine', 'hidden-mechanics-cheese-and-meta-play']
    .map(id => articles.find(article => article.id === id))
    .filter((article): article is Article => Boolean(article));
  return <div className="archive-home">
    <section className="archive-hero">
      <div className="hero-copy">
        <span className="hero-kicker"><i/> INDEPENDENT FIELD ARCHIVE</span>
        <h1>Know the galaxy.<br/><em>Outlive it.</em></h1>
        <p>Mechanics, exact formulas, fleet doctrine, multiplayer strategy, and the strange edges of Riftborne.</p>
        <button onClick={() => navigate('the-one-page-version')}>Enter the manual <ArrowRight/></button>
      </div>
      <div className="hero-orbit" aria-hidden="true">
        <span className="orbit orbit-a"/><span className="orbit orbit-b"/><span className="orbit orbit-c"/>
        <i className="core"/><b className="moon moon-a"/><b className="moon moon-b"/><b className="moon moon-c"/>
        <div className="coordinate">ORIGIN<br/><strong>0,0</strong></div>
      </div>
      <div className="hero-data"><span>PATCH</span><strong>11.73</strong><span>CHAPTERS</span><strong>{articles.length}</strong><span>STATUS</span><strong>ACTIVE</strong></div>
    </section>

    <section className="signal-strip">
      <span><CircleDot/> Verified against the installed game guide</span>
      <span>59 indexed subjects</span>
      <span>Multiplayer doctrine included</span>
    </section>

    <section className="featured-section">
      <header><span>START WITH THE SIGNAL</span><h2>Three ways into the archive</h2></header>
      <div>{featured.map((article, index) => <button key={article.id} onClick={() => navigate(article.id)}>
        <small>0{index + 1}</small><h3>{article.title}</h3><p>{article.summary}</p><span>Open chapter <ArrowRight/></span>
      </button>)}</div>
    </section>

    <section className="index-section">
      <header><span>COMPLETE INDEX</span><h2>The field manual</h2><p>From your first stockpile to the last Wormhole level.</p></header>
      <div>{articles.slice(1).map((article, index) => <button key={article.id} onClick={() => navigate(article.id)}>
        <small>{String(index + 1).padStart(2, '0')}</small><strong>{article.title}</strong><span>{article.words.toLocaleString()} words</span><ChevronRight/>
      </button>)}</div>
    </section>
  </div>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><WikiApp/></React.StrictMode>);
