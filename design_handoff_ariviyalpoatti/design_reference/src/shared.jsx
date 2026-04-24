// Shared design tokens + helpers + small shared components for ariviyalpoatti.in

const TOKENS = {
  teal:    '#0D5C63',   // primary — headers, nav, hero bg
  ivory:   '#F5F0E8',   // page bg — warmer than white, easier on Tamil script
  bronze:  '#B5603A',   // accent / CTA — sparingly
  sage:    '#5C7C6F',   // tags, labels, secondary text
  ink:     '#1A1A2E',   // body text
  // derived
  line:    'rgba(26,26,46,0.10)',
  lineSoft:'rgba(26,26,46,0.06)',
  muted:   'rgba(26,26,46,0.62)',
  tealSoft:'rgba(13,92,99,0.08)',
  bronzeSoft:'rgba(181,96,58,0.10)',
};

// Quick language helper. `t(obj, lang)` reads {ta, en} pairs.
const t = (obj, lang) => {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] ?? obj.en ?? obj.ta ?? '';
};

// Font helpers. Tamil uses Tiro Tamil; English headings use DM Serif Display;
// English body/UI uses DM Sans.
const FONT = {
  ta: '"Tiro Tamil", "Noto Sans Tamil", serif',
  display: '"DM Serif Display", Georgia, serif',
  ui: '"DM Sans", -apple-system, sans-serif',
};

// Count days between now and an ISO date (returns negative if past).
const daysUntil = (iso, nowRef) => {
  const now = nowRef || new Date('2026-04-23');   // pinned "today" for demo
  const d = new Date(iso);
  return Math.ceil((d - now) / (1000 * 60 * 60 * 24));
};

