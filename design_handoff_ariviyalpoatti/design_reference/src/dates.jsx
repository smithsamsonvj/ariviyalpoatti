// Key Dates — vertical timeline with month anchors + urgency dots.

function KeyDates({ lang, setRoute, device, route }) {
  const { COPY, COMPETITIONS, TOKENS, FONT, t, daysUntil, fmtDate, StatusPill, Motif } = window;
  const isMobile = device === 'mobile';

  // group by YYYY-MM
  const sorted = [...COMPETITIONS].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  const byMonth = {};
  sorted.forEach(c => {
    const d = new Date(c.deadline);
    const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, '0')}`;
    byMonth[key] = byMonth[key] || { year: d.getFullYear(), month: d.getMonth(), items: [] };
    byMonth[key].items.push(c);
  });
  const months = Object.values(byMonth);

  const taM = ['ஜனவரி','பிப்ரவரி','மார்ச்','ஏப்ரல்','மே','ஜூன்','ஜூலை','ஆகஸ்ட்','செப்டம்பர்','அக்டோபர்','நவம்பர்','டிசம்பர்'];
  const enM = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  return (
    <div style={{ background: TOKENS.ivory, color: TOKENS.ink }}>
      <section style={{
        padding: isMobile ? '32px 22px 20px' : '56px 64px 36px',
        borderBottom: `1px solid ${TOKENS.line}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <Motif size={16} color={TOKENS.bronze} opacity={0.8} />
          <span style={{
            fontFamily: FONT.ui, fontSize: 11, letterSpacing: 2,
            textTransform: 'uppercase', color: TOKENS.sage, fontWeight: 600,
          }}>{t(COPY.nav.dates, lang)}</span>
        </div>
        <h1 style={{
          fontFamily: lang === 'ta' ? FONT.ta : FONT.display,
          fontSize: isMobile ? (lang === 'ta' ? 26 : 32) : (lang === 'ta' ? 44 : 52),
          color: TOKENS.ink, margin: 0, fontWeight: 400, lineHeight: 1.12,
          maxWidth: 820,
        }}>{t(COPY.dates.title, lang)}</h1>
        <p style={{
          fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
          fontSize: isMobile ? 14 : 16, color: TOKENS.muted,
          maxWidth: 620, marginTop: 16, marginBottom: 22, lineHeight: 1.55,
        }}>{t(COPY.dates.sub, lang)}</p>

        <button style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: '#25D366', color: '#FFFFFF',
          border: 'none', padding: '10px 16px', borderRadius: 999,
          fontSize: 13, fontWeight: 500,
          fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
          cursor: 'pointer',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01A9.82 9.82 0 0 0 12.04 2z"/>
          </svg>
          {t(COPY.dates.shareWhatsapp, lang)}
        </button>

        <div style={{ marginTop: 22, maxWidth: 620 }}>
          <window.FreshnessBanner lang={lang} compact={isMobile} />
        </div>
      </section>

      {/* collision-zone advisory */}
      <section style={{
        padding: isMobile ? '20px 22px' : '28px 64px',
        background: 'rgba(181,96,58,0.06)',
        borderBottom: `1px solid ${TOKENS.line}`,
      }}>
        <div style={{
          maxWidth: 860, margin: '0 auto',
          display: 'flex', gap: 14, alignItems: 'flex-start',
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: 99,
            background: TOKENS.bronze, marginTop: 7, flexShrink: 0,
          }} />
          <div>
            <div style={{
              fontFamily: FONT.ui, fontSize: 10, letterSpacing: 1.6,
              textTransform: 'uppercase', color: TOKENS.bronze, fontWeight: 600,
              marginBottom: 6,
            }}>
              {lang === 'ta' ? 'எச்சரிக்கை' : 'Heads up'}
            </div>
            <div style={{
              fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
              fontSize: isMobile ? 14 : 15, lineHeight: 1.55,
              color: TOKENS.ink, maxWidth: 640,
            }}>{t(COPY.dates.collisionNote, lang)}</div>
          </div>
        </div>
      </section>

      {/* timeline */}
      <section style={{
        padding: isMobile ? '24px 22px 40px' : '40px 64px 64px',
        maxWidth: 860, margin: '0 auto',
      }}>
        {months.map(m => (
          <div key={`${m.year}-${m.month}`} style={{ marginBottom: isMobile ? 28 : 40 }}>
            {/* month anchor */}
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 14,
              marginBottom: 16,
              paddingBottom: 10, borderBottom: `1px solid ${TOKENS.line}`,
            }}>
              <span style={{
                fontFamily: lang === 'ta' ? FONT.ta : FONT.display,
                fontSize: isMobile ? 24 : 32, color: TOKENS.teal,
                fontWeight: 400, lineHeight: 1,
              }}>
                {lang === 'ta' ? taM[m.month] : enM[m.month]}
              </span>
              <span style={{
                fontFamily: FONT.ui, fontSize: 13,
                color: TOKENS.muted, letterSpacing: 0.4,
              }}>{m.year}</span>
              <span style={{
                marginLeft: 'auto',
                fontFamily: FONT.ui, fontSize: 11, letterSpacing: 1.2,
                textTransform: 'uppercase', color: TOKENS.sage,
              }}>
                {m.items.length} {lang === 'ta' ? 'போட்டிகள்' : 'competitions'}
              </span>
            </div>

            <div>
              {m.items.map(c => <TimelineRow key={c.id} comp={c} lang={lang} setRoute={setRoute} isMobile={isMobile} />)}
            </div>
          </div>
        ))}
      </section>

      <window.Footer lang={lang} setRoute={setRoute} device={device} route={route} />
    </div>
  );
}

