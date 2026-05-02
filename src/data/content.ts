import type { Bilingual } from './types'

// Site-wide freshness derived from per-competition `last_verified` frontmatter.
// Returns the OLDEST verified date across the passed entries (worst-case signal),
// so a single stale competition can't be hidden behind a recent stamp on others.
// Pass the result of `await getCollection('competitions')` (or any subset).
export function oldestVerifiedDate(entries: Array<{ data: { last_verified: string } }>): string {
  if (!entries || entries.length === 0) return ''
  return entries.reduce(
    (oldest, e) => (e.data.last_verified < oldest ? e.data.last_verified : oldest),
    entries[0].data.last_verified,
  )
}

// Translation helper: reads {ta, en} bilingual objects
export function t(obj: Bilingual | string | undefined | null, lang: string): string {
  if (!obj) return ''
  if (typeof obj === 'string') return obj
  return obj[lang as keyof Bilingual] ?? obj.en ?? obj.ta ?? ''
}

// Count days between now and an ISO date (negative if past)
export function daysUntil(iso: string): number {
  const now = new Date()
  const d = new Date(iso)
  return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

// Format a date per language
export function fmtDate(iso: string, lang: string): string {
  const d = new Date(iso)
  const taMonths = [
    'ஜனவரி',
    'பிப்ரவரி',
    'மார்ச்',
    'ஏப்ரல்',
    'மே',
    'ஜூன்',
    'ஜூலை',
    'ஆகஸ்ட்',
    'செப்டம்பர்',
    'அக்டோபர்',
    'நவம்பர்',
    'டிசம்பர்',
  ]
  const enMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  if (lang === 'ta') return `${d.getDate()} ${taMonths[d.getMonth()]} ${d.getFullYear()}`
  return `${enMonths[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

// Academic year month labels (Jun → May)
export const ACADEMIC_MONTHS = {
  ta: ['ஜூன்', 'ஜூலை', 'ஆகஸ்ட்', 'செப்', 'அக்', 'நவ', 'டிச', 'ஜன', 'பிப்', 'மார்', 'ஏப்', 'மே'],
  en: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
}

// Calendar month index → academic year grid index (Jun=0 .. May=11)
export function monthToAcademicIndex(calendarMonth: number): number {
  return calendarMonth >= 5 ? calendarMonth - 5 : calendarMonth + 7
}

// Derive academic year string (e.g. "2025-26") from an ISO date.
// Academic year runs Jun–May; months ≥ 5 (June) start the new year.
export function getAcademicYear(iso: string): string {
  const d = new Date(iso)
  const startYear = d.getMonth() >= 5 ? d.getFullYear() : d.getFullYear() - 1
  return `${startYear}-${String(startYear + 1).slice(2)}`
}

export function currentAcademicYear(): string {
  return getAcademicYear(new Date().toISOString())
}

// ─── All UI strings ───
export const COPY = {
  brand: {
    ta: 'அறிவியல் போட்டி',
    en: 'Ariviyal Poatti',
  },
  tagline: {
    ta: 'இந்தியாவின் பள்ளி அளவிலான அறிவியல் போட்டிகளின் தெளிவான வழிகாட்டி — தமிழ்நாட்டிற்கு.',
    en: 'A clear guide to India\u2019s school-level science competitions \u2014 focused on Tamil Nadu.',
  },
  nav: {
    home: { ta: 'முகப்பு', en: 'Home' },
    competitions: { ta: 'போட்டிகள்', en: 'Competitions' },
    dates: { ta: 'முக்கிய தேதிகள்', en: 'Key Dates' },
    start: { ta: 'இங்கே தொடங்குங்கள்', en: 'Start Here' },
    about: { ta: 'இது ஏன் இருக்கிறது', en: 'Why This Exists' },
    tamilNadu: { ta: 'தமிழ்நாடு', en: 'Tamil Nadu' },
  },
  home: {
    heroKicker: {
      ta: '12 தேசிய போட்டிகள் · தமிழ்நாட்டிற்கு ஒரே இடத்தில்',
      en: '12 national competitions \u00b7 curated for Tamil Nadu',
    },
    heroTitle: {
      ta: 'பள்ளி மாணவர்களுக்கான அறிவியல் போட்டிகள் — தேடல் இனி எளிது.',
      en: 'School science competitions \u2014 finally, in one place.',
    },
    heroSub: {
      ta: 'இந்தியாவில் 14.72 லட்சம் பள்ளிகள், 12 முக்கிய போட்டிகள், ஒவ்வொன்றும் வெவ்வேறு தேதி, தகுதி, நடைமுறை. இங்கே அனைத்தையும் தெளிவாக தொகுத்துள்ளோம்.',
      en: '14.72 lakh schools, 12 major competitions, each with its own dates, eligibility, and process. All gathered here \u2014 honestly, without fluff.',
    },
    audiencePrompt: { ta: 'நீங்கள் யார்?', en: 'Who are you?' },
    deadlineKicker: { ta: 'அடுத்த முக்கியமான தேதி', en: 'Next important deadline' },
    urgencyHeadline: {
      ta: 'INSPIRE\u2013MANAK யோசனை சமர்ப்பணம் \u2014 செப்டம்பர் கடைசி வரை',
      en: 'INSPIRE\u2013MANAK idea submissions \u2014 open till late September',
    },
    urgencyAction: { ta: 'விவரங்களைப் பார்', en: 'See details' },
    ctaSeeAll: { ta: '12 போட்டிகளையும் பார்', en: 'Browse all 12 competitions' },
    ctaSeeDates: { ta: 'வருடாந்திர காலண்டர்', en: 'See annual calendar' },
    footerNote: {
      ta: 'இது ஒரு அரசு தளம் அல்ல. சரிபார்ப்புக்கு எப்போதும் அதிகாரப்பூர்வ மூலத்தைப் பார்க்கவும்.',
      en: 'This is not a government site. Always verify with the official source.',
    },
  },
  audiences: {
    teacher: {
      label: { ta: 'ஆசிரியர்', en: 'Teacher' },
      line: { ta: 'இந்த வாரம் என்ன செய்ய வேண்டும்', en: 'What to do this week' },
      detail: {
        ta: 'உங்கள் மாணவர்களுக்கான படிவங்கள், காலக்கெடுகள், படிநிலை செயல்கள்.',
        en: 'Forms, deadlines, and step-by-step actions for your class.',
      },
    },
    principal: {
      label: { ta: 'முதல்வர்', en: 'Principal' },
      line: {
        ta: 'பள்ளிக்கு மதிப்புள்ளதா',
        en: 'Is this worth the school\u2019s time',
      },
      detail: {
        ta: 'பங்கேற்பின் விளைவுகள், முந்தைய வெற்றிகள், தேவையான ஆதாரங்கள்.',
        en: 'Outcomes, past results, resources your school will need.',
      },
    },
    parent: {
      label: { ta: 'பெற்றோர்', en: 'Parent' },
      line: {
        ta: 'என் குழந்தைக்கு என்ன வாய்ப்புகள்',
        en: 'Opportunities for my child',
      },
      detail: {
        ta: 'உங்கள் குழந்தையின் வயதுக்குப் பொருத்தமான போட்டிகள், பயன்கள், எப்படி ஆதரவளிக்கலாம்.',
        en: 'Age-appropriate competitions, benefits, and how to support them.',
      },
    },
  },
  startHere: {
    title: { ta: 'உங்கள் வழி', en: 'Your path' },
    intro: {
      ta: 'ஒரு பாத்திரத்தைத் தேர்ந்தெடுங்கள். ஒவ்வொரு போட்டிக்கும் என்ன செய்வது என்று சொல்கிறோம்.',
      en: "Pick a role. We'll show you exactly what to do for each competition.",
    },
    step5Note: {
      ta: 'படி 5 ஒவ்வொரு போட்டிக்கும் வேறுபடும். குறிப்பிட்ட நடவடிக்கைகளை காண எந்த போட்டி பக்கத்தையும் பார்க்கவும்.',
      en: 'Step 5 is specific to each competition. Visit any competition page to see exactly what to do.',
    },
    teacher: [
      {
        ta: 'உங்கள் வகுப்பு, பாடம் மற்றும் பள்ளி வளங்களுக்கு ஏற்ற ஒரே ஒரு போட்டியை தேர்ந்தெடுங்கள்.',
        en: 'Pick ONE competition that fits your class, subject, and school resources.',
        why: {
          ta: '12 போட்டிகளும் வேறு தகுதி, கட்டணம் மற்றும் நேர அட்டவணையை கொண்டுள்ளன. பல போட்டிகளில் பரவுவது ஆற்றலை வீணடிக்கும். ஒரு கவனமான முயற்சி மூன்று பாதி மனமான முயற்சிகளை விட சிறந்தது.',
          en: 'All 12 competitions have different eligibility, cost, and timing. Spreading across multiple wastes energy. One focused attempt wins more than three half-hearted ones.',
        },
      },
      {
        ta: 'அந்த போட்டிக்கான வாயிற்காவலரை கண்டுபிடியுங்கள் — ஒவ்வொன்றும் வேறு சேனலைப் பயன்படுத்துகிறது.',
        en: 'Find the gatekeeper for THAT competition — each uses a different channel.',
        why: {
          ta: 'INSPIRE: E-MIAS போர்ட்டலில் நேரடியாக உள்நுழையவும். RBVP: DEO அக்டோபரில் சுற்றறிக்கை அனுப்புவார். NCSC: மாவட்ட TNSCST ஒருங்கிணைப்பாளரை தொடர்பு கொள்ளுங்கள். ATL Marathon: innovation.gov.in-ல் விண்ணப்பிக்கவும்.',
          en: 'INSPIRE: log into E-MIAS portal directly. RBVP: DEO sends circulars — watch for it in October. NCSC: contact your district TNSCST coordinator. ATL Marathon: apply on innovation.gov.in. No single nodal teacher covers all competitions.',
        },
      },
      {
        ta: 'மாணவர்களை அடையாளம் காணுங்கள் — வழக்கமான முதல் வரிசை மாணவர்களை மட்டுமே பார்க்காதீர்கள்.',
        en: 'Identify students — look beyond the usual top rankers.',
        why: {
          ta: 'INSPIRE புதுமை மற்றும் அசல் யோசனைகளை வெகுமதிக்கிறது, மதிப்பெண்களை மட்டுமல்ல. RBVP கிராமப்புற தொடர்பை கவனம் செலுத்துகிறது. WRO கைகளால் செய்பவர்களை விரும்புகிறது.',
          en: 'INSPIRE rewards curiosity and original ideas, not just marks. RBVP focuses on rural relevance. WRO needs hands-on makers. Different competitions favor different student types.',
        },
      },
      {
        ta: 'நவம்பர்–ஜனவரி 12ல் 7 போட்டிகள் மோதும் நேரம் — இப்போதே கேலெண்டரில் குறியுங்கள்.',
        en: 'Mark the calendar — November–January is when 7 of 12 competitions collide.',
        why: {
          ta: 'INSPIRE செப்டம்பரில் மூடும், RBVP நவம்பரில், NCSC டிசம்பரில். ஒரு நாள் தவறினாலும் ஒரு முழு ஆண்டு காத்திருக்க வேண்டும். இப்போதே நேரத்தை ஒதுக்குங்கள்.',
          en: 'INSPIRE closes in September, RBVP in November, NCSC in December. Missing a portal deadline by one day means waiting a full year. Block time now.',
        },
      },
      {
        ta: 'விண்ணப்பிக்கவும் — சரியான படிகள் நீங்கள் தேர்ந்தெடுத்த போட்டியை பொறுத்தது.',
        en: 'Apply — the exact steps depend on which competition you picked.',
        why: {
          ta: 'உங்கள் குறிப்பிட்ட படி 5-ஐ காண போட்டி பக்கத்தை பார்க்கவும் — போர்ட்டல் இணைப்பு, சரிபார்ப்பு பட்டியல் மற்றும் ஒருங்கிணைப்பாளர் தொடர்பு.',
          en: 'See the competition page for your specific Step 5 — portal link, checklist, and coordinator contact.',
        },
      },
    ],
    principal: [
      {
        ta: 'பங்கேற்பை நேர்மையாக மதிப்பிடுங்கள் — இலவச போட்டிகளில் (INSPIRE, RBVP, NCSC) தொடங்குங்கள்.',
        en: 'Audit participation honestly — start with the free ones (INSPIRE, RBVP, NCSC).',
        why: {
          ta: 'மூன்று அரசு நிதியுதவி போட்டிகள் உங்கள் பள்ளிக்கு பூஜ்யம் ரூபாய் செலவாகும். அவற்றில் நீங்கள் இல்லாவிட்டால், அதுதான் முதலில் நிரப்ப வேண்டிய இடைவெளி.',
          en: "Three government-funded competitions cost your school zero rupees and zero infrastructure. If you're not in any of them, that's the gap to close first.",
        },
      },
      {
        ta: 'ஒரே ஒரு ஆசிரியரை ஒருங்கிணைப்பாளராக நியமிக்கவும் — பொறுப்பை பிரிப்பது என்னவும் நடக்காமல் போகும்.',
        en: 'Appoint ONE coordinator — split responsibility means nothing moves.',
        why: {
          ta: 'பொறுப்பை "பகிரும்" பல ஆசிரியர்கள் — பள்ளி ஒவ்வொரு காலக்கெடுவையும் தவறவிடுவதற்கான மிகவும் பொதுவான காரணம். ஒரு பெயர், ஒரு பொறுப்பு.',
          en: 'Multiple teachers "sharing" responsibility is the most common reason a school misses every deadline. One name, one accountability.',
        },
      },
      {
        ta: 'போட்டிகளை பள்ளி வளங்களுடன் பொருத்துங்கள்: ATL ஆய்வகம் → ATL Marathon; CBSE → CBSE Expo; எந்த பள்ளியும் → INSPIRE/RBVP/NCSC.',
        en: 'Map competitions to school resources: ATL lab → ATL Marathon; CBSE → CBSE Expo; any school → INSPIRE/RBVP/NCSC.',
        why: {
          ta: 'இல்லாத உள்கட்டமைப்பு தேவைப்படும் போட்டிகளில் நுழைய முயற்சிப்பது ஒருங்கிணைப்பாளரின் நேரத்தை வீணடிக்கும். சரியான பள்ளிக்கு சரியான போட்டி.',
          en: "Trying to enter competitions that require infrastructure you don't have wastes the coordinator's time. Right competition for the right school.",
        },
      },
      {
        ta: 'நவம்பருக்கு முன்பே பள்ளி கேலெண்டரில் காலக்கெடுக்களை பூட்டுங்கள்.',
        en: 'Lock deadlines in the school calendar before November.',
        why: {
          ta: 'நவம்பர்–ஜனவரியில் 7 போட்டி சாளரங்கள் மேலோடுகின்றன. பள்ளி கேலெண்டரில் இல்லாவிட்டால், நடக்காது.',
          en: "November–January has 7 competition windows overlapping. If it's not in the school calendar, it won't happen.",
        },
      },
      {
        ta: 'இந்த போட்டிக்கான உங்கள் நடவடிக்கை — ஒப்புதல், நிதி வெளியீடு அல்லது ஒருங்கிணைப்பு.',
        en: 'Your action for this competition — approval, budget release, or coordination.',
        why: {
          ta: 'உங்கள் குறிப்பிட்ட படி 5-ஐ காண போட்டி பக்கத்தை பார்க்கவும்.',
          en: 'See the competition page for your specific Step 5.',
        },
      },
    ],
    parent: [
      {
        ta: 'முதலில் கட்டணத்தை சரிபார்க்கவும் — INSPIRE/RBVP/NCSC/ATL: ₹0; SOF ~₹125; WRO ₹6K–18K; FLL ₹30K+.',
        en: 'Check the cost first — INSPIRE/RBVP/NCSC/ATL: ₹0; SOF ~₹125; WRO ₹6K–18K; FLL ₹30K+.',
        why: {
          ta: 'கட்டணம் பெரும்பாலான குடும்பங்களுக்கு முதல் தடை. ஒருங்கிணைப்பாளரிடம் பேசுவதற்கு முன் எந்த போட்டிகள் உண்மையிலேயே இலவசம் என்று தெரிந்துகொள்ளுங்கள்.',
          en: 'Cost is the #1 barrier for most families. Know which competitions are genuinely free before you talk to the school coordinator.',
        },
      },
      {
        ta: 'உங்கள் குழந்தையின் வகுப்பிற்கு போட்டிகளை கண்டுபிடியுங்கள் — Olympiads வகுப்பு 1 முதல் தொடங்கும்; IRIS வகுப்பு 6 முதல்.',
        en: "Find competitions for your child's class — Olympiads start from Class 1; IRIS from Class 6.",
        why: {
          ta: 'வெவ்வேறு போட்டிகளுக்கு வகுப்பின்படி கடுமையான தகுதி வெட்டுக்கள் உள்ளன. முதலில் வடிகட்டுவது உங்கள் குழந்தை தகுதியற்றதை தேடுவதில் இருந்து காக்கும்.',
          en: "Different competitions have hard eligibility cut-offs by class. Filtering first saves you from chasing something your child isn't eligible for.",
        },
      },
      {
        ta: 'பள்ளி வழியாக செல்லுங்கள் — பெரும்பாலான பதிவுகள் பள்ளி ஒருங்கிணைப்பாளர் மூலம் மட்டுமே நடக்கும்.',
        en: 'Go through the school — most registrations happen only via the school coordinator.',
        why: {
          ta: 'INSPIRE, RBVP, NCSC மற்றும் ATL Marathon பள்ளி வழியாக சமர்ப்பிக்கப்படுகின்றன. தனிப்பட்ட பெற்றோர் பதிவு இல்லை. பள்ளிதான் ஒரே வழி.',
          en: 'INSPIRE, RBVP, NCSC, and ATL Marathon are school-submitted. Individual parent registration does not exist for these. The school is the only path in.',
        },
      },
      {
        ta: 'இலவச பொருட்களுடன் தயாரிக்கவும் — HBCSE முந்தைய ஆண்டு கேள்விகள் மற்றும் NCERT வளங்கள் இணையத்தில் உள்ளன.',
        en: 'Prepare with free materials — HBCSE past papers and NCERT resources are online.',
        why: {
          ta: 'Olympiad-களுக்கான பயிற்சி வகுப்புகள் பணம் செலவாகும் மற்றும் தேவையில்லை. HBCSE இலவசமாக முந்தைய Olympiad கேள்விகளை வெளியிடுகிறது. SOF மாதிரி கேள்விகளும் அவர்கள் இணையதளத்தில் உள்ளன.',
          en: "Coaching classes for Olympiads cost money and aren't necessary. HBCSE publishes past Olympiad papers for free. SOF sample papers are also on their website.",
        },
      },
      {
        ta: 'இந்த போட்டிக்கு உங்கள் கோரிக்கை — ஒருங்கிணைப்பாளரிடம் என்ன சொல்வது.',
        en: 'Your ask for this competition — what to say to the coordinator.',
        why: {
          ta: 'உங்கள் குறிப்பிட்ட படி 5-ஐ காண போட்டி பக்கத்தை பார்க்கவும்.',
          en: 'See the competition page for your specific Step 5.',
        },
      },
    ],
  },
  dates: {
    title: { ta: 'முக்கிய தேதிகள்', en: 'Key Dates' },
    sub: {
      ta: '12 போட்டிகளின் வருடாந்திர காலண்டர். விண்ணப்பிக்கும் முன் சரிபார்க்கவும்.',
      en: 'Annual calendar of all 12 competitions. Always verify before you apply.',
    },
    shareWhatsapp: { ta: 'WhatsApp-ல் பகிர்', en: 'Share on WhatsApp' },
    statusOpen: { ta: 'பதிவு திறந்துள்ளது', en: 'Registration open' },
    statusSoon: { ta: 'விரைவில் மூடப்படும்', en: 'Closing soon' },
    statusUpcoming: { ta: 'வரவிருக்கிறது', en: 'Upcoming' },
    statusClosed: { ta: 'முடிந்தது', en: 'Closed' },
    collisionNote: {
      ta: 'நவம்பர்\u2013ஜனவரி மிக நெரிசலான காலம் \u2014 NSE, SOF நிலை 1, CBSE பிராந்திய, IRIS திரையிடல், WRO மற்றும் NCSC அனைத்தும் ஒரே நேரத்தில்.',
      en: 'November\u2013January is the collision zone \u2014 NSE, SOF Level 1, CBSE regionals, IRIS screening, WRO, and NCSC all converge here.',
    },
  },
  about: {
    title: { ta: 'இது ஏன் இருக்கிறது', en: 'Why this exists' },
    body: [
      {
        ta: 'இது ஒரு அரசு தளம் அல்ல. ஒரு NGO-வும் அல்ல. ஒரு தொடக்க நிறுவனமும் அல்ல.',
        en: 'This is not a government portal. Not an NGO. Not a startup.',
      },
      {
        ta: 'இந்தியாவில் 14.72 லட்சம் பள்ளிகள், 12 முக்கிய தேசிய அறிவியல் போட்டிகள் உள்ளன. ஆனால் ஒவ்வொரு போட்டியின் தகவலும் வெவ்வேறு தளங்களில் சிதறியுள்ளது.',
        en: 'India has 14.72 lakh schools and 12 major national science competitions. But the information for each is scattered across different sites.',
      },
      {
        ta: 'தமிழ்நாட்டில் 57,935 பள்ளிகள். IRIS 2024 தேசிய இறுதி 101 மாணவர்களில் \u2014 தமிழ்நாட்டிலிருந்து வெறும் 3 பேர். அவர்கள் மூவரும் சென்னை மற்றும் கோயம்புத்தூரிலுள்ள தனியார் பள்ளிகளில். அரசு பள்ளி மாணவர் ஒருவரும் இல்லை.',
        en: 'Tamil Nadu has 57,935 schools. Out of 101 national IRIS 2024 finalists \u2014 only 3 were from Tamil Nadu, all from private schools in Chennai and Coimbatore. Not a single government school student.',
      },
      {
        ta: 'வானவில் மன்றம் 25 லட்சம் அரசு பள்ளி மாணவர்களை சென்றடைகிறது. ஆனால் அது எந்த தேசிய போட்டியுடனும் இணைக்கப்படவில்லை. இது மாற்றப்பட வேண்டும்.',
        en: 'Vaanavil Mandram reaches 25 lakh government school students \u2014 but isn\u2019t connected to any national competition pipeline. That has to change.',
      },
      {
        ta: 'எனவே தகவலை ஒரே இடத்தில், இரண்டு மொழிகளில், நேர்மையாக ஒன்று சேர்த்திருக்கிறோம். இது ஒரு நண்பனின் வேலை \u2014 ஆராய்ச்சியை முடித்து, தெளிவாக உங்களுக்குத் தருகிறது.',
        en: 'So we put the information in one place, in two languages, honestly. Think of this as a friend who has done the research and laid it out for you clearly.',
      },
      {
        ta: 'தவறு இருந்தால் \u2014 தயவு செய்து எங்களுக்குத் தெரிவியுங்கள். நாங்கள் திருத்துவோம்.',
        en: 'If something is wrong \u2014 please tell us. We\u2019ll fix it.',
      },
    ],
    sources: { ta: 'ஆதாரம்', en: 'Sources' },
    sourcesText: {
      ta: 'UDISE+ 2023\u201324, 2024\u201325 \u00b7 HBCSE \u00b7 NCERT \u00b7 DST \u00b7 AIM/NITI Aayog \u00b7 IARCS \u00b7 TN SEP 2025 \u00b7 TN பட்ஜெட் 2025\u201326',
      en: 'UDISE+ 2023\u201324, 2024\u201325 \u00b7 HBCSE \u00b7 NCERT \u00b7 DST \u00b7 AIM/NITI Aayog \u00b7 IARCS \u00b7 TN SEP 2025 \u00b7 TN Budget 2025\u201326',
    },
    contact: { ta: 'தொடர்பு', en: 'Contact' },
    tnTitle: { ta: 'தமிழ்நாடு \u2014 எண்களில்', en: 'Tamil Nadu \u2014 the numbers' },
    tnFacts: [
      {
        ta: '57,935 பள்ளிகள் \u00b7 1.25 கோடி மாணவர்கள்',
        en: '57,935 schools \u00b7 1.25 crore students',
      },
      {
        ta: '1,197 INSPIRE தேர்வுகள் (2024\u201325)',
        en: '1,197 INSPIRE selections (2024\u201325)',
      },
      { ta: 'IRIS 2024: 101-ல் 3 பதிவுகள் மட்டுமே', en: 'IRIS 2024: only 3 of 101 finalists' },
      { ta: 'வானவில் மன்றம்: 25 லட்சம் மாணவர்கள்', en: 'Vaanavil Mandram: 25 lakh students' },
    ],
  },
  common: {
    register: { ta: 'அதிகாரப்பூர்வ தளத்தை பார்', en: 'Go to official site' },
    learnMore: { ta: 'மேலும் அறிய', en: 'Learn more' },
    eligibility: { ta: 'தகுதி', en: 'Eligibility' },
    deadline: { ta: 'முக்கிய தேதி', en: 'Key deadline' },
    process: { ta: 'நடைமுறை', en: 'Process' },
    fee: { ta: 'கட்டணம்', en: 'Fee' },
    free: { ta: 'இலவசம்', en: 'Free' },
    official: { ta: 'அதிகாரப்பூர்வ இணையதளம்', en: 'Official site' },
    back: { ta: '\u2190 திரும்பு', en: '\u2190 Back' },
    all: { ta: 'அனைத்தும்', en: 'All' },
    daysLeft: { ta: 'நாட்கள் மீதம்', en: 'days left' },
    organiser: { ta: 'ஆயோஜகர்', en: 'Organiser' },
    since: { ta: 'தொடக்கம்', en: 'Since' },
    reach: { ta: 'பள்ளி எட்டுதல்', en: 'School reach' },
    intlPath: { ta: 'சர்வதேச பாதை', en: 'International pathway' },
    schoolType: { ta: 'பள்ளி வகை', en: 'School type' },
    verified: { ta: 'சரிபார்க்கப்பட்டது', en: 'Verified' },
    lastVerified: { ta: 'கடைசி சரிபார்ப்பு', en: 'Last cross-checked' },
  },
  categories: {
    all: { ta: 'அனைத்தும்', en: 'All' },
    govt: { ta: 'அரசு', en: 'Government' },
    ngo: { ta: 'NGO/Research', en: 'NGO / Research' },
    olympiad: { ta: 'ஒலிம்பியாட்', en: 'Olympiad' },
    private: { ta: 'தனியார்', en: 'Private' },
    robotics: { ta: 'ரோபோட்டிக்ஸ்', en: 'Robotics' },
    state: { ta: 'மாநிலம்', en: 'State' },
  },
}

// ─── India's School Education Landscape (UDISE+ 2023–24) ───
export const INDIA_EDUCATION_LANDSCAPE = {
  totalSchools: '14,72,000',
  totalStudents: '24.8 கோடி (248 million)',
  totalTeachers: '~1 கோடி (10 million)',
  breakdowns: [
    {
      label: { ta: 'அரசு பள்ளிகள்', en: 'Government schools' },
      count: '~10.16 லட்சம்',
      percent: '69%',
    },
    {
      label: { ta: 'தனியார் உதவியில்லா பள்ளிகள்', en: 'Private unaided schools' },
      count: '~3.31 லட்சம்',
      percent: '22.5%',
    },
    {
      label: { ta: 'உதவி பெறும் மற்றும் பிற பள்ளிகள்', en: 'Aided & other schools' },
      count: '~1.25 லட்சம்',
      percent: '8.5%',
    },
  ],
  source: { ta: 'UDISE+ 2023\u201324', en: 'UDISE+ 2023\u201324' },
}

// ─── Key Observations (editorial) ───
export const KEY_OBSERVATIONS: Array<{
  id: string
  title: Bilingual
  body: Bilingual[]
}> = [
  {
    id: 'coverage-gap',
    title: {
      ta: 'பங்கேற்பு இடைவெளி — அரசு vs தனியார்',
      en: 'The Coverage Gap \u2014 Government vs Private Schools',
    },
    body: [
      {
        ta: 'இந்தியாவில் 14.72 லட்சம் பள்ளிகள். 69% அரசு நிர்வாகம். ஆனால் பெரிய மூன்று அரசு திட்டங்களுக்கு (INSPIRE, RBVP, NCSC) அப்பால், பெரும்பாலான போட்டிகளை தனியார் பள்ளி மாணவர்கள் அணுகுகிறார்கள்.',
        en: 'India has 14.72 lakh schools. 69% are government-managed. Yet beyond the big three government schemes (INSPIRE, RBVP, NCSC), most competitions are primarily accessed by private school students.',
      },
      {
        ta: 'ரோபோட்டிக்ஸ் போட்டிகள் (WRO, FLL) குழுவிற்கு ₹6,000\u201318,000+ கட்டணம் கொண்டுள்ளன — அரசு பள்ளி மாணவர்களை விலக்குகின்றன.',
        en: 'Robotics competitions (WRO, FLL) carry fee barriers of \u20b96,000\u201318,000+ per team, effectively excluding most government school students.',
      },
    ],
  },
  {
    id: 'collision-zone',
    title: {
      ta: 'நவம்பர்\u2013ஜனவரி நெரிசல் மண்டலம்',
      en: 'The November\u2013January Collision Zone',
    },
    body: [
      {
        ta: 'NSE தேர்வுகள், SOF ஒலிம்பியாட் நிலை 1, CBSE பிராந்திய கண்காட்சிகள், IRIS திரையிடல், WRO மெய்நிகர் சுற்றுகள், NCSC தேசிய நிகழ்வு \u2014 அனைத்தும் நவம்பர்\u2013ஜனவரியில் ஒன்று சேர்கின்றன.',
        en: 'NSE exams, SOF Olympiad Level 1, CBSE regional exhibitions, IRIS screening, WRO virtual rounds, and NCSC national event \u2014 all converge in November\u2013January.',
      },
    ],
  },
  {
    id: 'isef-pathway',
    title: { ta: 'ISEF பாதை \u2014 மூன்று வழிகள்', en: 'The ISEF Pathway \u2014 Three Routes' },
    body: [
      {
        ta: 'வழி 1: IRIS National Fair (முதன்மை நுழைவாயில்). வழி 2: RBVP வெற்றியாளர்கள் → IRIS. வழி 3: CBSE Science Exhibition → IRIS (5 பதிவுகள்).',
        en: 'Route 1: IRIS National Fair (primary gateway). Route 2: RBVP winners \u2192 IRIS. Route 3: CBSE Science Exhibition \u2192 IRIS (5 entries).',
      },
    ],
  },
  {
    id: 'olympiad-distinction',
    title: { ta: 'ஒலிம்பியாட் வேறுபாடு', en: 'The Olympiad Distinction' },
    body: [
      {
        ta: 'அதிகாரப்பூர்வ ஒலிம்பியாட்கள்: NSE/INO (HBCSE/IAPT) \u2014 அரசு, கடினமான, IPhO/IChO/IBO/IOAA/IJSO. வணிக ஒலிம்பியாட்கள்: SOF NSO \u2014 தனியார், கட்டணம், அதிக பங்கேற்பு ஆனால் சர்வதேச நிகழ்வுகளுக்கு இல்லை.',
        en: 'Official Olympiads: NSE/INO (HBCSE/IAPT) \u2014 government-run, rigorous, culminates at IPhO/IChO/IBO/IOAA/IJSO. Commercial Olympiads: SOF NSO \u2014 private, fee-based, high volume but no international stage.',
      },
    ],
  },
  {
    id: 'inspire-kvpy-merger',
    title: { ta: 'INSPIRE\u2013KVPY இணைப்பு (2022)', en: 'The INSPIRE\u2013KVPY Merger (2022)' },
    body: [
      {
        ta: 'KVPY (1999 முதல்) 2022ல் INSPIRE திட்டத்தில் இணைக்கப்பட்டது. புதிய KVPY தேர்வுகள் நடத்தப்படவில்லை. மாணவர்கள் இப்போது INSPIRE SHE வழியாக செல்கிறார்கள்.',
        en: 'KVPY (running since 1999) was merged into INSPIRE in 2022. No new KVPY aptitude tests are conducted. Students now go through INSPIRE SHE (Scholarship for Higher Education).',
      },
    ],
  },
]

// ─── Quick Reference Card ───
export const QUICK_REFERENCE: Array<{
  condition: Bilingual
  bestFit: string[]
  cost: Bilingual
  benefit: Bilingual
}> = [
  {
    condition: { ta: 'எந்த பள்ளியும், 6\u201312 வகுப்பு', en: 'Any school, Classes 6\u201312' },
    bestFit: ['inspire-manak'],
    cost: { ta: 'இலவசம்', en: 'Zero' },
    benefit: {
      ta: '₹10,000 விருது; வெகுஜன பங்கேற்பு',
      en: '\u20b910,000 award per selected idea; mass participation',
    },
  },
  {
    condition: { ta: 'எந்த பள்ளியும், 6\u201312 வகுப்பு', en: 'Any school, Classes 6\u201312' },
    bestFit: ['rbvp'],
    cost: { ta: 'இலவசம்', en: 'Zero' },
    benefit: {
      ta: 'மிகப் பழமையான, கட்டமைக்கப்பட்ட; ஒவ்வொரு மாவட்டமும் உள்ளடக்கியது',
      en: 'Oldest, most structured; covers every district in India',
    },
  },
  {
    condition: { ta: 'சமூக/கிராமப்புற சூழல்', en: 'Community/rural context' },
    bestFit: ['ncsc'],
    cost: { ta: 'இலவசம்', en: 'Zero' },
    benefit: {
      ta: 'பள்ளிக்கு வெளியே உள்ள குழந்தைகளுக்கும் திறந்தது',
      en: 'Open to non-school children too; local problem focus',
    },
  },
  {
    condition: { ta: 'CBSE-இணைப்பு பள்ளி', en: 'CBSE-affiliated' },
    bestFit: ['cbse-expo'],
    cost: { ta: 'இலவசம்', en: 'Zero' },
    benefit: { ta: 'IRIS மற்றும் ISEF-க்கு நேரடி ஊட்டு', en: 'Direct feeder to IRIS and ISEF' },
  },
  {
    condition: { ta: 'புதுமை கவனம்', en: 'Innovation focus' },
    bestFit: ['atl-marathon'],
    cost: { ta: 'இலவசம் (ATL ஆய்வக பள்ளிக்கு)', en: 'Zero (if ATL lab) / Minimal' },
    benefit: {
      ta: 'அரசு ஆதரவு; முன்மாதிரி; Internship',
      en: 'Government backing; prototype development; internships',
    },
  },
  {
    condition: {
      ta: 'ஆராய்ச்சி சார்ந்த, 5\u201312',
      en: 'Research-focused students, Cl 5\u201312',
    },
    bestFit: ['iris'],
    cost: { ta: 'இலவசம்', en: 'Zero (application)' },
    benefit: {
      ta: 'ISEF நுழைவாயில்; மிக மதிப்புள்ள அறிவியல் விழா',
      en: 'Gateway to ISEF; most prestigious science fair in India',
    },
  },
  {
    condition: { ta: 'அதிக கல்வி திறன், 9\u201312', en: 'High academic ability, Cl 9\u201312' },
    bestFit: ['nse-ino'],
    cost: { ta: 'குறைந்த தேர்வு கட்டணம்', en: 'Minimal (exam fee)' },
    benefit: {
      ta: 'IPhO/IChO/IBO/IJSO-க்கு ஒரே வழி',
      en: 'Only path to IPhO/IChO/IBO/IJSO \u2014 globally respected',
    },
  },
  {
    condition: {
      ta: 'சுற்றுச்சூழல் கவனம், 4\u201310',
      en: 'Environment focus, Cl 4\u201310',
    },
    bestFit: ['teri-green'],
    cost: { ta: 'குறைந்தது (₹60\u2013100/மாணவர்)', en: 'Low (\u20b960\u2013100/student)' },
    benefit: {
      ta: 'எழுத்து தேர்வு; வலுவான சுற்றுச்சூழல் அறிவியல்',
      en: 'Written exam; strong environmental science content',
    },
  },
  {
    condition: { ta: 'ரோபோட்டிக்ஸ் திட்டம்', en: 'Robotics programme' },
    bestFit: ['wro'],
    cost: { ta: 'நடுத்தரம் (₹6K\u201318K/குழு)', en: 'Medium (\u20b96K\u201318K/team)' },
    benefit: {
      ta: 'சர்வதேச போட்டி; வலுவான STEM',
      en: 'International competition; strong STEM skill-building',
    },
  },
  {
    condition: { ta: 'பிரீமியம் பள்ளி, 9\u201316', en: 'Premium school, ages 9\u201316' },
    bestFit: ['fll'],
    cost: { ta: 'அதிகம் (கிட்கள் + கட்டணம்)', en: 'High (kits + fees)' },
    benefit: {
      ta: 'உலகளாவிய மதிப்பு; World Festival USA',
      en: 'Global prestige; World Festival in USA',
    },
  },
]

// ─── TN State Context ───
export const TN_STATE_CONTEXT = {
  baseline: {
    totalSchools: '57,935',
    totalStudents: '1.25 கோடி (12.5 million)',
    totalTeachers: '5.49 லட்சம்',
    percentOfIndia: '~3.9%',
    source: { ta: 'UDISE+ 2024\u201325', en: 'UDISE+ 2024\u201325' },
  },
  educationPolicy: {
    title: {
      ta: 'தமிழ்நாடு மாநிலக் கல்வி கொள்கை 2025',
      en: 'Tamil Nadu State Education Policy 2025',
    },
    commitments: [
      {
        ta: 'வானவில் மன்றம் 100 மொபைல் STEM ஆய்வகங்கள் விரிவாக்கம்',
        en: 'Expansion of 100 Vaanavil Mandram mobile STEM labs',
      },
      {
        ta: 'TN-SPARK: நடுநிலைப் பள்ளியில் இருந்து AI, குறியீட்டு, தரவு கல்வி',
        en: 'TN-SPARK: coding, AI, data literacy from middle school onwards',
      },
      {
        ta: '38 மாதிரி பள்ளிகள் (ஒவ்வொரு மாவட்டத்திலும் ஒன்று) + 313 வேற்றி பள்ளிகள்',
        en: '38 Model Schools (one per district) + 313 Vetri Palligal (one per block)',
      },
      {
        ta: 'அனைத்து அரசு பள்ளிகளிலும் அறிவியல், சுற்றுச்சூழல், இலக்கிய மன்றங்கள் (மகிழ் மன்றம்)',
        en: 'Science, eco, and literary clubs (Magizh Mandram) across all government schools',
      },
    ],
  },
  budget: {
    total: '₹46,767 கோடி',
    lineItems: [
      {
        label: {
          ta: 'பேராசிரியர் அன்பழகன் உள்கட்டமைப்பு திட்டம்',
          en: 'Perasiriyar Anbazhagan Infrastructure Scheme',
        },
        amount: '₹1,000 கோடி',
      },
      {
        label: { ta: 'ICT ஆய்வக மேம்பாடு', en: 'ICT lab upgradation' },
        amount: '₹160 கோடி',
      },
      {
        label: {
          ta: 'ஸ்மார்ட் வகுப்பறைகள் / Hi-tech ஆய்வகங்கள்',
          en: 'Smart classrooms / Hi-tech labs',
        },
        amount: '₹56\u201365 கோடி',
      },
      {
        label: { ta: 'சமக்ர சிக்ஷா (மாநில + மத்திய)', en: 'Samagra Shiksha (state + central)' },
        amount: '₹4,150 கோடி',
      },
    ],
    caveat: {
      ta: 'இந்த பட்ஜெட் வரிகளில் எதுவும் குறிப்பாக அறிவியல் போட்டி பங்கேற்பை நிதியளிக்கவில்லை.',
      en: 'None of these budget lines specifically fund science competition participation.',
    },
  },
  opportunities: [
    {
      title: {
        ta: 'வானவில் மன்றம் → INSPIRE குழாய்',
        en: 'Vaanavil Mandram \u2192 INSPIRE pipeline',
      },
      body: [
        {
          ta: 'வானவில் மன்றம் ஆண்டுதோறும் 48,000+ மாணவர்களை எட்டும் உள் போட்டிகளை நடத்துகிறது. INSPIRE செப்டம்பர் வரை நாமினேஷன்களை ஏற்கிறது. செலவு இல்லாமல் குழாயை உருவாக்கலாம்.',
          en: 'Vaanavil Mandram runs internal competitions reaching 48,000+ students annually. INSPIRE accepts nominations until September. A formal guidance protocol would cost zero and require no new infrastructure.',
        },
      ],
    },
    {
      title: {
        ta: 'STEM வளப் பணியாளர் → போட்டி வழிகாட்டி',
        en: 'STEM Resource Person as competition guide',
      },
      body: [
        {
          ta: '710 பயிற்சி பெற்ற STEM வளப் பணியாளர்கள் ஒவ்வொரு அரசு பள்ளியையும் பார்வையிடுகிறார்கள். இவர்களுக்கு ஒரு அரை நாள் நோக்குநிலை அதை மாற்றும்.',
          en: '710 trained STEM Resource Persons already visit every government school. A single half-day orientation for these 710 people could change that.',
        },
      ],
    },
    {
      title: {
        ta: 'ஓய்வுபெற்ற அறிவியல் ஆசிரியர் வலைப்பின்னல்',
        en: 'Retired science teacher network',
      },
      body: [
        {
          ta: 'பல்லாயிரக்கணக்கான ஓய்வுபெற்ற அறிவியல் ஆசிரியர்கள் \u2014 போட்டி திட்ட தயாரிப்புக்கான ஒருங்கிணைக்கப்படாத தன்னார்வ வளம்.',
          en: 'Tens of thousands of retired science teachers \u2014 an unmobilised volunteer resource for mentoring students on competition project preparation.',
        },
      ],
    },
    {
      title: {
        ta: 'ஒரு தமிழ்நாடு மாநில அறிவியல் விழா',
        en: 'A Tamil Nadu state science fair',
      },
      body: [
        {
          ta: 'தற்போது TN-குறிப்பிட்ட ISEF-இணைக்கப்பட்ட அறிவியல் விழா இல்லை. வானவில் மன்றம் மற்றும் தேசிய IRIS நிலைக்கு இடையே ஒரு புதிய ஏணிப் படியை உருவாக்கும்.',
          en: 'No TN-specific ISEF-affiliated science fair currently exists. One regional fair would create a new ladder rung between Vaanavil Mandram and the national IRIS stage.',
        },
      ],
    },
  ],
  internationalBenchmarks: [
    {
      model: 'edinburgh',
      title: {
        ta: 'எடின்பரோ மாதிரி \u2014 பொது கலாச்சாரமாக அறிவியல்',
        en: 'The Edinburgh Model \u2014 Science as Public Culture',
      },
      description: [
        {
          ta: 'Generation Science: ஆண்டு முழுவதும் பள்ளிகளுக்கு சென்று நிகழ்ச்சிகள் நடத்தும் திட்டம். பின்தங்கிய பகுதிகளுக்கு முன்னுரிமை. வானவில் மன்றத்தின் 710 STEM வளப் பணியாளர்கள் இதே மாதிரியை பின்பற்றுகிறார்கள்.',
          en: 'Generation Science: a year-round touring schools programme that prioritises schools in remote regions and areas of economic disadvantage. Vaanavil Mandram\u2019s 710 STEM Resource Persons mirror this model.',
        },
      ],
    },
    {
      model: 'isef-global',
      title: {
        ta: 'ISEF உலகளாவிய மாதிரி \u2014 உள்ளூர் விழாக்கள் நுழைவாயிலாக',
        en: 'The ISEF Global Model \u2014 Local Fairs as Gateways',
      },
      description: [
        {
          ta: 'உலகளவில் 70 லட்சம் மாணவர்கள் ISEF-இணைக்கப்பட்ட உள்ளூர் விழாக்களில் பங்கேற்கிறார்கள். இந்தியாவின் முழு குழாயும் ஒரே தேசிய சாலையாக \u2014 IRIS \u2014 செல்கிறது.',
          en: 'An estimated 7 million students globally participate in ISEF-affiliated local fairs. India\u2019s entire pipeline runs through a single national bottleneck \u2014 IRIS.',
        },
      ],
    },
  ],
}

// ─── Flow Steps (Role Dashboard Data) ───

export interface FlowStep {
  kicker: Bilingual
  title: Bilingual
  body: Bilingual
  actions?: Array<{
    label: Bilingual
    kind: 'primary' | 'secondary'
    href?: string
    external?: boolean
  }>
  competitionId?: string
  facts?: Bilingual[]
}

export function getFlowSteps(role: 'teacher' | 'principal' | 'parent'): FlowStep[] {
  if (role === 'teacher') {
    return [
      {
        kicker: { ta: 'படி 1', en: 'Step 1' },
        title: {
          ta: 'ஒரே ஒரு போட்டியுடன் தொடங்குங்கள்',
          en: 'Start with one competition.',
        },
        body: {
          ta: 'பத்து போட்டிகளையும் ஒரே நேரத்தில் தொடங்க வேண்டாம். INSPIRE\u2013MANAK \u2014 முற்றிலும் இலவசம், பள்ளி உள்கட்டமைப்பு எதுவும் தேவையில்லை, 10 லட்சம் பிள்ளைகள் ஆண்டுதோறும் பங்கேற்கின்றனர். இதிலிருந்து தொடங்குங்கள்.',
          en: 'Don\u2019t try all twelve at once. INSPIRE\u2013MANAK is free, needs no school infrastructure, and already reaches 10 lakh students a year. Start here.',
        },
        competitionId: 'inspire-manak',
        actions: [
          {
            label: { ta: 'INSPIRE\u2013MANAK விவரம்', en: 'See INSPIRE\u2013MANAK' },
            kind: 'primary',
            href: '/competitions/inspire-manak',
          },
        ],
      },
      {
        kicker: { ta: 'படி 2', en: 'Step 2' },
        title: {
          ta: 'உங்கள் பள்ளியின் INSPIRE நோடல் ஆசிரியர் யார்?',
          en: 'Find out who your school\u2019s INSPIRE nodal teacher is.',
        },
        body: {
          ta: 'ஒவ்வொரு பள்ளியிலும் ஒருவர் INSPIRE போர்ட்டலில் பதிவு செய்ய அதிகாரம் பெற்றுள்ளார். முதல்வரிடம் கேளுங்கள், அல்லது SCERT-ஐ தொடர்பு கொள்ளுங்கள். இதை இந்த வாரம் செய்யுங்கள்.',
          en: 'One teacher at every school is authorised to submit to the INSPIRE portal. Ask your principal, or contact SCERT. Do this this week \u2014 nothing else happens until this is sorted.',
        },
      },
      {
        kicker: { ta: 'படி 3', en: 'Step 3' },
        title: {
          ta: 'உங்கள் வகுப்பிலிருந்து 5 மாணவர்களை தேர்ந்தெடுங்கள்',
          en: 'Nominate 5 students from your class.',
        },
        body: {
          ta: 'INSPIRE-ன் இலக்கு \u2014 ஆண்டுக்கு 10 லட்சம் யோசனைகள். ஆர்வமுள்ள பிள்ளைகளை மட்டும் தேர்ந்தெடுக்காதீர்கள். முதலில் தயங்கியவர்களை நாமினேட் செய்யுங்கள். \u20b910,000 நேரடியாக அவர்களது வங்கிக் கணக்கிற்கு வரும்.',
          en: 'INSPIRE\u2019s goal is 10 lakh ideas a year. Don\u2019t just pick the obvious students \u2014 nominate the quieter ones who hesitated first. \u20b910,000 lands directly in their bank account.',
        },
        facts: [
          { ta: '\u20b910,000 / மாணவர்', en: '\u20b910,000 per student' },
          { ta: 'DBT நேரடி பரிமாற்றம்', en: 'Direct bank transfer' },
          { ta: 'கட்டணம் இல்லை', en: 'Zero fee' },
        ],
      },
      {
        kicker: { ta: 'படி 4', en: 'Step 4' },
        title: { ta: 'காலண்டர் உங்கள் தோழர்', en: 'The calendar is your friend.' },
        body: {
          ta: 'நவம்பர்\u2013ஜனவரி மிகவும் நெரிசலான காலம். INSPIRE, NSE, SOF, IRIS எல்லாம் ஒரே சமயத்தில். ஒரு வாரம் முன்னதாக உங்கள் மாணவர்கள் தயாராக இருக்க வேண்டும். முழு காலண்டரையும் பார்த்துக் கொள்ளுங்கள்.',
          en: 'November to January is the collision zone \u2014 INSPIRE, NSE, SOF, IRIS all converge. Your students should be ready a week early. See the full calendar and pencil dates into your class diary.',
        },
        actions: [
          {
            label: { ta: 'வருடாந்திர காலண்டர் பார்', en: 'See annual calendar' },
            kind: 'primary',
            href: '/key-dates',
          },
        ],
      },
      {
        kicker: { ta: 'படி 5', en: 'Step 5' },
        title: {
          ta: 'பகிர்ந்து கொள்ளுங்கள். ஒரு ஆசிரியர் மட்டும் போதாது.',
          en: 'Share this. One teacher isn\u2019t enough.',
        },
        body: {
          ta: 'தமிழ்நாட்டில் 57,935 பள்ளிகள். உங்கள் அண்டை பள்ளி ஆசிரியர்களுக்கு WhatsApp-ல் இந்த பக்கத்தை அனுப்புங்கள்.',
          en: 'Tamil Nadu has 57,935 schools. Share this page on WhatsApp with teachers in neighbouring schools.',
        },
        actions: [
          {
            label: { ta: '12 போட்டிகளையும் பார்', en: 'Browse all 12' },
            kind: 'secondary',
            href: '/competitions',
          },
        ],
      },
    ]
  }

  if (role === 'principal') {
    return [
      {
        kicker: { ta: 'படி 1', en: 'Step 1' },
        title: {
          ta: 'கடந்த ஆண்டு உங்கள் பள்ளியின் பதிவை மதிப்பிடுங்கள்',
          en: 'Audit last year\u2019s record \u2014 honestly.',
        },
        body: {
          ta: 'INSPIRE, RBVP, NCSC \u2014 இவற்றில் எவையேனும் உங்கள் பள்ளி பங்கேற்றதா? எத்தனை மாணவர்கள்? யார் ஒருங்கிணைத்தனர்? பதில் "யாரும் இல்லை" என்றால், இது தான் தொடக்கப் புள்ளி.',
          en: 'Did your school enter INSPIRE, RBVP, or NCSC? How many students? Who coordinated? If the answer is "nobody" \u2014 that\u2019s your baseline.',
        },
        facts: [
          { ta: 'IRIS 2024: தமிழ்நாடு 101-ல் 3', en: 'IRIS 2024: 3 of 101 from TN' },
          { ta: 'அனைத்தும் தனியார் பள்ளிகள்', en: 'All private schools' },
          { ta: 'அரசு பள்ளி: 0', en: 'Government schools: 0' },
        ],
      },
      {
        kicker: { ta: 'படி 2', en: 'Step 2' },
        title: {
          ta: 'ஒரு ஒருங்கிணைப்பாளரை நியமியுங்கள். ஒருவர் மட்டும்.',
          en: 'Appoint one Science Competitions Coordinator. One person.',
        },
        body: {
          ta: 'ஒரு பொறுப்பு, ஒருவர். பதினைந்து ஆசிரியர்களிடையே பகிர்ந்தால், ஒன்றும் நடக்காது. INSPIRE நோடல் ஆசிரியர் என்பது அரசு கட்டாயமாக்கிய பதவி \u2014 அதை சரியான நபருக்கு கொடுங்கள்.',
          en: 'One mandate, one person. Split it across fifteen teachers and nothing moves. The INSPIRE nodal teacher role is already government-mandated \u2014 give it to the right person.',
        },
      },
      {
        kicker: { ta: 'படி 3', en: 'Step 3' },
        title: {
          ta: 'ATL ஆய்வகம் இருக்கிறதா? அதை பயன்படுத்துங்கள்.',
          en: 'Got an Atal Tinkering Lab? Use it.',
        },
        body: {
          ta: 'ATL Marathon 2024-ல் 54,000+ பள்ளிகள் பங்கேற்றன. உங்களுடைய பள்ளியில் ATL இருந்தும் பங்கேற்கவில்லை என்றால், அது வெறும் சாதனங்கள் வைக்கும் அறை. குழுவை பதிவு செய்யுங்கள்.',
          en: '54,000+ schools joined the ATL Marathon in 2024. If you have an ATL but aren\u2019t entering, it\u2019s just a room with kit. Register a team.',
        },
        competitionId: 'atl-marathon',
        actions: [
          {
            label: { ta: 'ATL Marathon விவரம்', en: 'See ATL Marathon' },
            kind: 'primary',
            href: '/competitions/atl-marathon',
          },
        ],
      },
      {
        kicker: { ta: 'படி 4', en: 'Step 4' },
        title: {
          ta: 'நவம்பர்\u2013ஜனவரி பள்ளி நாட்காட்டியில் முன்கூட்டியே குறிக்கவும்',
          en: 'Pencil November to January into the school calendar \u2014 early.',
        },
        body: {
          ta: 'மாவட்ட கண்காட்சி, NSE, SOF நிலை 1, CBSE பிராந்திய, IRIS திரையிடல், WRO, NCSC \u2014 அனைத்தும் இந்த மூன்று மாதங்களில். ஆசிரியர்கள் தனியாக மீட்கப்படுவதற்கு முன் இதை பள்ளி கேலெண்டரில் சேர்க்கவும்.',
          en: 'District fair, NSE, SOF Level 1, CBSE regionals, IRIS screening, WRO, NCSC \u2014 all within these three months. Put it in the school calendar before your teachers have to scramble.',
        },
        actions: [
          {
            label: { ta: 'காலண்டரை பார்', en: 'See the calendar' },
            kind: 'primary',
            href: '/key-dates',
          },
        ],
      },
      {
        kicker: { ta: 'படி 5', en: 'Step 5' },
        title: {
          ta: 'வெற்றி பெற்றவர்களை பள்ளி முன்வெளியில் கௌரவியுங்கள்',
          en: 'Celebrate your winners publicly. It compounds.',
        },
        body: {
          ta: 'ஒரு மாணவரின் வெற்றி \u2014 பள்ளி முன்வெளியில் கௌரவிக்கப்பட்டால் \u2014 அடுத்த ஆண்டு பத்து மாணவர்களை தயாராக ஆக்கும். இது மலிவான, மிகச் சக்திவாய்ந்த விஷயம்.',
          en: 'One student\u2019s win, publicly celebrated, creates ten who try next year. It\u2019s the cheapest, most powerful thing you can do.',
        },
      },
    ]
  }

  // parent
  return [
    {
      kicker: { ta: 'படி 1', en: 'Step 1' },
      title: {
        ta: 'உங்கள் குழந்தையின் வகுப்பு என்ன?',
        en: 'What class is your child in?',
      },
      body: {
        ta: '1ம் வகுப்பிலிருந்தே ஒலிம்பியாட்கள் உள்ளன. 6ம் வகுப்பு முதல் INSPIRE\u2013MANAK. ஒவ்வொரு வகுப்பிற்கும் பொருத்தமான போட்டிகள் வேறுபடும்.',
        en: 'There are Olympiads from Class 1 onwards. INSPIRE\u2013MANAK opens at Class 6. The right competition depends on the class.',
      },
    },
    {
      kicker: { ta: 'படி 2', en: 'Step 2' },
      title: {
        ta: 'செலவு இருக்கிறதா? அரசு போட்டிகள் முற்றிலும் இலவசம்.',
        en: 'Worried about cost? The government ones are completely free.',
      },
      body: {
        ta: 'INSPIRE, NCSC, RBVP, ATL \u2014 ரூபாய் கூட கட்டணம் இல்லை. SOF போன்ற தனியார் ரூ.125 வசூலிக்கின்றன. WRO, FLL \u2014 ரூ.6,000\u201318,000. பெரிய மூன்று அரசு போட்டிகளிலிருந்து தொடங்குங்கள்.',
        en: 'INSPIRE, NCSC, RBVP, ATL \u2014 zero fees. Private ones like SOF charge ~\u20b9125. WRO and FLL are \u20b96,000\u201318,000. Start with the big three government ones.',
      },
      facts: [
        { ta: '4 அரசு: இலவசம்', en: '4 govt: Free' },
        { ta: 'SOF: ~\u20b9125', en: 'SOF: ~\u20b9125' },
        { ta: 'WRO/FLL: \u20b96k+', en: 'WRO/FLL: \u20b96k+' },
      ],
    },
    {
      kicker: { ta: 'படி 3', en: 'Step 3' },
      title: {
        ta: 'பள்ளி வழியாக மட்டும் பதிவு',
        en: 'Most registrations happen only through the school.',
      },
      body: {
        ta: 'நீங்கள் நேரடியாக INSPIRE-ல் பதிவு செய்ய முடியாது. பள்ளி ஒருங்கிணைப்பாளர் பதிவு செய்ய வேண்டும். உங்கள் பள்ளி முதல்வருடன் பேச ஒரு சிறிய குறிப்பை எடுத்துச் செல்லுங்கள்.',
        en: 'You can\u2019t register directly \u2014 the school coordinator does it. Bring a short note to your principal.',
      },
    },
    {
      kicker: { ta: 'படி 4', en: 'Step 4' },
      title: {
        ta: 'முந்தைய ஆண்டு கேள்வித்தாள்கள் \u2014 இலவசமாக',
        en: 'Past-year question papers \u2014 free online.',
      },
      body: {
        ta: 'HBCSE (ஒலிம்பியாட்), NCERT (RBVP) \u2014 எல்லாமே பழைய கேள்வித்தாள்கள் வழங்குகின்றன. கோச்சிங் வகுப்பு எடுப்பதற்கு முன் உங்கள் குழந்தைக்கு இவற்றை கொடுத்துப் பாருங்கள்.',
        en: 'HBCSE (Olympiad) and NCERT (RBVP) publish past papers for free. Let your child try these before you pay for any coaching.',
      },
      actions: [
        {
          label: { ta: 'ஒலிம்பியாட் பக்கம்', en: 'See Olympiad page' },
          kind: 'secondary',
          href: '/competitions/nse-ino',
        },
      ],
    },
    {
      kicker: { ta: 'படி 5', en: 'Step 5' },
      title: {
        ta: 'ஒரு வெற்றியும், ஒரு தோல்வியும் \u2014 இரண்டுமே மதிப்புள்ளவை',
        en: 'A win and a loss both matter.',
      },
      body: {
        ta: 'போட்டி முடிவு முக்கியமில்லை \u2014 முயற்சி முக்கியம். உங்கள் குழந்தை முதல் முறை தோற்றால், அதை கொண்டாடுங்கள். அடுத்த முறை சிறப்பாக வரும்.',
        en: 'The result isn\u2019t what matters \u2014 the attempt is. If your child loses the first time, celebrate the attempt. The next one will go further.',
      },
      actions: [
        {
          label: { ta: '12 போட்டிகளையும் பார்', en: 'Browse all 12' },
          kind: 'primary',
          href: '/competitions',
        },
      ],
    },
  ]
}
