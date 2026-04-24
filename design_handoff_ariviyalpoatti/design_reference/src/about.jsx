// Why This Exists — short, honest.

function About({ lang, setRoute, device, route }) {
  const { COPY, TOKENS, FONT, t, Motif } = window;
  const isMobile = device === 'mobile';

  return (
    <div style={{ background: TOKENS.ivory, color: TOKENS.ink }}>
      <section style={{
        padding: isMobile ? '40px 22px 36px' : '72px 64px 56px',
        borderBottom: `1px solid ${TOKENS.line}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <Motif size={16} color={TOKENS.bronze} opacity={0.8} />
          <span style={{
            fontFamily: FONT.ui, fontSize: 11, letterSpacing: 2,
            textTransform: 'uppercase', color: TOKENS.sage, fontWeight: 600,
          }}>{t(COPY.nav.about, lang)}</span>
        </div>
        <h1 style={{
          fontFamily: lang === 'ta' ? FONT.ta : FONT.display,
          fontSize: isMobile ? (lang === 'ta' ? 28 : 34) : (lang === 'ta' ? 48 : 56),
          color: TOKENS.ink, margin: 0, fontWeight: 400, lineHeight: 1.1,
          maxWidth: 700,
        }}>{t(COPY.about.title, lang)}</h1>
      </section>

      <section style={{
        padding: isMobile ? '32px 22px 24px' : '56px 64px 40px',
        maxWidth: 720, margin: '0 auto',
      }}>
        {COPY.about.body.map((p, i) => (
          <p key={i} style={{
            fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
            fontSize: isMobile ? 16 : 19,
            lineHeight: lang === 'ta' ? 1.75 : 1.6,
            color: i === 0 ? TOKENS.ink : TOKENS.ink,
            fontWeight: i === 0 ? 500 : 400,
            margin: i === 0 ? '0 0 28px' : '0 0 22px',
            textWrap: 'pretty',
          }}>{t(p, lang)}</p>
        ))}

        {/* Tamil Nadu facts */}
        <div style={{
          marginTop: 36,
          padding: isMobile ? '28px 22px' : '32px 36px',
          background: '#FFFFFF',
          border: `1px solid ${TOKENS.line}`,
          borderLeft: `3px solid ${TOKENS.bronze}`,
        }}>
          <div style={{
            fontFamily: FONT.ui, fontSize: 10, letterSpacing: 2,
            textTransform: 'uppercase', color: TOKENS.bronze, fontWeight: 600,
            marginBottom: 14,
          }}>{t(COPY.about.tnTitle, lang)}</div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 14 : '18px 28px',
          }}>
            {COPY.about.tnFacts.map((f, i) => (
              <div key={i} style={{
                fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
                fontSize: isMobile ? 15 : 16,
                lineHeight: 1.5, color: TOKENS.ink,
                paddingLeft: 14,
                borderLeft: `1px solid ${TOKENS.line}`,
              }}>{t(f, lang)}</div>
            ))}
          </div>
        </div>

        {/* sources */}
        <div style={{
          marginTop: 36,
          paddingTop: 24,
          borderTop: `1px solid ${TOKENS.line}`,
        }}>
          <div style={{
            fontFamily: FONT.ui, fontSize: 10, letterSpacing: 1.6,
            textTransform: 'uppercase', color: TOKENS.sage, fontWeight: 600,
            marginBottom: 8,
          }}>{t(COPY.about.sources, lang)}</div>
          <div style={{
            fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
            fontSize: 12, color: TOKENS.muted, lineHeight: 1.65,
          }}>{t(COPY.about.sourcesText, lang)}</div>
        </div>

        <div style={{
          marginTop: 36,
          paddingTop: 28,
          borderTop: `1px solid ${TOKENS.line}`,
          display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap',
        }}>
          <span style={{
            fontFamily: FONT.ui, fontSize: 10, letterSpacing: 1.6,
            textTransform: 'uppercase', color: TOKENS.sage, fontWeight: 600,
          }}>{t(COPY.about.contact, lang)}</span>
          <a href="mailto:hello@ariviyalpoatti.in" style={{
            fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
            fontSize: 14, color: TOKENS.bronze,
            textDecoration: 'none', fontWeight: 500,
          }}>hello@ariviyalpoatti.in</a>
        </div>
      </section>

      <window.Footer lang={lang} setRoute={setRoute} device={device} route={route} />
    </div>
  );
}

window.About = About;
