import { readFile } from 'node:fs/promises';
import YAML from 'yaml'
import { Persona, PersonaSchema } from '../types/schema'

export async function loadPersona(filePath: string): Promise<Persona> {
  const fileContent: string = await readFile(filePath, 'utf8');
  const parsedYaml = YAML.parse(fileContent);
  return PersonaSchema.parse(parsedYaml);
}
