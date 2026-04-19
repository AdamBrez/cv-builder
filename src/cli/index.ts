import { Command } from 'commander';
import inquirer from 'inquirer';
import { string } from 'zod';

const program = new Command();

program
  .name('cv-builder')
  .description('CLI for build tailored CV to a job')
  .version('0.1.0.')

program
  .command('generate')
  .description('Generate a tailored cv')
  .option('-p, --persona <path>', 'Path to your persona yaml file')
  .option('-j, --job <path>', 'Path to your job description text file')
  .action(async (options: { persona: string, job: string }) => {

    // CHECK: if this type declaration won't cause trouble
    let personaPath: string = options.persona;
    let jobPath: string = options.job;

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
          default: './job.txt',
          when: !jobPath
        }
      ]);

      // update personaPath and jobPath with newly added info
      personaPath = personaPath || answer.persona;
      jobPath = jobPath || answer.job;
    }

    console.log('Initializing  CV generation')
    console.log('Persona is located: ', personaPath);
    console.log('Job description is located: ', jobPath);

    // TODO: plug in the yaml parse here

  });

program.parse()
