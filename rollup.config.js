import Rollup from './scripts/rollup/rollup';

const config = [
  {
    input: 'src/background/index.ts',
    output: {
      file: 'dist/background.js',
      format: 'es',
    },
  },
  {
    input: 'src/content_scripts/index.ts',
    output: {
      file: 'dist/content.js',
      format: 'es',
    },
  },
];

export default Rollup.run(config);
