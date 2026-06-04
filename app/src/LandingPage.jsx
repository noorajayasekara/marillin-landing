import React, { useEffect, useRef, useState } from 'react';
import teamPhoto from './assets/team.jpg';

// Designtokens (landningssida_beslutslogg.md): forest pa rubriker och
// primary, sage pa eyebrows och accenter, Cormorant Garamond plus Inter.
// Inga tankstreck nagonstans i copyn.
const c = {
  forest: '#1F3320',
  sage: '#718574',
  inkBody: '#5f6360',
  inkFaint: '#8a8f8a',
  cream: '#F0F0EB',
  sectionBg: '#F4F5F1',
  sageFaint: '#f2f4ef',
  sagePale: '#e8ebe3',
  white: '#fafaf8',
  hair: 'rgba(31,51,32,0.13)',
  hairMid: 'rgba(31,51,32,0.28)',
  hairSoft: 'rgba(31,51,32,0.08)',
};

const serif = "'Cormorant Garamond', serif";
const sans = "'Inter', sans-serif";

const responsiveCSS = `
  .ml-hero { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; align-items: stretch; padding-top: 5rem; overflow: hidden; }
  .ml-hero-left { padding: 5rem 4rem 5rem 5rem; display: flex; flex-direction: column; justify-content: center; }
  .ml-hero-right { border-left: 1px solid ${c.hair}; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 5rem 3.5rem; position: relative; overflow: hidden; background: ${c.sageFaint}; }

  .ml-section { padding: 6rem 5rem; }
  .ml-nav { padding: 1.2rem 5rem; }
  .ml-nav-links { display: flex; gap: 2.5rem; align-items: center; }

  .ml-rows { border-top: 1px solid ${c.hair}; }
  .ml-row { display: grid; grid-template-columns: 5fr 7fr; gap: 3.5rem; padding: 2.6rem 0; border-bottom: 1px solid ${c.hair}; align-items: start; }

  .ml-cap-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }
  .ml-cap { padding: 2.2rem 3.4rem; border-top: 1px solid ${c.hair}; }
  .ml-cap:first-child { padding-left: 0; }
  .ml-cap:last-child { padding-right: 0; }
  .ml-cap + .ml-cap { border-left: 1px solid ${c.hair}; }

  .ml-team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; }
  .ml-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: start; }
  .ml-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; }

  .ml-footer { padding: 2rem 5rem; }
  .ml-footer-bottom { display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; }

  .ml-carousel-btn { background: none; border: 1px solid ${c.hairMid}; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; flex-shrink: 0; }
  .ml-carousel-btn:hover { background: ${c.sagePale}; }
  .ml-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(113,133,116,0.35); border: none; cursor: pointer; padding: 0; transition: background 0.2s, transform 0.2s; }
  .ml-dot.active { background: ${c.sage}; transform: scale(1.35); }

  @media (max-width: 1024px) {
    .ml-hero { grid-template-columns: 1fr; min-height: auto; }
    .ml-hero-left { padding: 7rem 3rem 3rem; }
    .ml-hero-right { min-height: auto; border-left: none; border-top: 1px solid ${c.hair}; padding: 4rem 3rem; }
    .ml-contact-grid { grid-template-columns: 1fr; gap: 3rem; }
    .ml-team-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  }

  @media (max-width: 768px) {
    .ml-nav { padding: 1rem 1.5rem; }
    .ml-nav-links { display: none; }
    .ml-section { padding: 4rem 1.5rem; }
    .ml-hero-left { padding: 6rem 1.5rem 2.5rem; }
    .ml-hero-right { padding: 3rem 1.5rem; }
    .ml-row { grid-template-columns: 1fr; gap: 0.8rem; padding: 2.2rem 0; }
    .ml-cap-grid { grid-template-columns: 1fr; }
    .ml-cap, .ml-cap:first-child, .ml-cap:last-child { padding: 1.8rem 0; }
    .ml-cap + .ml-cap { border-left: none; }
    .ml-form-row { grid-template-columns: 1fr; }
    .ml-footer { padding: 2rem 1.5rem; }
    .ml-footer-bottom { flex-direction: column; align-items: flex-start; }
  }
`;