function TimelineRow({ comp, lang, setRoute, isMobile }) {
  const { COPY, TOKENS, FONT, t, daysUntil, fmtDate, StatusPill } = window;
  const d = new Date(comp.deadline);
  const days = daysUntil(comp.deadline);
  const color = comp.status === 'soon'   ? TOKENS.bronze
              : comp.status === 'open'   ? TOKENS.sage
              : comp.status === 'closed' ? TOKENS.muted
              :                            TOKENS.teal;
  return (
    <button
      onClick={() => setRoute(`comp:${comp.id}`)}
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '56px 1fr auto' : '72px 1fr auto',
        alignItems: 'center',
        gap: isMobile ? 12 : 22,
        width: '100%',
        background: 'transparent',
        border: 'none',
        borderBottom: `1px solid ${TOKENS.lineSoft}`,
        padding: isMobile ? '16px 4px' : '22px 8px',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: FONT.ui,
        transition: 'background .12s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = TOKENS.tealSoft}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
      {/* big date */}
      <div style={{ textAlign: 'left', display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{
          fontFamily: FONT.display, fontSize: isMobile ? 30 : 40,
          color: TOKENS.ink, fontWeight: 400, lineHeight: 1,
        }}>{d.getDate()}</span>
        <span style={{ width: 8, height: 8, borderRadius: 99, background: color, alignSelf: 'center' }} />
      </div>

      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: lang === 'ta' ? FONT.ta : FONT.display,
          fontSize: lang === 'ta' ? 17 : 19,
          color: TOKENS.ink, lineHeight: 1.25, fontWeight: 400,
          textWrap: 'pretty',
          overflow: 'hidden', textOverflow: 'ellipsis',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>{t(comp.name, lang)}</div>
        <div style={{
          display: 'flex', gap: 10, alignItems: 'center',
          marginTop: 6, flexWrap: 'wrap',
        }}>
          <span style={{
            fontSize: 11, letterSpacing: 1.3, textTransform: 'uppercase',
            color: TOKENS.sage, fontWeight: 600,
          }}>{t(COPY.categories[comp.category], lang)}</span>
          <StatusPill status={comp.status} lang={lang} size="sm" />
        </div>
      </div>

      <div style={{
        textAlign: 'right',
        display: isMobile ? 'none' : 'block',
      }}>
        {days >= 0 && (
          <div style={{
            fontFamily: FONT.ui, fontSize: 13, fontWeight: 600,
            color: days <= 20 ? TOKENS.bronze : TOKENS.sage,
          }}>
            {days} {t(COPY.common.daysLeft, lang)}
          </div>
        )}
        <div style={{
          fontSize: 11, color: TOKENS.muted, marginTop: 2,
        }}>{fmtDate(comp.deadline, lang)}</div>
      </div>
    </button>
  );
}

window.KeyDates = KeyDates;