// Format a date per language.
const fmtDate = (iso, lang) => {
  const d = new Date(iso);
  const taM = ['ஜனவரி','பிப்ரவரி','மார்ச்','ஏப்ரல்','மே','ஜூன்','ஜூலை','ஆகஸ்ட்','செப்டம்பர்','அக்டோபர்','நவம்பர்','டிசம்பர்'];
  const enM = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  if (lang === 'ta') return `${d.getDate()} ${taM[d.getMonth()]} ${d.getFullYear()}`;
  return `${enM[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

// Language toggle — a segmented control. Tamil is left, English is right;
// default is Tamil.
function LangToggle({ lang, onChange, compact }) {
  const h = compact ? 30 : 34;
  const pad = compact ? '0 12px' : '0 16px';
  const fs = compact ? 13 : 14;
  const wrap = {
    display: 'inline-flex',
    padding: 3,
    borderRadius: 999,
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.18)',
    fontFamily: FONT.ui,
    alignItems: 'center',
    height: h,
    lineHeight: 1,
  };
  const btn = (active, first) => ({
    height: h - 8,
    padding: pad,
    border: 'none',
    borderRadius: 999,
    cursor: 'pointer',
    fontSize: fs,
    fontWeight: 500,
    letterSpacing: first ? 0 : 0.2,
    background: active ? TOKENS.ivory : 'transparent',
    color: active ? TOKENS.teal : 'rgba(245,240,232,0.80)',
    fontFamily: first ? FONT.ta : FONT.ui,
    transition: 'all .16s',
  });
  return (
    <div style={wrap} role="group" aria-label="Language">
      <button style={btn(lang === 'ta', true)} onClick={() => onChange('ta')}>த</button>
      <button style={btn(lang === 'en', false)} onClick={() => onChange('en')}>EN</button>
    </div>
  );
}

// A tiny kolam-adjacent geometric motif, used as a section marker only.
// 4 small dots + a thin square outline. Nothing culturally specific, just
// a restrained form that reads as Tamil-identity-adjacent without leaning
// on temple iconography.
function Motif({ size = 20, color = TOKENS.bronze, opacity = 0.7 }) {
  const s = size;
  const c = s / 2;
  return (
    <svg width={s} height={s} viewBox="0 0 20 20" style={{ opacity, flexShrink: 0 }}>
      <rect x="3" y="3" width="14" height="14" fill="none" stroke={color} strokeWidth="0.6" transform="rotate(45 10 10)" />
      <circle cx="10" cy="3" r="0.9" fill={color} />
      <circle cx="10" cy="17" r="0.9" fill={color} />
      <circle cx="3" cy="10" r="0.9" fill={color} />
      <circle cx="17" cy="10" r="0.9" fill={color} />
      <circle cx="10" cy="10" r="1.1" fill={color} />
    </svg>
  );
}

// Monospace label for placeholder asset slots.
function PlaceholderLabel({ text, color = TOKENS.sage }) {
  return (
    <span style={{
      fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color,
      opacity: 0.7,
    }}>{text}</span>
  );
}

// Small status pill used across competition cards and key dates.
function StatusPill({ status, lang, size = 'md' }) {
  const COPY = window.COPY;
  const map = {
    open:     { bg: 'rgba(92,124,111,0.14)', fg: TOKENS.sage,   label: COPY.dates.statusOpen },
    soon:     { bg: 'rgba(181,96,58,0.12)',  fg: TOKENS.bronze, label: COPY.dates.statusSoon },
    upcoming: { bg: 'rgba(13,92,99,0.10)',   fg: TOKENS.teal,   label: COPY.dates.statusUpcoming },
    closed:   { bg: 'rgba(26,26,46,0.06)',   fg: TOKENS.muted,  label: COPY.dates.statusClosed },
  };
  const v = map[status] || map.upcoming;
  const fs = size === 'sm' ? 10 : 11;
  const pad = size === 'sm' ? '2px 7px' : '3px 9px';
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: v.bg,
      color: v.fg,
      padding: pad,
      borderRadius: 999,
      fontSize: fs,
      fontWeight: 600,
      letterSpacing: 0.3,
      fontFamily: FONT.ui,
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: 99, background: v.fg }} />
      {t(v.label, lang)}
    </span>
  );
}

window.TOKENS = TOKENS;
window.FONT = FONT;
window.t = t;
window.daysUntil = daysUntil;
window.fmtDate = fmtDate;
window.LangToggle = LangToggle;
window.Motif = Motif;
window.PlaceholderLabel = PlaceholderLabel;
window.StatusPill = StatusPill;

// Card shown on the competitions grid. Opens detail on click.
function CompetitionCard({ comp, lang, setRoute }) {
  const COPY = window.COPY;
  const d = daysUntil(comp.deadline);
  return (
    <button
      onClick={() => setRoute(`comp:${comp.id}`)}
      style={{
        textAlign: 'left', cursor: 'pointer',
        background: TOKENS.ivory,
        border: `1px solid ${TOKENS.line}`,
        borderRadius: 4, padding: '20px 20px 18px',
        display: 'flex', flexDirection: 'column', gap: 12,
        transition: 'border-color .15s, transform .15s, box-shadow .15s',
        fontFamily: FONT.ui, color: TOKENS.ink,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = TOKENS.teal;
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 10px 22px rgba(26,26,46,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = TOKENS.line;
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span style={{
          fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase',
          color: TOKENS.sage, fontWeight: 600,
        }}>{t(COPY.categories[comp.category], lang)}</span>
        <span style={{ color: TOKENS.line }}>·</span>
        <StatusPill status={comp.status} lang={lang} size="sm" />
      </div>
      <h3 style={{
        margin: 0, fontFamily: lang === 'ta' ? FONT.ta : FONT.display,
        fontSize: lang === 'ta' ? 18 : 20, fontWeight: 400,
        lineHeight: 1.2, color: TOKENS.ink, textWrap: 'pretty',
      }}>{t(comp.name, lang)}</h3>
      {comp.shortName && (
        <div style={{ fontSize: 12, color: TOKENS.muted, letterSpacing: 0.4 }}>
          {t(comp.shortName, lang)}
        </div>
      )}
      <div style={{
        fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
        fontSize: 13, color: TOKENS.muted, lineHeight: 1.55,
      }}>{t(comp.eligibility, lang)}</div>
      <div style={{
        marginTop: 'auto', paddingTop: 10,
        borderTop: `1px solid ${TOKENS.lineSoft}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 12, color: TOKENS.ink,
      }}>
        <span style={{ fontFamily: lang === 'ta' ? FONT.ta : FONT.ui, opacity: 0.72 }}>
          {t(comp.deadlineLabel, lang)}: {fmtDate(comp.deadline, lang)}
        </span>
        <span style={{
          color: d < 0 ? TOKENS.muted : (d < 30 ? TOKENS.bronze : TOKENS.sage),
          fontWeight: 600, fontVariantNumeric: 'tabular-nums',
        }}>
          {d < 0 ? (lang === 'ta' ? 'முடிந்தது' : 'closed')
                 : (lang === 'ta' ? `${d} நாட்கள்` : `${d} days`)}
        </span>
      </div>
      <div style={{
        fontSize: 10, color: TOKENS.muted, letterSpacing: 0.4,
        fontFamily: FONT.ui, display: 'flex', alignItems: 'center', gap: 6,
        marginTop: 2,
      }}>
        <span style={{ width: 4, height: 4, borderRadius: 99, background: TOKENS.teal, opacity: 0.6 }} />
        {lang === 'ta' ? 'சரிபார்க்கப்பட்டது' : 'Verified'} · {fmtDate(window.LAST_VERIFIED, lang)}
      </div>
    </button>
  );
}
window.CompetitionCard = CompetitionCard;

