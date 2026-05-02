import { defineCollection } from 'astro:content'
import { z } from 'zod'
import { glob } from 'astro/loaders'

const bilingualString = z.object({
  ta: z.string(),
  en: z.string(),
})

const competitionsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/competitions' }),
  schema: z.object({
    // Identity
    id: z.string(),
    category: z.enum(['govt', 'ngo', 'olympiad', 'private', 'robotics', 'state']),
    status: z.enum(['open', 'upcoming', 'soon', 'closed']).optional(),
    name: bilingualString,
    shortName: bilingualString,

    // Eligibility & Fee
    eligibility: bilingualString,
    fee: bilingualString,
    schoolType: bilingualString,

    // Timing
    deadline: z.string(),
    deadlineLabel: bilingualString,
    annualTiming: bilingualString.optional(),

    // Freshness — date this competition was last cross-checked against its official source.
    // Updated by the cadence routines (manual/monthly/annual). Format: YYYY-MM-DD.
    last_verified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'last_verified must be YYYY-MM-DD'),

    // Descriptive
    summary: bilingualString,
    process: z.array(bilingualString),
    official: z.string(),
    organiser: bilingualString,

    // History & Reach
    since: z.string(),
    reach: z.object({
      label: bilingualString,
      schoolCount: z.string().optional(),
      schoolPercent: z.string().optional(),
    }),
    studentReach: bilingualString.optional(),

    // International Pathway
    intlPath: bilingualString,
    intlPathDetail: bilingualString.optional(),

    // Phases — powers CompetitionTimeline component
    phases: z.array(
      z.object({
        level: z.enum(['registration', 'district', 'state', 'national', 'international']),
        title: bilingualString,
        note: bilingualString.optional(),
        theme: bilingualString.optional(),
        abbr: z.array(z.object({ short: z.string(), full: z.string() })).optional(),
        months: z.array(z.number().min(0).max(11)),
      }),
    ),

    // TN Participation — powers TNParticipationBlock component
    tn: z
      .object({
        schools: z.string(),
        students: z.string(),
        districts: z.number(),
        sourceLabel: bilingualString,
        note: bilingualString,
        govtSchoolStatus: bilingualString.optional(),
        narrative: bilingualString.optional(),
        examples: z.array(
          z.object({
            district: bilingualString,
            schools: z.array(z.string()),
          }),
        ),
      })
      .optional(),

    sortOrder: z.number().optional(),

    // Role-specific guidance — Steps 1–4 are universal per role (in content.ts).
    // Step 5 is competition-specific and lives here per competition.
    roleGuide: z
      .object({
        teacher: z
          .object({
            step5: bilingualString,
            contact: bilingualString.optional(),
          })
          .optional(),
        principal: z
          .object({
            step5: bilingualString,
          })
          .optional(),
        parent: z
          .object({
            step5: bilingualString,
          })
          .optional(),
      })
      .optional(),
  }),
})

export const collections = {
  competitions: competitionsCollection,
}
