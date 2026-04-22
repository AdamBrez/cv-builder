import { Command } from 'commander';
import inquirer from 'inquirer';
import { loadPersona } from '../core/parser';
import { readFile } from 'node:fs/promises';
import 'dotenv/config';
import { tailorCV } from '../ai/generator';
import { generatePdf } from '../core/pdf';

const program = new Command();

program
  .name('cv-builder')
  .description('CLI for build tailored CV to a job')
  .version('0.1.0')

program
  .command('generate')
  .description('Generate a tailored cv')
  .option('-p, --persona <path>', 'Path to your persona yaml file')
  .option('-j, --job <path>', 'Path to your job description text file')
  .action(async (options: { persona?: string, job?: string }) => {

    let personaPath: string | undefined = options.persona;
    let jobPath: string | undefined = options.job;

    // check if the user gave persona and job info, if not ask him to add it
    if (!personaPath || !jobPath) {
      console.log('Missing crucial data. Please add them')

      const answer = await inquirer.prompt([
        {
          type: 'input',
          name: 'persona',
          message: 'Where is your yaml persona file located?',
          default: './persona.example.yaml',
          when: !personaPath
        },
        {
          type: 'input',
          name: 'job',
          message: 'Where is your job description text file located?',
          default: './job.example.txt',
          when: !jobPath
        }
      ]);

      // update personaPath and jobPath with newly added info
      personaPath = personaPath || answer.persona;
      jobPath = jobPath || answer.job;
    }

    console.log('Initializing  CV generation')
    console.log('Persona is located at: ', personaPath);
    console.log('Job description is located at: ', jobPath);

    try {
      const persona = await loadPersona(personaPath!)
      console.log('Succesfully parsed the user persona file. Your name is: ', persona.personal.name)
      const jobDescription = await readFile(jobPath!, 'utf8')
      const tailoredCV = await tailorCV(persona, jobDescription);
      console.log(tailoredCV.work[0].description)
      const outputPath = './tailored_cv.pdf';
      await generatePdf(tailoredCV, outputPath);
      console.log(`Your tailored CV is ready at: ${outputPath}`);
    } catch (err) {
      console.error('Error occured while parsing the user yaml file: ', err)
    }
  });

program.parse()
