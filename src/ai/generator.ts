import { generateObject } from "ai";
import { google } from '@ai-sdk/google';
import { PersonaSchema, Persona } from '../types/schema';
import 'dotenv/config';

export async function tailorCV(basePersona: Persona, jobDescription: string): Promise<Persona> {
  const { object: CV } = await generateObject({
    model: google('gemini-3-flash-preview'),
    schema: PersonaSchema,
    system: `You are an expert technical recruiter and CV writer. 
    Your goal is to take the candidate's yaml persona file which describes him and make a tailored cv that perfectly aligns with the provided job description.
    Rules:
    - Never invent fake experience, jobs, or degrees.
    - Tailor the bullet points to highlight keywords and requirements from the job description.
    - Sort candidates skills from most relevant to least relevant to the job.
    - Keep the output format strictly aligned to the requested JSON schema.`,
    prompt: `
    CANDIDATE BASE CV:
    ${JSON.stringify(basePersona, null, 2)}
    
    JOB DESCRIPTION:
    ${jobDescription}
    `
  });
  return CV;
}