function useFadeUp(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeUp({ children, delay = 0, style = {} }) {
  const { ref, visible } = useFadeUp();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function Logo({ size = 'md' }) {
  const mSize = size === 'sm' ? '1.8rem' : '2.6rem';
  return (
    <a href="#top" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', gap: 0, lineHeight: 1 }}>
      <span style={{ fontFamily: serif, fontSize: mSize, fontWeight: 300, color: c.forest, letterSpacing: '-0.08em', lineHeight: 0.85 }}>M</span>
      <span style={{ fontFamily: serif, fontSize: '0.65rem', fontWeight: 400, letterSpacing: '0.55em', textTransform: 'uppercase', color: c.forest, marginTop: '2px' }}>Marillin</span>
    </a>
  );
}

function Eyebrow({ children }) {
  return <p style={{ fontFamily: sans, fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: c.sage, marginBottom: '1.4rem' }}>{children}</p>;
}

function Label({ children, style = {} }) {
  return <p style={{ fontFamily: sans, fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.sage, marginBottom: '0.4rem', ...style }}>{children}</p>;
}

function H2({ children, style = {} }) {
  return <h2 style={{ fontFamily: serif, fontSize: 'clamp(2.2rem, 3.6vw, 3.1rem)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1rem', color: c.forest, ...style }}>{children}</h2>;
}

const NAV_LINKS = [
  ['Sammanhanget', '#sammanhanget'],
  ['Stöd i varje steg', '#stod'],
  ['Om oss', '#team'],
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav className="ml-nav" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(250,250,248,0.92)', backdropFilter: 'blur(16px)', borderBottom: scrolled ? `1px solid ${c.hair}` : '1px solid transparent', transition: 'border-color 0.3s' }}>
      <Logo />
      <ul className="ml-nav-links" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {NAV_LINKS.map(([label, href]) => (
          <li key={href}>
            <a href={href} style={{ textDecoration: 'none', color: c.inkBody, fontSize: '0.85rem', fontWeight: 400, letterSpacing: '0.02em' }}
              onMouseEnter={e => (e.currentTarget.style.color = c.forest)}
              onMouseLeave={e => (e.currentTarget.style.color = c.inkBody)}>
              {label}
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" style={{ textDecoration: 'none', background: c.forest, color: c.cream, padding: '0.55rem 1.3rem', borderRadius: '3px', fontSize: '0.85rem', fontWeight: 400, letterSpacing: '0.03em' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            Kontakt
          </a>
        </li>
      </ul>
    </nav>
  );
}

// Scenariokort: i fonstret Scenario, Marillins bedomning och refs-pills.
// Marillins bidrag visas som bildtext under kort-fonstret (se ExampleCarousel).
const scenarios = [
  {
    id: '01',
    label: 'Förvärv',
    scenario: 'Vi ska skriva på ett LOI för att eventuellt förvärva ett bolag med en omsättning om 1,4 mdr SEK. Hur ska vi hantera informationsgivningen?',
    bedomning: 'Baserat på offentliggjord information om ert bolag uppfyller händelsen sannolikt kriterierna för insiderinformation. Informationen hanteras som ett mellanliggande steg inom ramen för en pågående process.',
    refs: ['MAR Art. 7', 'Listing Act', 'ESMA Guideline'],
    bidrag: 'Marillin formulerar och dokumenterar bedömningen. Vid tidpunkten för offentliggörande tar Marillin fram pressmeddelande i er tone of voice som säkerställer regelefterlevnad och marknadspraxis.',
  },
  {
    id: '02',
    label: 'Resultatavvikelse',
    scenario: 'Vi har fått indikationer om att Q1-resultatet kommer att avvika kraftigt från föregående år och analytikernas konsensus. Vad ska vi göra?',
    bedomning: 'När ni klarlagt att det är fråga om en signifikant resultatavvikelse så utgör detta insiderinformation. I denna specifika situation ska informationen offentliggöras så snart som möjligt. Notera att även preliminära siffror triggar offentliggörande.',
    refs: ['MAR Art. 7', 'Börsens regelverk'],
    bidrag: 'Marillin hjälper er att utforma ett pressmeddelande som säkerställer efterlevnaden av MAR samt börsens regelverk vad gäller omvänd vinstvarning eller vinstvarning.',
  },
  {
    id: '03',
    label: 'Distributionsavtal',
    scenario: 'Vi ska skriva distributionsavtal med den största distributören i Europa. Det är jättestor potential i avtalet men det finns ingen garanti för att det ska generera några intäkter. Hur ska vi hantera informationsgivningen?',
    bedomning: 'Potentialen beskrivs med uppskattningar om långsiktiga framtida intäkter vilka behöver nyanseras med tydliga reservationer beträffande uppskattningarnas karaktär. Om inga åtaganden regleras behöver det anges. Generella beskrivningar om försäljningsstrukturer i branschen kan ge mervärde. Baserat på offentliggjord information om ert bolag, och var ni befinner er i er tillväxtresa, uppfyller händelsen sannolikt kriterierna för insiderinformation. Informationen hanteras som en slutlig händelse med omedelbart offentliggörande.',
    refs: ['MAR Art. 7', 'Börsens regelverk'],
    bidrag: 'Marillin hjälper er att utforma ett pressmeddelande som ger en fullständig och korrekt bedömning av informationens betydelse.',
  },
];

function ExampleCarousel() {
  const [active, setActive] = useState(0);
  const prev = () => setActive(a => (a + scenarios.length - 1) % scenarios.length);
  const next = () => setActive(a => (a + 1) % scenarios.length);
  const s = scenarios[active];

  return (
    <div style={{ width: '100%', maxWidth: '440px' }}>
      <div style={{ background: c.white, border: `1px solid ${c.hairMid}`, borderRadius: '10px', boxShadow: '0 4px 40px rgba(31,51,32,0.07), 0 1px 4px rgba(31,51,32,0.04)', overflow: 'hidden' }}>
        <div style={{ background: c.sectionBg, borderBottom: `1px solid ${c.hair}`, padding: '0.85rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            {['#e8d5b0', '#d5e0d0', '#c8cfc4'].map(col => <div key={col} style={{ width: 9, height: 9, borderRadius: '50%', background: col }} />)}
          </div>
          <span style={{ fontFamily: sans, fontSize: '0.74rem', fontWeight: 400, color: c.inkFaint, letterSpacing: '0.02em' }}>Marillin · {s.label}</span>
        </div>
        <div style={{ padding: '1.5rem', minHeight: '340px' }}>
          <Label>Scenario</Label>
          <div style={{ fontFamily: sans, fontSize: '0.85rem', color: '#46494a', lineHeight: 1.6, padding: '0.9rem 1rem', background: c.sageFaint, borderRadius: '6px', marginBottom: '1.2rem', border: `1px solid ${c.hair}` }}>
            {s.scenario}
          </div>
          <div style={{ background: '#eef2ec', borderLeft: `3px solid ${c.sage}`, padding: '0.9rem 1rem', borderRadius: '0 6px 6px 0', marginBottom: '1.1rem' }}>
            <Label>Marillins bedömning</Label>
            <p style={{ fontFamily: sans, fontSize: '0.83rem', color: c.forest, fontWeight: 400, lineHeight: 1.6 }}>{s.bedomning}</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {s.refs.map(r => (
              <span key={r} style={{ fontFamily: sans, fontSize: '0.66rem', fontWeight: 400, padding: '0.2rem 0.55rem', borderRadius: '3px', border: `1px solid ${c.hairMid}`, color: c.inkFaint, letterSpacing: '0.02em' }}>{r}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Marillins bidrag, bildtext direkt under kort-fönstret */}
      <div style={{ marginTop: '1.1rem' }}>
        <Label>Marillins bidrag</Label>
        <p style={{ fontFamily: sans, fontSize: '0.82rem', color: c.inkBody, lineHeight: 1.65 }}>{s.bidrag}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '1.2rem' }}>
        <button className="ml-carousel-btn" onClick={prev} aria-label="Föregående exempel">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 2L3.5 6L7.5 10" stroke={c.sage} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        {scenarios.map((sc, i) => (
          <button key={sc.id} className={`ml-dot${active === i ? ' active' : ''}`} onClick={() => setActive(i)} aria-label={`Exempel ${i + 1}`} />
        ))}
        <button className="ml-carousel-btn" onClick={next} aria-label="Nästa exempel">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2L8.5 6L4.5 10" stroke={c.sage} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
}

const CONTEXT_ROWS = [
  ['Ett informationslandskap i ständig rörelse', 'Börsbolag förväntas navigera rätt i omfattande regelmassa, från MAR, Listing Act och ABL till börsens regelverk. Informationsmängden är stor och förändringstakten hög, vilket ställer krav på ständig uppdatering och kvalificerade bedömningar.'],
  ['Behovet av dokumentation', 'Bolag behöver göra genomtänkta, konsekventa och väldokumenterade bedömningar, oavsett om det rör sig om insiderinformation eller inte. En tydlig struktur och spårbarhet minskar risken för sanktioner vid tillsyn och stärker förtroendet på aktiemarknaden.'],
  ['Snabba beslut i komplexa situationer', 'Beslut behöver ofta fattas snabbt under tidspress, utan tid för extern rådgivning. Då krävs ett tydligt och strukturerat arbetssätt.'],
];

const CAPABILITIES = [
  ['Svar grundade i aktuella källor', 'Marillin utgår från regelverk, riktlinjer och beslut för börsbolag. Källorna hålls aktuella och hänvisas tydligt.'],
  ['Ert bolags kontext', 'Marillin väger in ert bolags historiska informationsgivning och beaktar hur just ert bolag har kommunicerat.'],
  ['En spårbar bedömning', 'Varje ärende loggas, så att bedömningen går att finna långt efter att beslutet fattats.'],
];

// Ordningen matchar gruppbilden, vänster till höger: Ewelina, Amanda, Noora.
const TEAM = [
  {
    name: 'Ewelina Pettersson',
    linkedin: 'https://www.linkedin.com/in/ewelina-pettersson-61b18425/',
    bio: 'Erfarenhet som Head of Investor Relations och styrelseledamot i noterade bolag, och bakgrund från informationsövervakning och noteringsprocesser på marknadsplats. Ewelina förstår informationsgivningens dynamik från båda håll, från bolagets ansvar till marknadsplatsens granskning.',
  },
  {
    name: 'Amanda Bergerståhl',
    linkedin: 'https://www.linkedin.com/in/amanda-bergerst%C3%A5hl-41362217/',
    bio: 'Jurist och styrelseledamot med omfattande praktisk erfarenhet av arbete med informationsgivning och andra legala frågor i börsmiljö. Ansvarar för Marillins regelbibliotek.',
  },
  {
    name: 'Noora Jayasekara',
    linkedin: 'https://www.linkedin.com/in/noora-jayasekara-409aaba/',
    bio: 'Lång erfarenhet som CFO och från ledande befattningar i börsbolag och noterade styrelser, med löpande hantering av insiderfrågor och informationsgivning som en central del av det dagliga arbetet.',
  },
];

const DISCLAIMER = 'Marillin erbjuder en tjänst som ger bolag stöd vid analys och beslut. Tjänsten utgör inte juridisk, finansiell eller annan professionell rådgivning. Användaren/bolaget ansvarar själv för att bedöma informationens relevans och riktighet i varje enskilt fall. Samtliga bedömningar och beslut som fattas är alltid användaren/bolagets egna och sker på egen risk.';

function ContactForm() {
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const inputStyle = {
    width: '100%', background: c.white, border: `1px solid ${c.hairMid}`,
    color: c.forest, padding: '0.8rem 1rem', borderRadius: '3px',
    fontFamily: sans, fontSize: '0.88rem', fontWeight: 300, outline: 'none',
  };

  const submit = () => {
    const subject = encodeURIComponent('Intresseanmälan, tidig tillgång till Marillin');
    const body = encodeURIComponent(
      `Namn: ${form.name}\nBolag: ${form.company}\nE-post: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:hey@marillin.se?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div style={{ padding: '3rem', background: c.white, borderRadius: '6px', border: `1px solid ${c.hair}`, textAlign: 'center' }}>
        <p style={{ fontFamily: serif, fontSize: '1.4rem', color: c.forest, marginBottom: '0.5rem' }}>Tack för din intresseanmälan</p>
        <p style={{ fontFamily: sans, fontSize: '0.88rem', color: c.inkBody }}>Ditt mejlprogram öppnas så att du kan skicka meddelandet till hey@marillin.se. Vi återkommer inom kort.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
      <div className="ml-form-row">
        <input style={inputStyle} placeholder="Namn" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input style={inputStyle} placeholder="Bolag" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
      </div>
      <input style={inputStyle} type="email" placeholder="E-post" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <textarea
        style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
        placeholder="Berätta kort om er situation och vad ni söker hjälp med"
        value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })}
      />
      <button
        onClick={submit}
        style={{ background: c.forest, color: c.cream, border: 'none', padding: '0.9rem 1.5rem', borderRadius: '3px', fontFamily: sans, fontSize: '0.9rem', fontWeight: 400, letterSpacing: '0.03em', cursor: 'pointer', width: '100%' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Skicka förfrågan
      </button>
    </div>
  );
}

export default function LandingPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  const fade = (delay = 0) => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  });

  const linkStyle = { fontFamily: sans, fontSize: '0.72rem', fontWeight: 400, color: c.inkFaint, textDecoration: 'none', letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', borderBottom: `1px solid ${c.hair}`, paddingBottom: '1px' };

  return (
    <>
      <style>{responsiveCSS}</style>
      <div id="top" style={{ background: c.white, color: c.forest, fontFamily: sans, fontWeight: 300, lineHeight: 1.7, overflowX: 'hidden' }}>
        <Nav />

        {/* HERO */}
        <div className="ml-hero">
          <div className="ml-hero-left" style={fade(0)}>
            <Eyebrow>Beslutsstöd · Svenska börsbolag</Eyebrow>
            <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.8rem, 4.6vw, 4.4rem)', fontWeight: 400, lineHeight: 1.08, letterSpacing: '-0.02em', color: c.forest, marginBottom: '1.8rem' }}>
              Navigera insiderregler<br />tryggt, med Marillin<br />som er <em style={{ fontStyle: 'italic', color: c.sage }}>digitala kollega</em>
            </h1>
            <p style={{ fontSize: '0.97rem', color: c.inkBody, maxWidth: '34em', lineHeight: 1.85, marginBottom: '1.3rem', fontWeight: 300, ...fade(0.15) }}>
              Marillin är en AI-tjänst byggd på svenska och europeiska regelverk, praxis och disciplinärenden, skapad av personer med lång erfarenhet från börsbolag, styrelser och informationsövervakning. Det innebär att Marillin inte bara svarar utifrån regelverk, utan vet vad som är marknadspraxis. Regelefterlevnad blir därmed inte en efterhandskontroll, utan en integrerad del av varje beslut.
            </p>
            <p style={{ fontSize: '0.97rem', color: c.inkBody, maxWidth: '34em', lineHeight: 1.85, marginBottom: '2.6rem', fontWeight: 300, ...fade(0.2) }}>
              Marillin känner ert bolag och hur ni kommunicerar, och tar er finansiella kommunikation till nästa nivå.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', ...fade(0.25) }}>
              <a href="#contact" style={{ background: c.forest, color: c.cream, border: `1px solid ${c.forest}`, padding: '0.85rem 1.8rem', borderRadius: '3px', fontSize: '0.9rem', fontWeight: 400, letterSpacing: '0.02em', textDecoration: 'none', display: 'inline-block' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                Begär tidig tillgång
              </a>
              <a href="#stod" style={{ background: 'transparent', color: c.inkBody, border: `1px solid ${c.hairMid}`, padding: '0.85rem 1.8rem', borderRadius: '3px', fontSize: '0.9rem', fontWeight: 400, textDecoration: 'none', display: 'inline-block' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = c.sage; e.currentTarget.style.color = c.forest; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = c.hairMid; e.currentTarget.style.color = c.inkBody; }}>
                Det här är Marillin
              </a>
            </div>
          </div>

          <div className="ml-hero-right" style={fade(0.2)}>
            <div style={{ position: 'absolute', top: -100, right: -100, width: 340, height: 340, borderRadius: '50%', background: c.sagePale, opacity: 0.7, pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '440px' }}>
              <ExampleCarousel />
            </div>
          </div>
        </div>

        {/* SAMMANHANGET */}
        <section id="sammanhanget" className="ml-section" style={{ background: c.sectionBg, borderTop: `1px solid ${c.hair}`, borderBottom: `1px solid ${c.hair}` }}>
          <Eyebrow>Sammanhanget</Eyebrow>
          <H2 style={{ maxWidth: '16em', marginBottom: '3.5rem' }}>När situationen förändras, finns Marillin som stöd</H2>
          <div className="ml-rows">
            {CONTEXT_ROWS.map(([title, text]) => (
              <FadeUp key={title} style={{}}>
                <div className="ml-row">
                  <h3 style={{ fontFamily: serif, fontSize: '1.6rem', fontWeight: 500, lineHeight: 1.18, letterSpacing: '-0.01em', color: c.forest }}>{title}</h3>
                  <p style={{ fontSize: '0.92rem', fontWeight: 300, lineHeight: 1.85, color: c.inkBody, maxWidth: '40em', paddingTop: '0.35rem' }}>{text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp style={{ marginTop: '3.5rem' }}>
            <div style={{ display: 'flex', gap: '1.4rem', alignItems: 'flex-start', paddingTop: '1.8rem', borderTop: `1px solid ${c.hairSoft}` }}>
              <div style={{ flexShrink: 0, width: 30, height: 30, border: `1px solid ${c.sage}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.sage }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L12 3V7C12 10 9.5 12.3 7 13C4.5 12.3 2 10 2 7V3L7 1Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <h4 style={{ fontFamily: sans, fontSize: '0.9rem', fontWeight: 500, color: c.forest, marginBottom: '0.35rem' }}>Regelverket uppdateras, Marillin håller dig ajour</h4>
                <p style={{ fontFamily: sans, fontSize: '0.86rem', fontWeight: 300, lineHeight: 1.8, color: c.inkBody, maxWidth: '52em' }}>
                  Marillin baserar sina bedömningar på aktuella och relevanta regelverk och uppdaterar löpande sin databas i takt med nya regelverk eller praxis.
                </p>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* STÖD I VARJE STEG */}
        <section id="stod" className="ml-section">
          <Eyebrow>Stöd i varje steg</Eyebrow>
          <p style={{ color: c.inkBody, fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300, maxWidth: '38em', marginBottom: '3.5rem' }}>
            Marillin bygger in regelverk, praxis och beslut direkt i arbetsflödet. Det ger ert bolag stöd i bedömningen i realtid, och en dokumentation som håller över tid.
          </p>

          <FadeUp>
            <div style={{ background: c.sageFaint, border: `1px solid ${c.hair}`, borderRadius: '10px', padding: '2.8rem 3rem', marginBottom: '3rem' }}>
              <Label style={{ fontSize: '0.66rem', letterSpacing: '0.16em', marginBottom: '1rem' }}>Kärnan</Label>
              <h3 style={{ fontFamily: serif, fontSize: 'clamp(1.9rem, 2.8vw, 2.4rem)', fontWeight: 400, lineHeight: 1.12, letterSpacing: '-0.02em', color: c.forest, marginBottom: '1rem', maxWidth: '18em' }}>Strukturerade bedömningar i realtid</h3>
              <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.85, color: c.inkBody, maxWidth: '46em' }}>
                Beskriv situationen ert bolag står inför. Marillin vägleder genom varje steg och ger en strukturerad analys grundad i relevanta regelverk, myndighetsbeslut och marknadspraxis. Marillin är ert beslutsstöd, bedömningen och beslutet är ert.
              </p>
            </div>
          </FadeUp>

          <div className="ml-cap-grid">
            {CAPABILITIES.map(([title, text], i) => (
              <FadeUp key={title} delay={i * 0.06}>
                <div className="ml-cap" style={{ height: '100%' }}>
                  <h4 style={{ fontFamily: sans, fontSize: '0.98rem', fontWeight: 500, color: c.forest, marginBottom: '0.6rem' }}>{title}</h4>
                  <p style={{ fontSize: '0.86rem', fontWeight: 300, lineHeight: 1.8, color: c.inkBody }}>{text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* TEAM */}
        <section id="team" className="ml-section" style={{ background: c.sectionBg, borderTop: `1px solid ${c.hair}`, borderBottom: `1px solid ${c.hair}` }}>
          <div style={{ maxWidth: '620px', marginBottom: '3rem' }}>
            <Eyebrow>Om oss</Eyebrow>
            <H2>Byggt av oss som levt med frågorna</H2>
            <p style={{ color: c.inkBody, fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 }}>
              Vi är tre grundare som alla har arbetat länge med informationsgivning i börsmiljö. Vi har sett hur regelmassan växer och hur bedömningarna blir allt mer komplexa, samtidigt som besluten måste fattas under tidspress. Marillin är byggt ur den erfarenheten.
            </p>
          </div>

          <FadeUp>
            <img src={teamPhoto} alt="Marillins grundare Ewelina Pettersson, Amanda Bergerståhl och Noora Jayasekara" style={{ width: '100%', maxWidth: '1000px', height: 'auto', display: 'block', margin: '0 auto 3.5rem', borderRadius: '10px', border: `1px solid ${c.hair}` }} />
          </FadeUp>

          <div className="ml-team-grid">
            {TEAM.map((person, i) => (
              <FadeUp key={person.name} delay={i * 0.08}>
                <p style={{ fontSize: '1.05rem', fontWeight: 500, color: c.forest, marginBottom: '0.2rem' }}>{person.name}</p>
                <Label style={{ marginBottom: '0.9rem' }}>Grundare</Label>
                <p style={{ fontSize: '0.87rem', color: c.inkBody, lineHeight: 1.8, fontWeight: 300, marginBottom: '1.1rem' }}>{person.bio}</p>
                <a href={person.linkedin} target="_blank" rel="noopener noreferrer" style={linkStyle}
                  onMouseEnter={e => { e.currentTarget.style.color = c.sage; e.currentTarget.style.borderBottomColor = c.sage; }}
                  onMouseLeave={e => { e.currentTarget.style.color = c.inkFaint; e.currentTarget.style.borderBottomColor = c.hair; }}>
                  LinkedIn
                </a>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* KONTAKT */}
        <section id="contact" className="ml-section ml-contact-grid">
          <div>
            <Eyebrow>Kom igång</Eyebrow>
            <H2>Intresserad av tidig tillgång?</H2>
            <div style={{ width: '36px', height: '1px', background: c.sage, margin: '1.5rem 0' }} />
            <p style={{ color: c.inkBody, fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300, maxWidth: '420px' }}>
              Marillin befinner sig i tidig fas och vi väljer just nu ut de bolag vi arbetar med inför bredare lansering. Hör av dig så berättar vi mer.
            </p>
            <div style={{ marginTop: '2.5rem' }}>
              <p style={{ fontSize: '0.85rem', color: c.inkFaint, lineHeight: 2 }}>
                Stockholm · Sverige<br />
                <a href="mailto:hey@marillin.se" style={{ color: c.sage, textDecoration: 'none' }}>hey@marillin.se</a>
              </p>
            </div>
          </div>
          <ContactForm />
        </section>

        {/* SIDFOT */}
        <footer className="ml-footer" style={{ borderTop: `1px solid ${c.hair}` }}>
          <p style={{ fontFamily: sans, fontSize: '0.74rem', fontWeight: 300, lineHeight: 1.8, color: c.inkFaint, maxWidth: '60em', marginBottom: '1.8rem' }}>
            {DISCLAIMER}
          </p>
          <div className="ml-footer-bottom" style={{ paddingTop: '1.5rem', borderTop: `1px solid ${c.hairSoft}` }}>
            <Logo size="sm" />
            <p style={{ fontFamily: sans, fontSize: '0.75rem', fontWeight: 400, color: c.inkFaint, letterSpacing: '0.04em' }}>© 2026 Marillin · Stockholm</p>
          </div>
        </footer>
      </div>
    </>
  );
}
