import * as z from 'zod'

export const PersonalDetailsSchema = z.object({
  name: z.string(),
  email: z.email(),
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  portfolioPage: z.string().url().optional()
})

export const WorkExperienceSchema = z.object({
  companyName: z.string(),
  date: z.string(),
  role: z.string(),
  description: z.array(z.string()).optional()
})

export const EducationSchema = z.object({
  school: z.string(),
  date: z.string(),
  degree: z.string()
})

export const SkillsSchema = z.array(z.string())

export const PersonaSchema = z.object({
  personal: PersonalDetailsSchema,
  work: z.array(WorkExperienceSchema),
  education: z.array(EducationSchema),
  skills: SkillsSchema
})

export type Persona = z.infer<typeof PersonaSchema>;

