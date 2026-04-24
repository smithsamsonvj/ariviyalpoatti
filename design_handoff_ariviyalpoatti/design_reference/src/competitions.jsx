// Competitions listing + detail pages.

function Competitions({ lang, setRoute, device, route }) {
  const { COPY, COMPETITIONS, TOKENS, FONT, t, Motif, CompetitionCard } = window;
  const isMobile = device === 'mobile';
  const [filter, setFilter] = React.useState('all');

  const cats = ['all', 'govt', 'olympiad', 'ngo', 'robotics', 'private'];
  const filtered = filter === 'all'
    ? COMPETITIONS
    : COMPETITIONS.filter(c => c.category === filter);

  return (
    <div style={{ background: TOKENS.ivory, color: TOKENS.ink, minHeight: '100%' }}>
      {/* page header */}
      <section style={{
        background: TOKENS.ivory,
        borderBottom: `1px solid ${TOKENS.line}`,
        padding: isMobile ? '32px 22px 22px' : '56px 64px 40px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <Motif size={16} color={TOKENS.bronze} opacity={0.8} />
          <span style={{
            fontFamily: FONT.ui, fontSize: 11, letterSpacing: 2,
            textTransform: 'uppercase', color: TOKENS.sage, fontWeight: 600,
          }}>{t(COPY.nav.competitions, lang)}</span>
        </div>
        <h1 style={{
          fontFamily: lang === 'ta' ? FONT.ta : FONT.display,
          fontSize: isMobile ? (lang === 'ta' ? 26 : 32) : (lang === 'ta' ? 44 : 52),
          color: TOKENS.ink, margin: 0, fontWeight: 400, lineHeight: 1.12,
          maxWidth: 820, textWrap: 'pretty',
        }}>
          {lang === 'ta' ? 'தமிழ்நாட்டில் உங்கள் மாணவர்களுக்கான போட்டிகள்'
                         : 'Competitions your students can enter right now.'}
        </h1>
        <p style={{
          fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
          fontSize: isMobile ? 14 : 16, color: TOKENS.muted,
          maxWidth: 620, marginTop: 16, lineHeight: 1.55,
        }}>
          {lang === 'ta'
            ? 'ஒவ்வொரு கார்டிலும் என்ன, யார் தகுதியானவர், நடைமுறை, கடைசி தேதி மற்றும் அதிகாரப்பூர்வ தொடர்பு உள்ளது.'
            : 'Each card has the what, who\u2019s eligible, the process, the deadline and the official link.'}
        </p>

        <div style={{ marginTop: 20, maxWidth: 620 }}>
          <window.FreshnessBanner lang={lang} compact={isMobile} />
        </div>

        {/* category filters */}
        <div style={{
          display: 'flex', gap: 8, flexWrap: 'wrap',
          marginTop: isMobile ? 22 : 32,
        }}>
          {cats.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              style={{
                padding: '8px 14px',
                borderRadius: 999,
                border: `1px solid ${filter === c ? TOKENS.teal : TOKENS.line}`,
                background: filter === c ? TOKENS.teal : 'transparent',
                color: filter === c ? TOKENS.ivory : TOKENS.ink,
                fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
                fontSize: 13, fontWeight: 500, cursor: 'pointer',
                transition: 'all .15s',
              }}>
              {t(COPY.categories[c], lang)}
              <span style={{
                marginLeft: 6, opacity: 0.6, fontSize: 11,
              }}>
                {c === 'all' ? COMPETITIONS.length
                             : COMPETITIONS.filter(x => x.category === c).length}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* grid */}
      <section style={{
        padding: isMobile ? '22px 22px 32px' : '40px 64px 60px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: isMobile ? 12 : 18,
        }}>
          {filtered.map(c => <CompetitionCard key={c.id} comp={c} lang={lang} setRoute={setRoute} />)}
        </div>
      </section>

      <window.Footer lang={lang} setRoute={setRoute} device={device} route={route} />
    </div>
  );
}

function CompetitionDetail({ lang, setRoute, device, route, compId }) {
  const { COPY, COMPETITIONS, TOKENS, FONT, t, daysUntil, fmtDate, StatusPill } = window;
  const isMobile = device === 'mobile';
  const comp = COMPETITIONS.find(c => c.id === compId);
  if (!comp) {
    return (
      <div style={{ padding: 48, fontFamily: FONT.ui, background: TOKENS.ivory }}>
        Not found.
      </div>
    );
  }
  const d = daysUntil(comp.deadline);

  return (
    <div style={{ background: TOKENS.ivory, color: TOKENS.ink, minHeight: '100%' }}>
      {/* breadcrumb / back */}
      <div style={{
        padding: isMobile ? '16px 22px 0' : '24px 64px 0',
        fontFamily: FONT.ui, fontSize: 13,
      }}>
        <button
          onClick={() => setRoute('competitions')}
          style={{
            background: 'transparent', border: 'none',
            color: TOKENS.sage, cursor: 'pointer', padding: 0,
            fontSize: 13, fontFamily: FONT.ui,
          }}>
          {t(COPY.common.back, lang)} {t(COPY.nav.competitions, lang)}
        </button>
      </div>

      {/* header */}
      <section style={{
        padding: isMobile ? '18px 22px 28px' : '36px 64px 48px',
        borderBottom: `1px solid ${TOKENS.line}`,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
          flexWrap: 'wrap',
        }}>
          <span style={{
            fontFamily: FONT.ui, fontSize: 10, letterSpacing: 1.6,
            textTransform: 'uppercase', color: TOKENS.sage, fontWeight: 600,
          }}>{t(COPY.categories[comp.category], lang)}</span>
          <span style={{ color: TOKENS.line }}>·</span>
          <StatusPill status={comp.status} lang={lang} />
          <span style={{ color: TOKENS.line }}>·</span>
          <window.FreshnessBadge lang={lang} size="sm" />
        </div>

        <h1 style={{
          fontFamily: lang === 'ta' ? FONT.ta : FONT.display,
          fontSize: isMobile ? (lang === 'ta' ? 24 : 30) : (lang === 'ta' ? 40 : 48),
          color: TOKENS.ink, margin: 0, fontWeight: 400, lineHeight: 1.12,
          textWrap: 'pretty', maxWidth: 860,
        }}>{t(comp.name, lang)}</h1>

        <p style={{
          fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
          fontSize: isMobile ? 15 : 18,
          color: TOKENS.muted, lineHeight: 1.55,
          marginTop: 18, marginBottom: 0, maxWidth: 680,
        }}>{t(comp.summary, lang)}</p>
      </section>

      {/* Phase-by-phase timeline — the new narrative anchor */}
      <section style={{
        padding: isMobile ? '20px 22px 0' : '32px 64px 0',
        background: TOKENS.ivory,
      }}>
        <window.CompetitionTimeline compId={comp.id} lang={lang} isMobile={isMobile} />
      </section>

      {/* Tamil Nadu participation — district-level social proof */}
      <section style={{
        padding: isMobile ? '0 22px 4px' : '0 64px 8px',
        background: TOKENS.ivory,
      }}>
        <window.TNParticipationBlock compId={comp.id} lang={lang} isMobile={isMobile} />
      </section>

      {/* two-column body */}
      <section style={{
        padding: isMobile ? '28px 22px 36px' : '48px 64px 64px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 320px',
        gap: isMobile ? 32 : 48,
        alignItems: 'start',
      }}>
        <div>
          <SectionHead lang={lang} label={{ ta: 'நடைமுறை', en: 'Process' }} />
          <ol style={{
            listStyle: 'none', padding: 0, margin: 0,
            display: 'flex', flexDirection: 'column', gap: 14,
          }}>
            {comp.process.map((p, i) => (
              <li key={i} style={{
                display: 'grid',
                gridTemplateColumns: '36px 1fr',
                alignItems: 'start',
                gap: 14,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 99,
                  background: TOKENS.tealSoft, color: TOKENS.teal,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FONT.ui, fontSize: 13, fontWeight: 600,
                  marginTop: 2,
                }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{
                  fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
                  fontSize: isMobile ? 15 : 16, lineHeight: 1.55,
                  color: TOKENS.ink, paddingTop: 6,
                }}>{t(p, lang)}</div>
              </li>
            ))}
          </ol>

          <div style={{ height: 32 }} />

          <SectionHead lang={lang} label={{ ta: 'குறிப்பு', en: 'A note from us' }} />
          <p style={{
            fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
            fontSize: isMobile ? 14 : 15, lineHeight: 1.6,
            color: TOKENS.muted, margin: 0, maxWidth: 560,
          }}>
            {lang === 'ta'
              ? 'போட்டியில் பங்கேற்கும் முன் அதிகாரப்பூர்வ தளத்தில் தேதிகளையும் விவரங்களையும் உறுதி செய்யுங்கள். நாங்கள் தகவலை கவனமாக சேகரிக்கிறோம், ஆனால் விதிமுறைகள் மாறுபடலாம்.'
              : 'Please verify dates and details on the official site before acting. We gather this information carefully, but rules can change between announcements.'}
          </p>
        </div>

        {/* sidebar — key facts */}
        <aside style={{
          background: '#FFFFFF',
          border: `1px solid ${TOKENS.line}`,
          borderRadius: 4,
          padding: '4px 0',
          position: isMobile ? 'static' : 'sticky',
          top: 24,
        }}>
          <Fact lang={lang} label={COPY.common.eligibility} value={t(comp.eligibility, lang)} />
          <Fact lang={lang} label={COPY.common.deadline} value={fmtDate(comp.deadline, lang)}
                sub={d >= 0 ? `${d} ${t(COPY.common.daysLeft, lang)}` : null}
                subColor={d <= 20 ? TOKENS.bronze : TOKENS.sage} />
          <Fact lang={lang} label={COPY.common.fee} value={t(comp.fee, lang)} />
          <Fact lang={lang} label={COPY.common.organiser} value={t(comp.organiser, lang)} />
          <Fact lang={lang} label={COPY.common.since} value={comp.since} />
          <Fact lang={lang} label={COPY.common.reach} value={t(comp.reach, lang)} />
          <Fact lang={lang} label={COPY.common.schoolType} value={t(comp.schoolType, lang)} />
          <Fact lang={lang} label={COPY.common.intlPath} value={t(comp.intlPath, lang)} />
          <Fact lang={lang} label={COPY.common.official} value={comp.official} mono last />
          <div style={{ padding: '8px 20px 16px' }}>
            <button style={{
              width: '100%',
              background: TOKENS.bronze, color: TOKENS.ivory,
              border: 'none', padding: '14px 18px', borderRadius: 4,
              fontSize: 14, fontWeight: 500,
              fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
              cursor: 'pointer',
            }}>
              {t(COPY.common.register, lang)} →
            </button>
          </div>
        </aside>
      </section>

      <window.Footer lang={lang} setRoute={setRoute} device={device} route={route} />
    </div>
  );
}

function SectionHead({ lang, label }) {
  const { FONT, TOKENS, t } = window;
  return (
    <h2 style={{
      fontFamily: lang === 'ta' ? FONT.ta : FONT.display,
      fontSize: lang === 'ta' ? 20 : 24, fontWeight: 400,
      color: TOKENS.ink, margin: '0 0 20px',
      display: 'flex', alignItems: 'baseline', gap: 10,
    }}>
      <span style={{
        display: 'inline-block', width: 14, height: 2,
        background: TOKENS.bronze, transform: 'translateY(-5px)',
      }} />
      {t(label, lang)}
    </h2>
  );
}

function Fact({ lang, label, value, sub, subColor, mono, last }) {
  const { FONT, TOKENS, t } = window;
  return (
    <div style={{
      padding: '16px 20px',
      borderBottom: last ? 'none' : '1px solid rgba(26,26,46,0.06)',
      fontFamily: FONT.ui,
    }}>
      <div style={{
        fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase',
        color: TOKENS.sage, fontWeight: 600, marginBottom: 6,
      }}>{t(label, lang)}</div>
      <div style={{
        fontFamily: mono ? 'ui-monospace, SF Mono, Menlo, monospace'
                        : (lang === 'ta' ? FONT.ta : FONT.ui),
        fontSize: mono ? 13 : 15,
        color: TOKENS.ink, fontWeight: 500, lineHeight: 1.35,
        wordBreak: 'break-word',
      }}>{value}</div>
      {sub && (
        <div style={{
          fontSize: 12, color: subColor || TOKENS.sage,
          fontWeight: 500, marginTop: 4,
        }}>{sub}</div>
      )}
    </div>
  );
}

window.Competitions = Competitions;
window.CompetitionDetail = CompetitionDetail;