// ------- Freshness signaling -------
// Show on listing page headers + competition detail. Tone: honest & specific.
// A small dot + "Verified · <date>" — pairs with the footer disclaimer.

function FreshnessBadge({ lang, size = 'md' }) {
  const d = window.LAST_VERIFIED;
  if (!d) return null;
  const fs = size === 'sm' ? 10 : 11;
  const pad = size === 'sm' ? '3px 8px' : '4px 10px';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: pad, borderRadius: 999,
      background: TOKENS.tealSoft,
      color: TOKENS.teal,
      fontSize: fs, fontWeight: 600, letterSpacing: 0.3,
      fontFamily: FONT.ui,
      whiteSpace: 'nowrap',
    }}>
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
        <circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M3 5.2l1.4 1.4L7.2 3.8" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ textTransform: 'uppercase' }}>
        {lang === 'ta' ? 'சரிபார்க்கப்பட்டது' : 'Verified'}
      </span>
      <span style={{ opacity: 0.65, fontWeight: 500, textTransform: 'none' }}>·</span>
      <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 500, textTransform: 'none' }}>
        {fmtDate(d, lang)}
      </span>
    </span>
  );
}
window.FreshnessBadge = FreshnessBadge;

// A wider banner for page headers — explains what "verified" actually means.
function FreshnessBanner({ lang, compact }) {
  const d = window.LAST_VERIFIED;
  if (!d) return null;
  return (
    <div style={{
      display: 'flex', gap: 12,
      alignItems: 'flex-start',
      padding: compact ? '12px 14px' : '14px 18px',
      background: TOKENS.tealSoft,
      borderLeft: `2px solid ${TOKENS.teal}`,
      borderRadius: 3,
      fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
      fontSize: compact ? 12 : 13, lineHeight: 1.5,
      color: TOKENS.ink,
    }}>
      <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, marginTop: 1, color: TOKENS.teal }}>
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5 8.3l2.1 2.1L11 6.4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div>
        <div style={{ fontWeight: 600, color: TOKENS.teal, marginBottom: 2 }}>
          {lang === 'ta'
            ? `கடைசியாக சரிபார்க்கப்பட்டது — ${fmtDate(d, lang)}`
            : `Last cross-checked against official sources \u00b7 ${fmtDate(d, lang)}`}
        </div>
        <div style={{ color: TOKENS.muted, fontSize: compact ? 11 : 12 }}>
          {lang === 'ta'
            ? 'ஒவ்வொரு போட்டியின் அதிகாரப்பூர்வ தொடர்பு உங்களுக்கு கீழே உள்ளது. விண்ணப்பிக்கும் முன் எப்போதும் ஒருமுறை பார்க்கவும்.'
            : 'Each entry links to its official source below. Always verify once before you apply.'}
        </div>
      </div>
    </div>
  );
}
window.FreshnessBanner = FreshnessBanner;

