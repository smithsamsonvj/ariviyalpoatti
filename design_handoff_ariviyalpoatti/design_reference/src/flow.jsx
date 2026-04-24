// Two role-driven flows:
//   GuidedFlow (variant A) — one step at a time, progress pills, prev/next.
//   RoleDashboard (variant B) — all steps stacked on one page, anchor sidebar.
//
// Both share the same step data (flowSteps()), so the user experience is
// equivalent but the pacing is different:
//   A feels like a conversation you walk through.
//   B feels like a cheat sheet you scan.

function flowSteps(role, lang) {
  const COMPETITIONS = window.COMPETITIONS;
  const byId = id => COMPETITIONS.find(c => c.id === id);

  // Each step: { kicker, title, body, actions[], link? (competition id or route) }
  // actions: [{ label, kind: 'primary'|'secondary', to: 'route' or 'comp:<id>' or 'url:<url>' }]
  if (role === 'teacher') {
    return [
      {
        kicker: { ta: 'படி 1', en: 'Step 1' },
        title:  { ta: 'ஒரே ஒரு போட்டியுடன் தொடங்குங்கள்',
                  en: 'Start with one competition.' },
        body:   { ta: 'பத்து போட்டிகளையும் ஒரே நேரத்தில் தொடங்க வேண்டாம். INSPIRE–MANAK — முற்றிலும் இலவசம், பள்ளி உள்கட்டமைப்பு எதுவும் தேவையில்லை, 10 லட்சம் பிள்ளைகள் ஆண்டுதோறும் பங்கேற்கின்றனர். இதிலிருந்து தொடங்குங்கள்.',
                  en: 'Don\u2019t try all twelve at once. INSPIRE\u2013MANAK is free, needs no school infrastructure, and already reaches 10 lakh students a year. Start here.' },
        competitionHighlight: byId('inspire-manak'),
        actions: [
          { label: { ta: 'INSPIRE–MANAK விவரம்', en: 'See INSPIRE\u2013MANAK' }, kind: 'primary', to: 'comp:inspire-manak' },
        ],
      },
      {
        kicker: { ta: 'படி 2', en: 'Step 2' },
        title:  { ta: 'உங்கள் பள்ளியின் INSPIRE நோடல் ஆசிரியர் யார்?',
                  en: 'Find out who your school\u2019s INSPIRE nodal teacher is.' },
        body:   { ta: 'ஒவ்வொரு பள்ளியிலும் ஒருவர் INSPIRE போர்ட்டலில் பதிவு செய்ய அதிகாரம் பெற்றுள்ளார். முதல்வரிடம் கேளுங்கள், அல்லது SCERT-ஐ தொடர்பு கொள்ளுங்கள். இதை இந்த வாரம் செய்யுங்கள்.',
                  en: 'One teacher at every school is authorised to submit to the INSPIRE portal. Ask your principal, or contact SCERT. Do this this week \u2014 nothing else happens until this is sorted.' },
        actions: [
          { label: { ta: 'SCERT தொடர்பு', en: 'Contact SCERT' }, kind: 'secondary', external: true },
        ],
      },
      {
        kicker: { ta: 'படி 3', en: 'Step 3' },
        title:  { ta: 'உங்கள் வகுப்பிலிருந்து 5 மாணவர்களை தேர்ந்தெடுங்கள்',
                  en: 'Nominate 5 students from your class.' },
        body:   { ta: 'INSPIRE-ன் இலக்கு — ஆண்டுக்கு 10 லட்சம் யோசனைகள். ஆர்வமுள்ள பிள்ளைகளை மட்டும் தேர்ந்தெடுக்காதீர்கள். முதலில் தயங்கியவர்களை நாமினேட் செய்யுங்கள். ₹10,000 நேரடியாக அவர்களது வங்கிக் கணக்கிற்கு வரும்.',
                  en: 'INSPIRE\u2019s goal is 10 lakh ideas a year. Don\u2019t just pick the obvious students \u2014 nominate the quieter ones who hesitated first. \u20b910,000 lands directly in their bank account.' },
        facts: [
          { ta: '₹10,000 / மாணவர்', en: '\u20b910,000 per student' },
          { ta: 'DBT நேரடி பரிமாற்றம்', en: 'Direct bank transfer' },
          { ta: 'கட்டணம் இல்லை', en: 'Zero fee' },
        ],
      },
      {
        kicker: { ta: 'படி 4', en: 'Step 4' },
        title:  { ta: 'காலண்டர் உங்கள் தோழர்',
                  en: 'The calendar is your friend.' },
        body:   { ta: 'நவம்பர்–ஜனவரி மிகவும் நெரிசலான காலம். INSPIRE, NSE, SOF, IRIS எல்லாம் ஒரே சமயத்தில். ஒரு வாரம் முன்னதாக உங்கள் மாணவர்கள் தயாராக இருக்க வேண்டும். முழு காலண்டரையும் பார்த்துக் கொள்ளுங்கள்.',
                  en: 'November to January is the collision zone \u2014 INSPIRE, NSE, SOF, IRIS all converge. Your students should be ready a week early. See the full calendar and pencil dates into your class diary.' },
        actions: [
          { label: { ta: 'வருடாந்திர காலண்டர் பார்', en: 'See annual calendar' }, kind: 'primary', to: 'dates' },
        ],
      },
      {
        kicker: { ta: 'படி 5', en: 'Step 5' },
        title:  { ta: 'பகிர்ந்து கொள்ளுங்கள். ஒரு ஆசிரியர் மட்டும் போதாது.',
                  en: 'Share this. One teacher isn\u2019t enough.' },
        body:   { ta: 'தமிழ்நாட்டில் 57,935 பள்ளிகள். உங்கள் அண்டை பள்ளி ஆசிரியர்களுக்கு WhatsApp-ல் இந்த பக்கத்தை அனுப்புங்கள். உங்கள் மாணவர்கள் மட்டும் பங்கேற்று தனியே போட்டியிட வேண்டாம்.',
                  en: 'Tamil Nadu has 57,935 schools. Share this page on WhatsApp with teachers in neighbouring schools. Your students shouldn\u2019t have to compete alone.' },
        actions: [
          { label: { ta: 'WhatsApp-ல் பகிர்', en: 'Share on WhatsApp' }, kind: 'primary', external: 'whatsapp' },
          { label: { ta: '12 போட்டிகளையும் பார்', en: 'Browse all 12' }, kind: 'secondary', to: 'competitions' },
        ],
      },
    ];
  }

  if (role === 'principal') {
    return [
      {
        kicker: { ta: 'படி 1', en: 'Step 1' },
        title:  { ta: 'கடந்த ஆண்டு உங்கள் பள்ளியின் பதிவை மதிப்பிடுங்கள்',
                  en: 'Audit last year\u2019s record \u2014 honestly.' },
        body:   { ta: 'INSPIRE, RBVP, NCSC — இவற்றில் எவையேனும் உங்கள் பள்ளி பங்கேற்றதா? எத்தனை மாணவர்கள்? யார் ஒருங்கிணைத்தனர்? பதில் "யாரும் இல்லை" என்றால், இது தான் தொடக்கப் புள்ளி.',
                  en: 'Did your school enter INSPIRE, RBVP, or NCSC? How many students? Who coordinated? If the answer is "nobody" \u2014 that\u2019s your baseline.' },
        facts: [
          { ta: 'IRIS 2024: தமிழ்நாடு 101-ல் 3', en: 'IRIS 2024: 3 of 101 from TN' },
          { ta: 'அனைத்தும் தனியார் பள்ளிகள்', en: 'All private schools' },
          { ta: 'அரசு பள்ளி: 0', en: 'Government schools: 0' },
        ],
      },
      {
        kicker: { ta: 'படி 2', en: 'Step 2' },
        title:  { ta: 'ஒரு ஒருங்கிணைப்பாளரை நியமியுங்கள். ஒருவர் மட்டும்.',
                  en: 'Appoint one Science Competitions Coordinator. One person.' },
        body:   { ta: 'ஒரு பொறுப்பு, ஒருவர். பதினைந்து ஆசிரியர்களிடையே பகிர்ந்தால், ஒன்றும் நடக்காது. INSPIRE நோடல் ஆசிரியர் என்பது அரசு கட்டாயமாக்கிய பதவி — அதை சரியான நபருக்கு கொடுங்கள்.',
                  en: 'One mandate, one person. Split it across fifteen teachers and nothing moves. The INSPIRE nodal teacher role is already government-mandated \u2014 give it to the right person.' },
      },
      {
        kicker: { ta: 'படி 3', en: 'Step 3' },
        title:  { ta: 'ATL ஆய்வகம் இருக்கிறதா? அதை பயன்படுத்துங்கள்.',
                  en: 'Got an Atal Tinkering Lab? Use it.' },
        body:   { ta: 'ATL Marathon 2024-ல் 54,000+ பள்ளிகள் பங்கேற்றன. உங்களுடைய பள்ளியில் ATL இருந்தும் பங்கேற்கவில்லை என்றால், அது வெறும் சாதனங்கள் வைக்கும் அறை. குழுவை பதிவு செய்யுங்கள்.',
                  en: '54,000+ schools joined the ATL Marathon in 2024. If you have an ATL but aren\u2019t entering, it\u2019s just a room with kit. Register a team.' },
        competitionHighlight: byId('atl-marathon'),
        actions: [
          { label: { ta: 'ATL Marathon விவரம்', en: 'See ATL Marathon' }, kind: 'primary', to: 'comp:atl-marathon' },
        ],
      },
      {
        kicker: { ta: 'படி 4', en: 'Step 4' },
        title:  { ta: 'நவம்பர்–ஜனவரி பள்ளி நாட்காட்டியில் முன்கூட்டியே குறிக்கவும்',
                  en: 'Pencil November to January into the school calendar \u2014 early.' },
        body:   { ta: 'மாவட்ட கண்காட்சி, NSE, SOF நிலை 1, CBSE பிராந்திய, IRIS திரையிடல், WRO, NCSC — அனைத்தும் இந்த மூன்று மாதங்களில். ஆசிரியர்கள் தனியாக மீட்கப்படுவதற்கு முன் இதை பள்ளி கேலெண்டரில் சேர்க்கவும்.',
                  en: 'District fair, NSE, SOF Level 1, CBSE regionals, IRIS screening, WRO, NCSC \u2014 all within these three months. Put it in the school calendar before your teachers have to scramble.' },
        actions: [
          { label: { ta: 'காலண்டரை பார்', en: 'See the calendar' }, kind: 'primary', to: 'dates' },
        ],
      },
      {
        kicker: { ta: 'படி 5', en: 'Step 5' },
        title:  { ta: 'வெற்றி பெற்றவர்களை பள்ளி முன்வெளியில் கௌரவியுங்கள்',
                  en: 'Celebrate your winners publicly. It compounds.' },
        body:   { ta: 'ஒரு மாணவரின் வெற்றி — பள்ளி முன்வெளியில் கௌரவிக்கப்பட்டால் — அடுத்த ஆண்டு பத்து மாணவர்களை தயாராக ஆக்கும். இது மலிவான, மிகச் சக்திவாய்ந்த விஷயம்.',
                  en: 'One student\u2019s win, publicly celebrated, creates ten who try next year. It\u2019s the cheapest, most powerful thing you can do.' },
      },
    ];
  }

  // parent
  return [
    {
      kicker: { ta: 'படி 1', en: 'Step 1' },
      title:  { ta: 'உங்கள் குழந்தையின் வகுப்பு என்ன?',
                en: 'What class is your child in?' },
      body:   { ta: '1ம் வகுப்பிலிருந்தே ஒலிம்பியாட்கள் உள்ளன. 6ம் வகுப்பு முதல் INSPIRE–MANAK. ஒவ்வொரு வகுப்பிற்கும் பொருத்தமான போட்டிகள் வேறுபடும்.',
                en: 'There are Olympiads from Class 1 onwards. INSPIRE\u2013MANAK opens at Class 6. The right competition depends on the class.' },
      classPicker: true,
    },
    {
      kicker: { ta: 'படி 2', en: 'Step 2' },
      title:  { ta: 'செலவு இருக்கிறதா? அரசு போட்டிகள் முற்றிலும் இலவசம்.',
                en: 'Worried about cost? The government ones are completely free.' },
      body:   { ta: 'INSPIRE, NCSC, RBVP, ATL — ரூபாய் கூட கட்டணம் இல்லை. SOF போன்ற தனியார் ரூ.125 வசூலிக்கின்றன. WRO, FLL — ரூ.6,000–18,000. பெரிய மூன்று அரசு போட்டிகளிலிருந்து தொடங்குங்கள்.',
                en: 'INSPIRE, NCSC, RBVP, ATL \u2014 zero fees. Private ones like SOF charge ~\u20b9125. WRO and FLL are \u20b96,000\u201318,000. Start with the big three government ones.' },
      facts: [
        { ta: '4 அரசு: இலவசம்', en: '4 govt: Free' },
        { ta: 'SOF: ~₹125', en: 'SOF: ~\u20b9125' },
        { ta: 'WRO/FLL: ₹6k+', en: 'WRO/FLL: \u20b96k+' },
      ],
    },
    {
      kicker: { ta: 'படி 3', en: 'Step 3' },
      title:  { ta: 'பள்ளி வழியாக மட்டும் பதிவு',
                en: 'Most registrations happen only through the school.' },
      body:   { ta: 'நீங்கள் நேரடியாக INSPIRE-ல் பதிவு செய்ய முடியாது. பள்ளி ஒருங்கிணைப்பாளர் பதிவு செய்ய வேண்டும். உங்கள் பள்ளி முதல்வருடன் பேச ஒரு சிறிய குறிப்பை எடுத்துச் செல்லுங்கள்.',
                en: 'You can\u2019t register directly \u2014 the school coordinator does it. Bring a short note to your principal. We\u2019ve drafted one below.' },
      letterDraft: true,
    },
    {
      kicker: { ta: 'படி 4', en: 'Step 4' },
      title:  { ta: 'முந்தைய ஆண்டு கேள்வித்தாள்கள் — இலவசமாக',
                en: 'Past-year question papers \u2014 free online.' },
      body:   { ta: 'HBCSE (ஒலிம்பியாட்), NCERT (RBVP) — எல்லாமே பழைய கேள்வித்தாள்கள் வழங்குகின்றன. கோச்சிங் வகுப்பு எடுப்பதற்கு முன் உங்கள் குழந்தைக்கு இவற்றை கொடுத்துப் பாருங்கள்.',
                en: 'HBCSE (Olympiad) and NCERT (RBVP) publish past papers for free. Let your child try these before you pay for any coaching.' },
      actions: [
        { label: { ta: 'ஒலிம்பியாட் பக்கம்', en: 'See Olympiad page' }, kind: 'secondary', to: 'comp:nse-ino' },
      ],
    },
    {
      kicker: { ta: 'படி 5', en: 'Step 5' },
      title:  { ta: 'ஒரு வெற்றியும், ஒரு தோல்வியும் — இரண்டுமே மதிப்புள்ளவை',
                en: 'A win and a loss both matter.' },
      body:   { ta: 'போட்டி முடிவு முக்கியமில்லை — முயற்சி முக்கியம். உங்கள் குழந்தை முதல் முறை தோற்றால், அதை கொண்டாடுங்கள். அடுத்த முறை சிறப்பாக வரும்.',
                en: 'The result isn\u2019t what matters \u2014 the attempt is. If your child loses the first time, celebrate the attempt. The next one will go further.' },
      actions: [
        { label: { ta: '12 போட்டிகளையும் பார்', en: 'Browse all 12' }, kind: 'primary', to: 'competitions' },
      ],
    },
  ];
}

