import path from 'path';
import license from 'rollup-plugin-license';
import strip from 'rollup-plugin-strip';
import typescript from 'rollup-plugin-typescript2';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import options from './uglify';

export default class Rollup {
  static run(config) {
    return config.map(task => Rollup.addPlugins(task));
  }
  static addPlugins(task) {
    const rollup = task;
    if (!rollup.plugins) {
      rollup.plugins = [];
    }
    rollup.plugins.push(typescript());

    if (process.env.NODE_ENV === 'production') {
      rollup.plugins.push(strip());
      rollup.plugins.push(uglify(options, minify));
      rollup.plugins.push(license({
        banner: {
          file: path.join(__dirname, 'scripts/License Header'),
          encoding: 'utf-8',
        },
      }));

    }

    if (process.env.NODE_ENV === 'development') {
      rollup.output.sourcemap = 'inline';
    }
    return rollup;
  }
}
