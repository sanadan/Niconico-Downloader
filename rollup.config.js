import Rollup from './scripts/rollup/rollup';

const config = [
  {
    input: 'src/background/main.ts',
    output: {
      file: 'dist/background.js',
      format: 'es',
    },
  },
  {
    input: 'src/content_scripts/main.ts',
    output: {
      file: 'dist/content.js',
      format: 'es',
    },
  },
];

export default Rollup.run(config);
