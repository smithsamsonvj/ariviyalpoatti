// Home — role-first landing. The three role cards ARE the primary CTA.
// Clicking a role pushes into a role-specific flow:
//   variant A -> 'flow:<role>:0'   (guided, step-by-step)
//   variant B -> 'dash:<role>'      (single scrollable dashboard)
// Everything else (all competitions, calendar, why-this-exists) is a small
// escape-hatch link at the bottom.

function Home({ lang, setRoute, device, variant }) {
  const { COPY, TOKENS, FONT, t, Motif } = window;
  const isMobile = device === 'mobile';
  const bolder = variant === 'B';

  const audiences = [
    { id: 'teacher',   ...COPY.audiences.teacher,   color: TOKENS.teal },
    { id: 'principal', ...COPY.audiences.principal, color: TOKENS.bronze },
    { id: 'parent',    ...COPY.audiences.parent,    color: TOKENS.sage },
  ];

  const goToRole = (role) => {
    if (variant === 'B') setRoute(`dash:${role}`);
    else                 setRoute(`flow:${role}:0`);
  };

  // ------- hero -------
  const hero = (
    <section style={{
      background: TOKENS.teal,
      color: TOKENS.ivory,
      padding: isMobile ? '34px 22px 40px' : '68px 64px 76px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: isMobile ? 18 : 28,
        right: isMobile ? 18 : 44,
        display: 'flex', gap: 10, alignItems: 'center',
        opacity: 0.7,
      }}>
        <Motif size={isMobile ? 18 : 22} color={TOKENS.ivory} opacity={0.7}/>
        <Motif size={isMobile ? 14 : 18} color={TOKENS.ivory} opacity={0.4}/>
      </div>

      <div style={{
        fontFamily: FONT.ui,
        fontSize: 11, letterSpacing: 2,
        textTransform: 'uppercase',
        opacity: 0.68,
        marginBottom: isMobile ? 16 : 22,
      }}>{t(COPY.home.heroKicker, lang)}</div>

      <h1 style={{
        fontFamily: lang === 'ta' ? FONT.ta : FONT.display,
        fontWeight: 400,
        fontSize: isMobile ? (lang === 'ta' ? (bolder ? 30 : 28) : (bolder ? 40 : 34))
                           : (lang === 'ta' ? (bolder ? 50 : 44) : (bolder ? 68 : 58)),
        lineHeight: lang === 'ta' ? 1.3 : 1.08,
        letterSpacing: lang === 'en' ? -0.5 : 0,
        margin: 0,
        maxWidth: isMobile ? '100%' : 820,
        textWrap: 'pretty',
      }}>{t(COPY.home.heroTitle, lang)}</h1>

      <p style={{
        fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
        fontSize: isMobile ? 15 : (lang === 'ta' ? 18 : 17),
        lineHeight: 1.55,
        opacity: 0.82,
        maxWidth: isMobile ? '100%' : 600,
        marginTop: isMobile ? 16 : 22,
        marginBottom: 0,
      }}>{t(COPY.home.heroSub, lang)}</p>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontFamily: FONT.ui,
        fontSize: 11, letterSpacing: 0.5,
        opacity: 0.72,
        marginTop: isMobile ? 22 : 30,
        padding: '6px 12px',
        border: '1px solid rgba(245,240,232,0.25)',
        borderRadius: 999,
      }}>
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          <circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" strokeWidth="1.3" />
          <path d="M3 5.2l1.4 1.4L7.2 3.8" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2 }}>
          {lang === 'ta' ? 'சரிபார்க்கப்பட்டது' : 'Verified'}
        </span>
        <span style={{ opacity: 0.55 }}>·</span>
        <span style={{
          fontVariantNumeric: 'tabular-nums',
          fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
        }}>{window.fmtDate(window.LAST_VERIFIED, lang)}</span>
      </div>
    </section>
  );

  // ------- role cards (the primary CTA) -------
  const rolePrompt = (
    <div style={{
      padding: isMobile ? '32px 22px 14px' : '56px 64px 18px',
      background: TOKENS.ivory,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10,
      }}>
        <span style={{
          width: 24, height: 1, background: TOKENS.bronze,
        }} />
        <span style={{
          fontFamily: FONT.ui, fontSize: 11, letterSpacing: 2,
          textTransform: 'uppercase', color: TOKENS.bronze, fontWeight: 600,
        }}>
          {lang === 'ta' ? 'இங்கே தொடங்குங்கள்' : 'Start here'}
        </span>
      </div>
      <h2 style={{
        fontFamily: lang === 'ta' ? FONT.ta : FONT.display,
        fontSize: isMobile ? (lang === 'ta' ? 24 : 28) : (lang === 'ta' ? 36 : 42),
        color: TOKENS.ink, fontWeight: 400, margin: 0,
        lineHeight: 1.12, maxWidth: 680, textWrap: 'pretty',
      }}>
        {t(COPY.home.audiencePrompt, lang)}
      </h2>
      <p style={{
        fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
        fontSize: isMobile ? 14 : 16,
        color: TOKENS.muted, marginTop: 12, marginBottom: 0,
        maxWidth: 560, lineHeight: 1.55,
      }}>
        {lang === 'ta'
          ? 'ஒரு பாத்திரத்தைத் தேர்ந்தெடுங்கள். உங்களுக்கான படிகளை மட்டும் காட்டுவோம் — காலண்டர், கடிதங்கள், அடுத்த செயல்.'
          : 'Pick a role. We\u2019ll walk you through only the steps that matter to you — dates, forms, next action.'}
      </p>
    </div>
  );

  const roleCards = (
    <section style={{
      padding: isMobile ? '18px 22px 36px' : '18px 64px 64px',
      background: TOKENS.ivory,
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? 14 : 18,
    }}>
      {audiences.map(a => <RoleCard key={a.id} a={a} lang={lang} onClick={() => goToRole(a.id)} isMobile={isMobile} bolder={bolder} />)}
    </section>
  );

  // ------- small escape hatches -------
  const escape = (
    <section style={{
      padding: isMobile ? '0 22px 36px' : '0 64px 56px',
      background: TOKENS.ivory,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
      }}>
        <span style={{
          width: 24, height: 1, background: TOKENS.line,
        }} />
        <span style={{
          fontFamily: FONT.ui, fontSize: 10, letterSpacing: 2,
          textTransform: 'uppercase', color: TOKENS.muted, fontWeight: 600,
        }}>
          {lang === 'ta' ? 'அல்லது, நேரடியாக' : 'Or jump straight to'}
        </span>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: isMobile ? 10 : 14,
      }}>
        <EscapeLink lang={lang} label={{ ta: '12 போட்டிகளையும் பார்', en: 'All 12 competitions' }}
                    sub={{ ta: 'பட்டியல் + வடிகட்டி', en: 'List + filter' }}
                    onClick={() => setRoute('competitions')} />
        <EscapeLink lang={lang} label={{ ta: 'வருடாந்திர காலண்டர்', en: 'Annual calendar' }}
                    sub={{ ta: 'அனைத்து காலக்கெடுகள்', en: 'Every deadline' }}
                    onClick={() => setRoute('dates')} />
        <EscapeLink lang={lang} label={{ ta: 'இது ஏன் இருக்கிறது', en: 'Why this exists' }}
                    sub={{ ta: 'தமிழ்நாடு எண்களில்', en: 'Tamil Nadu in numbers' }}
                    onClick={() => setRoute('about')} />
      </div>
    </section>
  );

  const footer = (
    <footer style={{
      padding: isMobile ? '20px 22px 28px' : '32px 64px 40px',
      background: TOKENS.ink,
      color: TOKENS.ivory,
    }}>
      <div style={{
        fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
        fontSize: 12, opacity: 0.5, maxWidth: 640, lineHeight: 1.6,
      }}>{t(COPY.home.footerNote, lang)}</div>
    </footer>
  );

  return (
    <div style={{
      background: TOKENS.ivory, color: TOKENS.ink, minHeight: '100%',
    }}>
      {hero}
      {rolePrompt}
      {roleCards}
      {escape}
      {footer}
    </div>
  );
}

