// Start Here — tabbed paths for Teacher / Principal / Parent.

function StartHere({ lang, setRoute, device, route, initialTab }) {
  const { COPY, TOKENS, FONT, t, Motif } = window;
  const isMobile = device === 'mobile';
  const [tab, setTab] = React.useState(initialTab || 'teacher');

  React.useEffect(() => {
    if (initialTab) setTab(initialTab);
  }, [initialTab]);

  const tabs = [
    { id: 'teacher',   label: COPY.audiences.teacher.label,   color: TOKENS.teal,   line: COPY.audiences.teacher.line },
    { id: 'principal', label: COPY.audiences.principal.label, color: TOKENS.bronze, line: COPY.audiences.principal.line },
    { id: 'parent',    label: COPY.audiences.parent.label,    color: TOKENS.sage,   line: COPY.audiences.parent.line },
  ];
  const active = tabs.find(x => x.id === tab);
  const steps = COPY.startHere[tab];

  return (
    <div style={{ background: TOKENS.ivory, color: TOKENS.ink }}>
      <section style={{
        padding: isMobile ? '32px 22px 20px' : '56px 64px 36px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <Motif size={16} color={TOKENS.bronze} opacity={0.8} />
          <span style={{
            fontFamily: FONT.ui, fontSize: 11, letterSpacing: 2,
            textTransform: 'uppercase', color: TOKENS.sage, fontWeight: 600,
          }}>{t(COPY.nav.start, lang)}</span>
        </div>
        <h1 style={{
          fontFamily: lang === 'ta' ? FONT.ta : FONT.display,
          fontSize: isMobile ? (lang === 'ta' ? 26 : 32) : (lang === 'ta' ? 44 : 52),
          color: TOKENS.ink, margin: 0, fontWeight: 400, lineHeight: 1.12,
        }}>{t(COPY.startHere.title, lang)}</h1>
        <p style={{
          fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
          fontSize: isMobile ? 14 : 16, color: TOKENS.muted,
          maxWidth: 620, marginTop: 16, marginBottom: 0, lineHeight: 1.55,
        }}>{t(COPY.startHere.intro, lang)}</p>
      </section>

      {/* tab row */}
      <section style={{
        padding: isMobile ? '0 22px' : '0 64px',
        borderBottom: `1px solid ${TOKENS.line}`,
      }}>
        <div style={{ display: 'flex', gap: isMobile ? 4 : 24, overflowX: 'auto' }}>
          {tabs.map(tb => (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '14px 14px 16px',
                borderBottom: `2px solid ${tab === tb.id ? tb.color : 'transparent'}`,
                color: tab === tb.id ? TOKENS.ink : TOKENS.muted,
                fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
                fontSize: isMobile ? (lang === 'ta' ? 15 : 14) : (lang === 'ta' ? 17 : 16),
                fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
                marginBottom: -1,
              }}>
              {t(tb.label, lang)}
            </button>
          ))}
        </div>
      </section>

      {/* content */}
      <section style={{
        padding: isMobile ? '28px 22px 40px' : '48px 64px 64px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 320px',
        gap: isMobile ? 28 : 48,
        alignItems: 'start',
        maxWidth: 1100, margin: '0 auto',
      }}>
        <div>
          <div style={{
            fontFamily: lang === 'ta' ? FONT.ta : FONT.display,
            fontSize: isMobile ? (lang === 'ta' ? 20 : 22) : (lang === 'ta' ? 26 : 30),
            color: TOKENS.ink, fontWeight: 400, lineHeight: 1.2,
            marginBottom: 24,
          }}>{t(active.line, lang)}</div>

          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {steps.map((s, i) => (
              <li key={i} style={{
                display: 'grid',
                gridTemplateColumns: '44px 1fr',
                gap: 14,
                padding: '18px 2px',
                borderBottom: i === steps.length - 1 ? 'none' : `1px solid ${TOKENS.lineSoft}`,
              }}>
                <div style={{
                  fontFamily: FONT.display,
                  fontSize: 30, color: active.color, fontWeight: 400,
                  lineHeight: 1, paddingTop: 4,
                }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{
                  fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
                  fontSize: isMobile ? 15 : 16, lineHeight: 1.55,
                  color: TOKENS.ink,
                }}>{t(s, lang)}</div>
              </li>
            ))}
          </ol>

          <div style={{ marginTop: 32, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={() => setRoute('competitions')}
              style={{
                background: active.color, color: TOKENS.ivory, border: 'none',
                padding: '12px 18px', borderRadius: 4,
                fontSize: 14, fontWeight: 500,
                fontFamily: lang === 'ta' ? FONT.ta : FONT.ui, cursor: 'pointer',
              }}>
              {lang === 'ta' ? 'போட்டிகளைப் பார் →' : 'See competitions →'}
            </button>
            <button
              onClick={() => setRoute('dates')}
              style={{
                background: 'transparent', color: TOKENS.ink,
                border: `1px solid ${TOKENS.line}`,
                padding: '12px 18px', borderRadius: 4,
                fontSize: 14, fontWeight: 500,
                fontFamily: lang === 'ta' ? FONT.ta : FONT.ui, cursor: 'pointer',
              }}>
              {lang === 'ta' ? 'தேதிகளைப் பார்' : 'See deadlines'}
            </button>
          </div>
        </div>

        {/* callout */}
        <aside style={{
          background: '#FFFFFF',
          border: `1px solid ${TOKENS.line}`,
          borderLeft: `3px solid ${active.color}`,
          padding: '22px 22px 24px',
          borderRadius: 4,
        }}>
          <div style={{
            fontFamily: FONT.ui, fontSize: 10, letterSpacing: 1.6,
            textTransform: 'uppercase', color: TOKENS.sage, fontWeight: 600,
            marginBottom: 10,
          }}>
            {lang === 'ta' ? 'இது ஏன் முக்கியம்' : 'Why this matters'}
          </div>
          <p style={{
            fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
            fontSize: 14, lineHeight: 1.55, color: TOKENS.ink, margin: 0,
          }}>
            {tab === 'teacher' && (lang === 'ta'
              ? 'ஒரு நல்ல ஆசிரியரின் பரிந்துரை — மாணவர் வாழ்க்கையில் ஒரு திருப்புமுனை. ஒரு நாள் செலவிட்டு, ஐந்து மாணவர்கள் முதல் முறையாக பதிவு செய்கிறார்கள்.'
              : 'A teacher\u2019s nudge can change a student\u2019s trajectory. One afternoon of your time, five students registered for the first time.')}
            {tab === 'principal' && (lang === 'ta'
              ? 'பள்ளிகளின் அங்கீகாரம் பங்கேற்பில் துவங்குகிறது. ஒரு சான்றிதழ் கூட பள்ளியின் கதையை மாற்றும்.'
              : 'School recognition begins with participation. Even one certificate reshapes a school\u2019s story.')}
            {tab === 'parent' && (lang === 'ta'
              ? 'உங்கள் ஆர்வமே உங்கள் குழந்தையின் முதல் ஊக்கம். போட்டியின் முடிவை விட — முயற்சி செய்த அனுபவமே மதிப்புள்ளது.'
              : 'Your interest is your child\u2019s first encouragement. The attempt matters more than the outcome.')}
          </p>
        </aside>
      </section>

      <window.Footer lang={lang} setRoute={setRoute} device={device} route={route} />
    </div>
  );
}

window.StartHere = StartHere;
