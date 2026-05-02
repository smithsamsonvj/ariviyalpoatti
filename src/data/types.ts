export interface Bilingual {
  ta: string
  en: string
}

export interface Phase {
  level: 'registration' | 'district' | 'state' | 'national' | 'international'
  title: Bilingual
  note?: Bilingual
  months: number[]
}

export interface TNExample {
  district: Bilingual
  schools: string[]
}

export interface TNParticipation {
  schools: string
  students: string
  districts: number
  sourceLabel: Bilingual
  note: Bilingual
  govtSchoolStatus?: Bilingual
  narrative?: Bilingual
  examples: TNExample[]
}

export interface CompetitionReach {
  label: Bilingual
  schoolCount?: string
  schoolPercent?: string
}

export type CompetitionCategory = 'govt' | 'ngo' | 'olympiad' | 'private' | 'robotics' | 'state'

export type CompetitionStatus = 'open' | 'upcoming' | 'soon' | 'closed'

export interface RoleGuideEntry {
  step5: Bilingual
  contact?: Bilingual
}

export interface RoleGuide {
  teacher?: RoleGuideEntry
  principal?: { step5: Bilingual }
  parent?: { step5: Bilingual }
}