// ------- role card — full-width, color-block, prominent -------
function RoleCard({ a, lang, onClick, isMobile, bolder }) {
  const { TOKENS, FONT, t } = window;
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: 'left', cursor: 'pointer',
        background: a.color, color: TOKENS.ivory,
        border: 'none', borderRadius: 6,
        padding: isMobile ? '22px 20px 20px' : '28px 26px 26px',
        position: 'relative', overflow: 'hidden',
        minHeight: isMobile ? 0 : 240,
        display: 'flex', flexDirection: 'column',
        transition: 'transform .15s ease, box-shadow .15s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(26,26,46,0.16)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{
        fontFamily: FONT.ui, fontSize: 10, letterSpacing: 2,
        textTransform: 'uppercase', opacity: 0.72, fontWeight: 600,
        marginBottom: 10,
      }}>{lang === 'ta' ? 'நான் ஒரு' : 'I\u2019m a'}</div>
      <div style={{
        fontFamily: lang === 'ta' ? FONT.ta : FONT.display,
        fontSize: isMobile ? (bolder ? 32 : 28) : (bolder ? 44 : 38),
        lineHeight: 1.05, fontWeight: 400, marginBottom: 14,
      }}>{t(a.label, lang)}</div>
      <div style={{
        fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
        fontSize: isMobile ? 14 : 15, lineHeight: 1.5,
        opacity: 0.88, marginBottom: isMobile ? 18 : 24,
        flex: 1,
      }}>{t(a.detail, lang)}</div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: FONT.ui, fontSize: 13, fontWeight: 500,
        paddingTop: 14, borderTop: '1px solid rgba(245,240,232,0.25)',
      }}>
        <span>{lang === 'ta' ? 'எனக்கான வழியை காட்டு' : 'Show me my path'}</span>
        <span style={{ marginLeft: 'auto' }}>→</span>
      </div>
    </button>
  );
}

function EscapeLink({ lang, label, sub, onClick }) {
  const { TOKENS, FONT, t } = window;
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: 'left', cursor: 'pointer',
        background: '#fff', color: TOKENS.ink,
        border: `1px solid ${TOKENS.line}`, borderRadius: 4,
        padding: '16px 18px',
        display: 'flex', flexDirection: 'column', gap: 4,
        transition: 'border-color .15s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = TOKENS.bronze; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = TOKENS.line; }}
    >
      <div style={{
        fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
        fontSize: 15, fontWeight: 500, color: TOKENS.ink,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        {t(label, lang)}
        <span style={{ marginLeft: 'auto', color: TOKENS.sage, fontSize: 14 }}>→</span>
      </div>
      <div style={{
        fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
        fontSize: 12, color: TOKENS.muted,
      }}>{t(sub, lang)}</div>
    </button>
  );
}

window.Home = Home;
