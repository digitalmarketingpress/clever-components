import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import path from 'path';
import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import { inputs, plugins } from './rollup-common.js';

const SOURCE_DIR = 'src';
const OUTPUT_DIR = 'cdn';
const VERSION_DIR = OUTPUT_DIR + '/' + pkg.version;

export default {
  input: inputs(SOURCE_DIR, (file) => {
    const { dir, name } = path.parse(file);
    const rawDir = path.relative(SOURCE_DIR, dir);
    const entryPath = path.join(pkg.version, rawDir, name);
    return [entryPath, file];
  }),
  treeshake: {
    moduleSideEffects: false,
  },
  output: {
    dir: OUTPUT_DIR,
    sourcemap: true,
    chunkFileNames: path.join(pkg.version, 'shared/[name]-[hash].js'),
  },
  plugins: [
    ...plugins(SOURCE_DIR, VERSION_DIR),
    // Remove moment.js form chart.js
    {
      load (id) {
        if (id.includes('/node_modules/moment/')) {
          return 'export default {}';
        }
      },
    },
    alias({
      entries: [{
        find: 'lit-html/lib/shady-render.js',
        replacement: 'node_modules/lit-html/lit-html.js'
      }]
    }),
    commonjs(),
    resolve(),
  ],
};
