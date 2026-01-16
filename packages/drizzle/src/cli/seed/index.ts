import { program } from '../program';
import { createSeedFile } from './createSeedFile';

const seed = program
  .command('seed')
  .description('Create seed file for drizzle');

seed
  .command('create <name>')
  .option('-d, --dir <dir>', 'seed directory')
  .action(createSeedFile);