// ------- In Tamil Nadu block (competition detail page) -------
// Surfaces district-level social proof: how many schools from TN participate,
// which districts are covered, named schools grouped by district.
// Expandable — shows 3 districts by default.

function TNParticipationBlock({ compId, lang, isMobile }) {
  const data = (window.TN_PARTICIPATION || {})[compId];
  const [expanded, setExpanded] = React.useState(false);
  if (!data) return null;

  const districtsShown = expanded ? data.examples : data.examples.slice(0, 3);
  const remaining = data.examples.length - districtsShown.length;
  const districtsCovered = data.districts;

  const label = lang === 'ta' ? 'தமிழ்நாட்டில்' : 'In Tamil Nadu';

  return (
    <section style={{
      background: '#FFFFFF',
      border: `1px solid ${TOKENS.line}`,
      borderRadius: 4,
      padding: 0,
      overflow: 'hidden',
      marginBottom: 8,
    }}>
      {/* header */}
      <header style={{
        padding: isMobile ? '18px 18px 14px' : '22px 26px 18px',
        background: TOKENS.tealSoft,
        borderBottom: `1px solid ${TOKENS.line}`,
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', gap: 12, flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" style={{ color: TOKENS.teal, flexShrink: 0 }}>
            <path d="M10 2C6.5 2 4 4.5 4 7.8c0 4.4 6 10 6 10s6-5.6 6-10C16 4.5 13.5 2 10 2z"
                  fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            <circle cx="10" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth="1.4"/>
          </svg>
          <div>
            <div style={{
              fontFamily: FONT.ui, fontSize: 10, letterSpacing: 1.8,
              textTransform: 'uppercase', color: TOKENS.teal,
              fontWeight: 700,
            }}>{label}</div>
            <div style={{
              fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
              fontSize: 13, color: TOKENS.muted, marginTop: 2,
            }}>{lang === 'ta' ? '2024–25 கல்வியாண்டு' : '2024\u201325 academic year'}</div>
          </div>
        </div>
        <window.FreshnessBadge lang={lang} size="sm" />
      </header>

      {/* stats row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)',
        borderBottom: `1px solid ${TOKENS.lineSoft}`,
      }}>
        {[
          { value: data.schools, label: { ta: 'பள்ளிகள்', en: 'Schools' } },
          { value: `${districtsCovered}/38`, label: { ta: 'மாவட்டங்கள்', en: 'Districts' } },
          { value: data.students, label: { ta: 'மாணவர்கள்', en: 'Students' } },
        ].map((s, i) => (
          <div key={i} style={{
            padding: isMobile ? '16px 10px' : '22px 20px',
            borderRight: i < 2 ? `1px solid ${TOKENS.lineSoft}` : 'none',
            textAlign: 'left',
          }}>
            <div style={{
              fontFamily: FONT.display,
              fontSize: isMobile ? 22 : 30,
              color: TOKENS.ink, lineHeight: 1, fontWeight: 400,
              fontVariantNumeric: 'tabular-nums',
              marginBottom: 6,
            }}>{s.value}</div>
            <div style={{
              fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
              fontSize: 11, color: TOKENS.muted,
              letterSpacing: 0.3, textTransform: 'uppercase',
            }}>{t(s.label, lang)}</div>
          </div>
        ))}
      </div>

      {/* note */}
      {data.note && (
        <div style={{
          padding: isMobile ? '14px 18px' : '16px 26px',
          background: TOKENS.ivory,
          borderBottom: `1px solid ${TOKENS.lineSoft}`,
          fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
          fontSize: isMobile ? 13 : 14,
          color: TOKENS.ink, lineHeight: 1.55,
        }}>
          <span style={{ color: TOKENS.bronze, marginRight: 8, fontWeight: 600 }}>·</span>
          {t(data.note, lang)}
        </div>
      )}

      {/* districts */}
      <div style={{ padding: isMobile ? '18px 18px 4px' : '22px 26px 8px' }}>
        <div style={{
          fontFamily: FONT.ui, fontSize: 10, letterSpacing: 1.6,
          textTransform: 'uppercase', color: TOKENS.sage,
          fontWeight: 700, marginBottom: 14,
        }}>
          {lang === 'ta' ? 'கடந்த ஆண்டு பங்கேற்ற பள்ளிகள் — எடுத்துக்காட்டுகள்'
                         : 'Schools participating last year — selected examples'}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? 12 : 16,
        }}>
          {districtsShown.map((d, i) => (
            <div key={i} style={{
              border: `1px solid ${TOKENS.line}`,
              borderRadius: 3,
              padding: '12px 14px 14px',
              background: TOKENS.ivory,
            }}>
              <div style={{
                fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
                fontSize: 12, fontWeight: 600,
                color: TOKENS.teal, letterSpacing: 0.3,
                marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: 99,
                  background: TOKENS.teal,
                }} />
                {t(d.district, lang)}
                <span style={{
                  marginLeft: 'auto', color: TOKENS.muted,
                  fontWeight: 500, fontSize: 11,
                }}>{d.schools.length}</span>
              </div>
              <ul style={{
                listStyle: 'none', padding: 0, margin: 0,
                display: 'flex', flexDirection: 'column', gap: 5,
              }}>
                {d.schools.map((s, j) => (
                  <li key={j} style={{
                    fontFamily: FONT.ui, fontSize: 12.5,
                    color: TOKENS.ink, lineHeight: 1.4,
                    paddingLeft: 10, position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute', left: 0, top: 7,
                      width: 3, height: 3, borderRadius: 99,
                      background: TOKENS.sage, opacity: 0.6,
                    }} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {remaining > 0 && !expanded && (
          <button onClick={() => setExpanded(true)}
            style={{
              marginTop: 14, padding: '10px 14px',
              background: 'transparent', border: `1px dashed ${TOKENS.line}`,
              borderRadius: 4, color: TOKENS.teal,
              fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              width: '100%',
            }}>
            {lang === 'ta'
              ? `+ மேலும் ${remaining} மாவட்டங்களைக் காட்டு`
              : `+ Show ${remaining} more district${remaining > 1 ? 's' : ''}`}
          </button>
        )}
        {expanded && data.examples.length > 3 && (
          <button onClick={() => setExpanded(false)}
            style={{
              marginTop: 14, padding: '8px 14px',
              background: 'transparent', border: 'none',
              color: TOKENS.muted,
              fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
              fontSize: 12, cursor: 'pointer',
            }}>
            {lang === 'ta' ? '— சுருக்கு' : '\u2014 Show less'}
          </button>
        )}
      </div>

      {/* source footer */}
      <footer style={{
        padding: isMobile ? '12px 18px 16px' : '14px 26px 18px',
        borderTop: `1px solid ${TOKENS.lineSoft}`,
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 8,
        fontFamily: FONT.ui, fontSize: 11, color: TOKENS.muted,
      }}>
        <span>
          <span style={{ fontWeight: 600, color: TOKENS.ink, opacity: 0.7 }}>
            {lang === 'ta' ? 'மூலம்' : 'Source'}:
          </span>{' '}
          {t(data.sourceLabel, lang)}
        </span>
        <span style={{ opacity: 0.8 }}>
          {lang === 'ta' ? 'சரிபார்க்கப்பட்டது' : 'Verified'} · {fmtDate(window.LAST_VERIFIED, lang)}
        </span>
      </footer>
    </section>
  );
}
window.TNParticipationBlock = TNParticipationBlock;

// ------- Phase-by-phase timeline component -------
// Horizontal calendar strip showing the full journey from registration through
// international. Academic year anchored Jun (month 0 on the grid) -> May.

function CompetitionTimeline({ compId, lang, isMobile }) {
  const phases = (window.PHASES || {})[compId];
  if (!phases || phases.length === 0) return null;

  // Academic year runs Jun -> May. Grid month 0 = June.
  // Map real month index (0=Jan) to grid index (0=Jun).
  const toGrid = (m) => (m + 12 - 5) % 12;   // Jun=0, Jul=1, ..., May=11

  const taM = ['ஜூன்','ஜூலை','ஆக','செப்','அக்','நவ','டிச','ஜன','பிப்','மார்','ஏப்','மே'];
  const enM = ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'];
  const monthLabels = lang === 'ta' ? taM : enM;

  const levelStyle = {
    registration:  { color: TOKENS.sage,   label: { ta: 'பதிவு',        en: 'Registration' } },
    district:      { color: TOKENS.teal,   label: { ta: 'மாவட்டம்',     en: 'District' } },
    state:         { color: TOKENS.teal,   label: { ta: 'மாநிலம்',      en: 'State' } },
    national:      { color: TOKENS.bronze, label: { ta: 'தேசியம்',      en: 'National' } },
    international: { color: '#7B4F34',     label: { ta: 'சர்வதேசம்',   en: 'International' } },
  };

  // "Now" marker — pinned to April 2026 demo date.
  // April => real month 3 => grid index toGrid(3) = 10.
  const nowGridIdx = toGrid(new Date('2026-04-23').getMonth());

  return (
    <section style={{
      background: '#FFFFFF',
      border: `1px solid ${TOKENS.line}`,
      borderRadius: 4,
      padding: isMobile ? '20px 16px 18px' : '26px 28px 22px',
      marginBottom: 20,
    }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        gap: 12, flexWrap: 'wrap', marginBottom: 18,
      }}>
        <div>
          <div style={{
            fontFamily: FONT.ui, fontSize: 10, letterSpacing: 1.8,
            textTransform: 'uppercase', color: TOKENS.bronze,
            fontWeight: 700, marginBottom: 4,
          }}>
            {lang === 'ta' ? 'கட்ட-வாரியான காலவரிசை' : 'Phase-by-phase timeline'}
          </div>
          <div style={{
            fontFamily: lang === 'ta' ? FONT.ta : FONT.display,
            fontSize: isMobile ? 17 : 20, fontWeight: 400,
            color: TOKENS.ink, lineHeight: 1.25,
          }}>
            {lang === 'ta' ? '2025–26 கல்வியாண்டு · ஜூன் → மே'
                           : 'Academic year 2025\u201326 \u00b7 Jun \u2192 May'}
          </div>
        </div>
      </div>

      {/* month header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: 2, marginBottom: 6,
        fontFamily: FONT.ui,
      }}>
        {monthLabels.map((m, i) => (
          <div key={i} style={{
            fontSize: 10, letterSpacing: 0.5, textAlign: 'center',
            color: i === nowGridIdx ? TOKENS.bronze : TOKENS.muted,
            fontWeight: i === nowGridIdx ? 700 : 500,
            textTransform: 'uppercase',
            padding: '2px 0',
            borderTop: i === nowGridIdx ? `2px solid ${TOKENS.bronze}` : `1px solid ${TOKENS.lineSoft}`,
          }}>{m}</div>
        ))}
      </div>

      {/* phase rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
        {phases.map((p, i) => {
          const gridCells = p.months.map(toGrid).sort((a, b) => a - b);
          const startCol = gridCells[0] + 1;
          const endCol = gridCells[gridCells.length - 1] + 2;
          const style = levelStyle[p.level] || levelStyle.district;
          return (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 2, position: 'relative', minHeight: 44,
            }}>
              {/* background grid */}
              {[...Array(12)].map((_, c) => (
                <div key={c} style={{
                  background: c === nowGridIdx ? 'rgba(181,96,58,0.06)' : TOKENS.ivory,
                  borderRadius: 2, height: 44,
                }} />
              ))}
              {/* phase bar */}
              <div style={{
                position: 'absolute',
                gridColumn: `${startCol} / ${endCol}`,
                left: `${((startCol - 1) / 12) * 100}%`,
                width: `${((endCol - startCol) / 12) * 100}%`,
                top: 0, height: 44,
                background: style.color,
                borderRadius: 3,
                padding: isMobile ? '6px 8px' : '6px 10px',
                color: '#fff', fontFamily: FONT.ui,
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <div style={{
                  fontSize: isMobile ? 10 : 11.5, fontWeight: 600, lineHeight: 1.15,
                  fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
                  whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden',
                }}>{t(p.title, lang)}</div>
                {!isMobile && p.note && (
                  <div style={{
                    fontSize: 10, opacity: 0.85, lineHeight: 1.2,
                    fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
                    whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden',
                    marginTop: 1,
                  }}>{t(p.note, lang)}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* legend */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: isMobile ? 10 : 18,
        paddingTop: 14, borderTop: `1px solid ${TOKENS.lineSoft}`,
        fontFamily: FONT.ui, fontSize: 11, color: TOKENS.muted,
      }}>
        {Object.entries(levelStyle)
          .filter(([k]) => phases.some(p => p.level === k))
          .map(([k, v]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                width: 10, height: 10, borderRadius: 2, background: v.color,
              }} />
              <span style={{
                fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
              }}>{t(v.label, lang)}</span>
            </div>
          ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, opacity: 0.85 }}>
          <span style={{
            width: 10, height: 2, background: TOKENS.bronze, display: 'inline-block',
          }} />
          <span style={{
            fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
          }}>{lang === 'ta' ? 'இன்று' : 'Today'}</span>
        </div>
      </div>
    </section>
  );
}
window.CompetitionTimeline = CompetitionTimeline;

function Footer({ lang, setRoute, device, route }) {
  const isMobile = device === 'mobile';
  const items = [
    { id: 'home',         label: { ta: 'முகப்பு',            en: 'Home' } },
    { id: 'competitions', label: { ta: '12 போட்டிகள்',      en: 'All 12 competitions' } },
    { id: 'dates',        label: { ta: 'வருடாந்திர காலண்டர்', en: 'Annual calendar' } },
    { id: 'about',        label: { ta: 'இது ஏன் இருக்கிறது', en: 'Why this exists' } },
  ];
  const handleClick = (id) => {
    if (route === id) {
      // Already on this page — just scroll to top instead of re-routing.
      const scroller = document.querySelector('[data-app-scroll]');
      if (scroller) scroller.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setRoute(id);
    }
  };
  return (
    <footer style={{
      background: TOKENS.ink, color: TOKENS.ivory,
      padding: isMobile ? '28px 22px 32px' : '40px 64px 48px',
      fontFamily: FONT.ui,
    }}>
      <div style={{
        display: 'flex', flexWrap: 'wrap',
        gap: isMobile ? 14 : 28,
        marginBottom: 18,
      }}>
        {items.map(it => (
          <button key={it.id}
            onClick={(e) => { e.stopPropagation(); handleClick(it.id); }}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              background: 'transparent', border: 'none',
              color: TOKENS.ivory, opacity: 0.72, padding: 0,
              fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
              fontSize: 13, cursor: 'pointer',
            }}>{t(it.label, lang)}</button>
        ))}
      </div>
      <div style={{
        fontSize: 11, opacity: 0.45, lineHeight: 1.6, maxWidth: 620,
      }}>
        {lang === 'ta'
          ? 'ariviyalpoatti.in · இது ஒரு அரசு தளம் அல்ல. சரிபார்ப்புக்கு எப்போதும் அதிகாரப்பூர்வ மூலத்தைப் பார்க்கவும்.'
          : 'ariviyalpoatti.in \u00b7 Not a government site. Always verify with the official source.'}
      </div>
    </footer>
  );
}
window.Footer = Footer;
