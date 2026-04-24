// Nav bar — same on mobile + desktop, with a sticky language toggle.
// Links to pages are in-app route changes, not real navigation.

function TopBar({ lang, setLang, route, setRoute, variant = 'A', device = 'mobile' }) {
  const COPY = window.COPY, t = window.t, TOKENS = window.TOKENS, FONT = window.FONT;
  const LangToggle = window.LangToggle, Motif = window.Motif;
  const isMobile = device === 'mobile';
  // Simplified nav: logo + language toggle. A tiny "Start over" returns home.
  // Full sitemap lives in the footer / overflow menu only.
  const overflowItems = [
    { id: 'competitions', label: COPY.nav.competitions },
    { id: 'dates',        label: COPY.nav.dates },
    { id: 'about',        label: COPY.nav.about },
  ];
  const [menuOpen, setMenuOpen] = React.useState(false);
  const atHome = route === 'home';

  return (
    <header style={{
      background: TOKENS.teal,
      color: TOKENS.ivory,
      fontFamily: FONT.ui,
      position: 'relative',
      zIndex: 5,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '14px 18px' : '18px 44px',
        borderBottom: '1px solid rgba(245,240,232,0.10)',
      }}>
        <button
          onClick={() => setRoute('home')}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'transparent', border: 'none', color: 'inherit',
            cursor: 'pointer', padding: 0, textAlign: 'left',
          }}>
          <Motif size={isMobile ? 20 : 24} color={TOKENS.ivory} opacity={0.9} />
          <div style={{ lineHeight: 1 }}>
            <div style={{
              fontFamily: lang === 'ta' ? FONT.ta : FONT.display,
              fontSize: isMobile ? (lang === 'ta' ? 17 : 18) : (lang === 'ta' ? 20 : 22),
              fontWeight: lang === 'ta' ? 400 : 400,
              letterSpacing: lang === 'ta' ? 0 : 0.2,
            }}>{t(COPY.brand, lang)}</div>
            <div style={{
              fontSize: 10, opacity: 0.65, letterSpacing: 1.4,
              marginTop: 4, textTransform: 'uppercase',
            }}>ariviyalpoatti.in</div>
          </div>
        </button>

        {!isMobile && !atHome && (
          <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <button
              onClick={() => setRoute('home')}
              style={{
                background: 'transparent', border: 'none',
                color: TOKENS.ivory, opacity: 0.75,
                fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
                fontSize: 13, cursor: 'pointer',
                padding: '4px 2px',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M7.5 2L3.5 6L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {lang === 'ta' ? 'மீண்டும் தொடங்கு' : 'Start over'}
            </button>
            {overflowItems.map(n => (
              <button
                key={n.id}
                onClick={() => setRoute(n.id)}
                style={{
                  background: 'transparent', border: 'none',
                  color: TOKENS.ivory,
                  opacity: route === n.id ? 1 : 0.55,
                  fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
                  fontSize: lang === 'ta' ? 14 : 13,
                  fontWeight: 500, cursor: 'pointer',
                  padding: '4px 2px',
                  borderBottom: route === n.id ? `1.5px solid ${TOKENS.bronze}` : '1.5px solid transparent',
                }}>
                {t(n.label, lang)}
              </button>
            ))}
          </nav>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LangToggle lang={lang} onChange={setLang} compact={isMobile} />
          {isMobile && !atHome && (
            <button
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Menu"
              style={{
                width: 34, height: 34, border: '1px solid rgba(245,240,232,0.22)',
                borderRadius: 8, background: menuOpen ? 'rgba(245,240,232,0.14)' : 'transparent',
                color: TOKENS.ivory, cursor: 'pointer', padding: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
              <svg width="16" height="12" viewBox="0 0 16 12">
                <rect y="0"  width="16" height="1.6" fill="currentColor"/>
                <rect y="5"  width="16" height="1.6" fill="currentColor"/>
                <rect y="10" width="16" height="1.6" fill="currentColor"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {isMobile && menuOpen && !atHome && (
        <div style={{
          background: TOKENS.teal,
          borderBottom: '1px solid rgba(245,240,232,0.12)',
          padding: '4px 10px 12px',
        }}>
          <button
            onClick={() => { setRoute('home'); setMenuOpen(false); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              width: '100%', textAlign: 'left',
              padding: '12px 10px', background: 'transparent', border: 'none',
              color: TOKENS.ivory, opacity: 0.8,
              fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
              fontSize: lang === 'ta' ? 16 : 15,
              borderLeft: '2px solid transparent', cursor: 'pointer',
            }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M7.5 2L3.5 6L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {lang === 'ta' ? 'மீண்டும் தொடங்கு' : 'Start over'}
          </button>
          {overflowItems.map(n => (
            <button
              key={n.id}
              onClick={() => { setRoute(n.id); setMenuOpen(false); }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '12px 10px',
                background: 'transparent',
                border: 'none',
                color: TOKENS.ivory,
                opacity: route === n.id ? 1 : 0.75,
                fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
                fontSize: lang === 'ta' ? 16 : 15,
                borderLeft: route === n.id ? `2px solid ${TOKENS.bronze}` : '2px solid transparent',
                cursor: 'pointer',
              }}>
              {t(n.label, lang)}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

// Urgency strip — sits above the hero on Home.
function UrgencyStrip({ lang, setRoute, days = 15 }) {
  const COPY = window.COPY, t = window.t, TOKENS = window.TOKENS, FONT = window.FONT;
  return (
    <div style={{
      background: TOKENS.bronze,
      color: TOKENS.ivory,
      fontFamily: FONT.ui,
      padding: '10px 18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 14,
      fontSize: 13,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
        <span style={{
          width: 7, height: 7, borderRadius: 99, background: TOKENS.ivory,
          boxShadow: '0 0 0 4px rgba(245,240,232,0.18)', flexShrink: 0,
        }} />
        <span style={{
          fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase',
          opacity: 0.8, flexShrink: 0,
        }}>{t(COPY.home.deadlineKicker, lang)}</span>
        <span style={{
          fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
          fontSize: lang === 'ta' ? 14 : 13,
          fontWeight: 500,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {t(COPY.home.urgencyHeadline, lang)}
        </span>
      </div>
      <button
        onClick={() => setRoute('comp:ntse')}
        style={{
          background: 'transparent',
          color: TOKENS.ivory,
          border: '1px solid rgba(245,240,232,0.55)',
          padding: '4px 12px',
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 500,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
          flexShrink: 0,
        }}>
        {t(COPY.home.urgencyAction, lang)} →
      </button>
    </div>
  );
}

window.TopBar = TopBar;
window.UrgencyStrip = UrgencyStrip;