// ------------------------------------------------------------------
// Variant A — Guided, step-by-step flow
// ------------------------------------------------------------------

function GuidedFlow({ lang, setRoute, device, role, stepIdx }) {
  const { COPY, TOKENS, FONT, t, Motif } = window;
  const isMobile = device === 'mobile';
  const steps = flowSteps(role, lang);
  const i = Math.max(0, Math.min(stepIdx, steps.length - 1));
  const step = steps[i];
  const audience = COPY.audiences[role];
  const roleColor = role === 'teacher' ? TOKENS.teal
                 : role === 'principal' ? TOKENS.bronze
                 : TOKENS.sage;

  const goTo = idx => setRoute(`flow:${role}:${idx}`);

  return (
    <div style={{ background: TOKENS.ivory, color: TOKENS.ink, minHeight: '100%' }}>
      {/* role banner + progress */}
      <section style={{
        background: roleColor, color: TOKENS.ivory,
        padding: isMobile ? '22px 22px 18px' : '32px 64px 24px',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16, marginBottom: 18, flexWrap: 'wrap',
        }}>
          <div style={{
            fontFamily: FONT.ui, fontSize: 10, letterSpacing: 2,
            textTransform: 'uppercase', opacity: 0.78, fontWeight: 600,
          }}>
            {lang === 'ta' ? 'உங்கள் பாதை ·' : 'Your path \u00b7'} {t(audience.label, lang)}
          </div>
          <button
            onClick={() => setRoute('home')}
            style={{
              background: 'transparent', color: TOKENS.ivory,
              border: '1px solid rgba(245,240,232,0.4)', borderRadius: 99,
              padding: '4px 12px', fontSize: 11,
              fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
              cursor: 'pointer',
            }}>
            {lang === 'ta' ? 'பாத்திரம் மாற்று' : 'Change role'}
          </button>
        </div>

        {/* progress pills */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Step ${idx + 1}`}
              style={{
                flex: 1,
                height: 4, borderRadius: 99,
                background: idx <= i ? TOKENS.ivory : 'rgba(245,240,232,0.28)',
                border: 'none', padding: 0, cursor: 'pointer',
                transition: 'background .15s',
              }} />
          ))}
        </div>
        <div style={{
          fontFamily: FONT.ui, fontSize: 11, opacity: 0.7,
          marginTop: 10, letterSpacing: 0.4,
        }}>
          {i + 1} / {steps.length}
        </div>
      </section>

      {/* step body */}
      <section style={{
        padding: isMobile ? '36px 22px 28px' : '64px 64px 48px',
        maxWidth: 760, margin: '0 auto',
      }}>
        <div style={{
          fontFamily: FONT.ui, fontSize: 11, letterSpacing: 2,
          textTransform: 'uppercase', color: roleColor, fontWeight: 600,
          marginBottom: 14,
        }}>{t(step.kicker, lang)}</div>
        <h1 style={{
          fontFamily: lang === 'ta' ? FONT.ta : FONT.display,
          fontSize: isMobile ? (lang === 'ta' ? 26 : 30) : (lang === 'ta' ? 40 : 46),
          color: TOKENS.ink, margin: 0, fontWeight: 400, lineHeight: 1.15,
          textWrap: 'pretty',
        }}>{t(step.title, lang)}</h1>
        <p style={{
          fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
          fontSize: isMobile ? 16 : 18, lineHeight: 1.6,
          color: TOKENS.muted, marginTop: 20, marginBottom: 0,
          maxWidth: 620, textWrap: 'pretty',
        }}>{t(step.body, lang)}</p>

        <StepExtras step={step} lang={lang} setRoute={setRoute} isMobile={isMobile} roleColor={roleColor} />

        {/* actions */}
        {step.actions && step.actions.length > 0 && (
          <div style={{
            display: 'flex', gap: 10, flexWrap: 'wrap',
            marginTop: isMobile ? 28 : 36,
          }}>
            {step.actions.map((a, idx) => (
              <ActionButton key={idx} action={a} lang={lang} setRoute={setRoute} isMobile={isMobile} color={roleColor} />
            ))}
          </div>
        )}
      </section>

      {/* nav footer */}
      <section style={{
        padding: isMobile ? '16px 22px 32px' : '24px 64px 48px',
        borderTop: `1px solid ${TOKENS.line}`,
        maxWidth: 760, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16,
      }}>
        <button
          onClick={() => i === 0 ? setRoute('home') : goTo(i - 1)}
          style={{
            background: 'transparent', border: 'none',
            color: TOKENS.muted, fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
            fontSize: 14, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
          <span>←</span>
          <span>{i === 0 ? (lang === 'ta' ? 'முகப்பு' : 'Home') : (lang === 'ta' ? 'முந்தைய' : 'Previous')}</span>
        </button>

        {i < steps.length - 1 ? (
          <button
            onClick={() => goTo(i + 1)}
            style={{
              background: roleColor, color: TOKENS.ivory,
              border: 'none', borderRadius: 4,
              padding: isMobile ? '12px 20px' : '14px 28px',
              fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
              fontSize: isMobile ? 14 : 15, fontWeight: 500,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
            <span>{lang === 'ta' ? 'அடுத்து' : 'Next'}</span>
            <span>→</span>
          </button>
        ) : (
          <button
            onClick={() => setRoute('home')}
            style={{
              background: TOKENS.ink, color: TOKENS.ivory,
              border: 'none', borderRadius: 4,
              padding: isMobile ? '12px 20px' : '14px 28px',
              fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
              fontSize: isMobile ? 14 : 15, fontWeight: 500,
              cursor: 'pointer',
            }}>
            {lang === 'ta' ? 'முடிந்தது ✓' : 'Done \u2713'}
          </button>
        )}
      </section>
    </div>
  );
}

// ------------------------------------------------------------------
// Variant B — Single-page Role Dashboard
// ------------------------------------------------------------------

function RoleDashboard({ lang, setRoute, device, role }) {
  const { COPY, TOKENS, FONT, t, Motif } = window;
  const isMobile = device === 'mobile';
  const steps = flowSteps(role, lang);
  const audience = COPY.audiences[role];
  const roleColor = role === 'teacher' ? TOKENS.teal
                 : role === 'principal' ? TOKENS.bronze
                 : TOKENS.sage;

  const scrollTo = (idx) => {
    const el = document.getElementById(`step-${idx}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  // Deliberately NOT using scrollIntoView — it can move the parent frame.
  // Use container-relative scrolling instead.
  const onAnchor = (idx) => {
    const el = document.getElementById(`step-${role}-${idx}`);
    if (!el) return;
    let p = el.parentElement;
    while (p && getComputedStyle(p).overflowY !== 'auto' && getComputedStyle(p).overflowY !== 'scroll') p = p.parentElement;
    if (!p) return;
    p.scrollTo({ top: el.offsetTop - p.offsetTop - 20, behavior: 'smooth' });
  };

  return (
    <div style={{ background: TOKENS.ivory, color: TOKENS.ink, minHeight: '100%' }}>
      {/* role banner */}
      <section style={{
        background: roleColor, color: TOKENS.ivory,
        padding: isMobile ? '26px 22px 28px' : '40px 64px 44px',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16, marginBottom: 14, flexWrap: 'wrap',
        }}>
          <div style={{
            fontFamily: FONT.ui, fontSize: 10, letterSpacing: 2,
            textTransform: 'uppercase', opacity: 0.78, fontWeight: 600,
          }}>
            {lang === 'ta' ? 'உங்கள் பலகை ·' : 'Your dashboard \u00b7'} {t(audience.label, lang)}
          </div>
          <button
            onClick={() => setRoute('home')}
            style={{
              background: 'transparent', color: TOKENS.ivory,
              border: '1px solid rgba(245,240,232,0.4)', borderRadius: 99,
              padding: '4px 12px', fontSize: 11,
              fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
              cursor: 'pointer',
            }}>
            {lang === 'ta' ? 'பாத்திரம் மாற்று' : 'Change role'}
          </button>
        </div>
        <h1 style={{
          fontFamily: lang === 'ta' ? FONT.ta : FONT.display,
          fontSize: isMobile ? (lang === 'ta' ? 26 : 30) : (lang === 'ta' ? 40 : 48),
          margin: 0, fontWeight: 400, lineHeight: 1.12, textWrap: 'pretty',
          maxWidth: 720,
        }}>{t(audience.line, lang)}</h1>
        <p style={{
          fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
          fontSize: isMobile ? 14 : 16, lineHeight: 1.55,
          opacity: 0.82, marginTop: 14, marginBottom: 0, maxWidth: 600,
        }}>{t(audience.detail, lang)}</p>
      </section>

      {/* two-col: anchor sidebar + stacked steps */}
      <section style={{
        padding: isMobile ? '28px 0 28px' : '48px 64px 64px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '220px 1fr',
        gap: isMobile ? 0 : 48,
        alignItems: 'start',
      }}>
        {!isMobile && (
          <aside style={{
            position: 'sticky', top: 24,
            fontFamily: FONT.ui,
          }}>
            <div style={{
              fontSize: 10, letterSpacing: 1.8, textTransform: 'uppercase',
              color: TOKENS.muted, fontWeight: 600, marginBottom: 14,
            }}>
              {lang === 'ta' ? 'உங்கள் படிகள்' : 'Your steps'}
            </div>
            {steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => onAnchor(idx)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  padding: '10px 14px 10px 0',
                  borderLeft: `2px solid ${TOKENS.line}`,
                  paddingLeft: 14,
                  color: TOKENS.ink,
                  fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
                  fontSize: 13, lineHeight: 1.4,
                  transition: 'border-color .15s, color .15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderLeftColor = roleColor; e.currentTarget.style.color = roleColor; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderLeftColor = TOKENS.line; e.currentTarget.style.color = TOKENS.ink; }}
              >
                <div style={{
                  fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase',
                  color: TOKENS.muted, fontWeight: 600, marginBottom: 3,
                }}>{t(s.kicker, lang)}</div>
                <div style={{
                  fontSize: 13, fontWeight: 500,
                }}>{truncate(t(s.title, lang), 52)}</div>
              </button>
            ))}
          </aside>
        )}

        <div style={{
          padding: isMobile ? '0 22px' : 0,
          maxWidth: 720,
        }}>
          {steps.map((step, idx) => (
            <article
              key={idx}
              id={`step-${role}-${idx}`}
              style={{
                paddingTop: idx === 0 ? 0 : (isMobile ? 36 : 52),
                paddingBottom: isMobile ? 28 : 40,
                borderBottom: idx === steps.length - 1 ? 'none' : `1px solid ${TOKENS.line}`,
              }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 99,
                  background: roleColor, color: TOKENS.ivory,
                  fontFamily: FONT.ui, fontSize: 12, fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>{idx + 1}</div>
                <div style={{
                  fontFamily: FONT.ui, fontSize: 10, letterSpacing: 2,
                  textTransform: 'uppercase', color: roleColor, fontWeight: 600,
                }}>{t(step.kicker, lang)}</div>
              </div>
              <h2 style={{
                fontFamily: lang === 'ta' ? FONT.ta : FONT.display,
                fontSize: isMobile ? (lang === 'ta' ? 22 : 26) : (lang === 'ta' ? 30 : 34),
                color: TOKENS.ink, margin: 0, fontWeight: 400,
                lineHeight: 1.15, textWrap: 'pretty',
              }}>{t(step.title, lang)}</h2>
              <p style={{
                fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
                fontSize: isMobile ? 15 : 16, lineHeight: 1.6,
                color: TOKENS.muted, marginTop: 14, marginBottom: 0,
                maxWidth: 580,
              }}>{t(step.body, lang)}</p>
              <StepExtras step={step} lang={lang} setRoute={setRoute} isMobile={isMobile} roleColor={roleColor} compact />
              {step.actions && step.actions.length > 0 && (
                <div style={{
                  display: 'flex', gap: 10, flexWrap: 'wrap',
                  marginTop: 22,
                }}>
                  {step.actions.map((a, k) => (
                    <ActionButton key={k} action={a} lang={lang} setRoute={setRoute} isMobile={isMobile} color={roleColor} />
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

// ------------------------------------------------------------------
// shared bits
// ------------------------------------------------------------------

function StepExtras({ step, lang, setRoute, isMobile, roleColor, compact }) {
  const { TOKENS, FONT, t, StatusPill } = window;
  const pieces = [];

  if (step.competitionHighlight) {
    const c = step.competitionHighlight;
    pieces.push(
      <button
        key="comp"
        onClick={() => setRoute(`comp:${c.id}`)}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
          marginTop: 28, padding: isMobile ? '18px 18px' : '22px 22px',
          background: '#fff', border: `1px solid ${TOKENS.line}`,
          borderLeft: `3px solid ${roleColor}`,
          borderRadius: 4, cursor: 'pointer',
          textAlign: 'left', width: '100%',
          fontFamily: 'inherit', color: 'inherit',
          gap: 10,
        }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
        }}>
          <span style={{
            fontFamily: FONT.ui, fontSize: 10, letterSpacing: 1.6,
            textTransform: 'uppercase', color: roleColor, fontWeight: 600,
          }}>
            {lang === 'ta' ? 'பரிந்துரைக்கப்பட்டது' : 'Recommended'}
          </span>
          <StatusPill status={c.status} lang={lang} size="sm" />
        </div>
        <div style={{
          fontFamily: lang === 'ta' ? FONT.ta : FONT.display,
          fontSize: isMobile ? 20 : 24, color: TOKENS.ink, fontWeight: 400,
          lineHeight: 1.2,
        }}>{t(c.name, lang)}</div>
        <div style={{
          fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
          fontSize: 13, color: TOKENS.muted, lineHeight: 1.55,
        }}>{t(c.summary, lang)}</div>
        <div style={{
          display: 'flex', gap: 14, flexWrap: 'wrap',
          fontFamily: FONT.ui, fontSize: 11,
          color: TOKENS.muted, marginTop: 4,
        }}>
          <span>{t(c.eligibility, lang)}</span>
          <span>·</span>
          <span>{t(c.fee, lang)}</span>
        </div>
      </button>
    );
  }

  if (step.facts) {
    pieces.push(
      <div key="facts" style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, minmax(0,1fr))',
        gap: 10,
        marginTop: 28,
      }}>
        {step.facts.map((f, idx) => (
          <div key={idx} style={{
            padding: '14px 16px',
            background: '#fff', border: `1px solid ${TOKENS.line}`,
            borderRadius: 4,
            fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
            fontSize: 13, color: TOKENS.ink, lineHeight: 1.4,
            fontWeight: 500,
          }}>{t(f, lang)}</div>
        ))}
      </div>
    );
  }

  if (step.classPicker) {
    pieces.push(<ClassPicker key="cls" lang={lang} roleColor={roleColor} setRoute={setRoute} />);
  }

  if (step.letterDraft) {
    pieces.push(<LetterDraft key="ltr" lang={lang} roleColor={roleColor} />);
  }

  return pieces.length === 0 ? null : <>{pieces}</>;
}

function ActionButton({ action, lang, setRoute, isMobile, color }) {
  const { TOKENS, FONT, t } = window;
  const primary = action.kind === 'primary';
  const onClick = () => {
    if (action.external === 'whatsapp') {
      const text = lang === 'ta'
        ? 'தமிழ்நாட்டிற்கான அறிவியல் போட்டிகள் வழிகாட்டி — ariviyalpoatti.in'
        : 'A guide to school science competitions for Tamil Nadu \u2014 ariviyalpoatti.in';
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
      return;
    }
    if (action.external) { /* no-op for prototype */ return; }
    if (action.to) setRoute(action.to);
  };
  return (
    <button
      onClick={onClick}
      style={{
        background: primary ? color : 'transparent',
        color: primary ? TOKENS.ivory : color,
        border: primary ? 'none' : `1px solid ${color}`,
        borderRadius: 4,
        padding: isMobile ? '12px 18px' : '14px 22px',
        fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
        fontSize: isMobile ? 14 : 15, fontWeight: 500,
        cursor: 'pointer',
      }}>
      {t(action.label, lang)} {primary ? '→' : ''}
    </button>
  );
}

function ClassPicker({ lang, roleColor, setRoute }) {
  const { TOKENS, FONT } = window;
  const [pick, setPick] = React.useState(null);
  const ranges = [
    { id: '1-5',  labelTa: '1–5 வகுப்பு',   labelEn: 'Classes 1\u20135',  note: { ta: 'SOF ஒலிம்பியாட்கள், Green Olympiad இளையோர்.', en: 'SOF Olympiads, Junior Green Olympiad.' } },
    { id: '6-8',  labelTa: '6–8 வகுப்பு',   labelEn: 'Classes 6\u20138',  note: { ta: 'INSPIRE–MANAK, RBVP, NCSC, ATL Marathon — முக்கிய காலம்.', en: 'INSPIRE\u2013MANAK, RBVP, NCSC, ATL \u2014 the main window.' } },
    { id: '9-10', labelTa: '9–10 வகுப்பு',  labelEn: 'Classes 9\u201310', note: { ta: 'மேலே உள்ள அனைத்தும் + IRIS விண்ணப்பம், WRO.', en: 'All of the above + IRIS applications, WRO.' } },
    { id: '11-12',labelTa: '11–12 வகுப்பு', labelEn: 'Classes 11\u201312',note: { ta: 'NSE/INO ஒலிம்பியாட் (IPhO/IChO/IBO பாதை), IRIS, ICO.', en: 'NSE/INO Olympiad (IPhO/IChO/IBO pathway), IRIS, ICO.' } },
  ];
  return (
    <div style={{ marginTop: 28 }}>
      <div style={{
        display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12,
      }}>
        {ranges.map(r => (
          <button
            key={r.id}
            onClick={() => setPick(r)}
            style={{
              padding: '8px 14px', borderRadius: 99,
              border: `1px solid ${pick?.id === r.id ? roleColor : TOKENS.line}`,
              background: pick?.id === r.id ? roleColor : 'transparent',
              color: pick?.id === r.id ? TOKENS.ivory : TOKENS.ink,
              fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              transition: 'all .15s',
            }}>
            {lang === 'ta' ? r.labelTa : r.labelEn}
          </button>
        ))}
      </div>
      {pick && (
        <div style={{
          padding: '14px 16px',
          background: '#fff', border: `1px solid ${TOKENS.line}`,
          borderLeft: `3px solid ${roleColor}`,
          borderRadius: 4,
          fontFamily: lang === 'ta' ? FONT.ta : FONT.ui,
          fontSize: 14, color: TOKENS.ink, lineHeight: 1.55,
        }}>{lang === 'ta' ? pick.note.ta : pick.note.en}</div>
      )}
    </div>
  );
}

function LetterDraft({ lang, roleColor }) {
  const { TOKENS, FONT } = window;
  const [copied, setCopied] = React.useState(false);
  const text = lang === 'ta'
    ? `மதிப்பிற்குரிய முதல்வர் அவர்களுக்கு,\n\nஎன் மகன்/மகள் INSPIRE–MANAK போட்டியில் பங்கேற்க விரும்புகிறார். இது DST-NIF-ன் அரசு திட்டம், கட்டணம் இல்லை, தேர்வு செய்யப்பட்டால் ₹10,000 நேரடி பரிமாற்றம் கிடைக்கும்.\n\nஉங்கள் பள்ளி INSPIRE போர்ட்டலில் (inspireawards-dst.gov.in) பதிவு செய்யப்படுகிறதா, யார் நோடல் ஆசிரியர் என்று தெரிவிக்க முடியுமா?\n\nநன்றி.`
    : `Dear Principal,\n\nMy child would like to participate in INSPIRE\u2013MANAK. This is a DST-NIF government programme with no fees; selected students receive \u20b910,000 via direct bank transfer.\n\nCould you tell me whether our school is registered on the INSPIRE portal (inspireawards-dst.gov.in), and who the nodal teacher is?\n\nThank you.`;
  const copy = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{
        background: '#fff', border: `1px solid ${TOKENS.line}`,
        borderLeft: `3px solid ${roleColor}`,
        borderRadius: 4,
        padding: '18px 20px',
        fontFamily: lang === 'ta' ? FONT.ta : 'ui-monospace, SF Mono, Menlo, monospace',
        fontSize: 13, lineHeight: 1.65, color: TOKENS.ink,
        whiteSpace: 'pre-wrap',
        position: 'relative',
      }}>
        {text}
        <button
          onClick={copy}
          style={{
            position: 'absolute', top: 10, right: 10,
            padding: '4px 10px', borderRadius: 99,
            background: copied ? roleColor : 'transparent',
            color: copied ? TOKENS.ivory : roleColor,
            border: `1px solid ${roleColor}`,
            fontFamily: FONT.ui, fontSize: 11, cursor: 'pointer',
            fontWeight: 500,
          }}>
          {copied ? (lang === 'ta' ? 'நகலெடுக்கப்பட்டது' : 'Copied') : (lang === 'ta' ? 'நகலெடு' : 'Copy')}
        </button>
      </div>
    </div>
  );
}

function truncate(s, n) {
  if (!s) return '';
  return s.length <= n ? s : s.slice(0, n - 1).trim() + '…';
}

window.GuidedFlow = GuidedFlow;
window.RoleDashboard = RoleDashboard;
