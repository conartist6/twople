const mergeTrees = require('broccoli-merge-trees');
const funnel = require('broccoli-funnel');
const esTranspiler = require('broccoli-babel-transpiler');
const Rollup = require('broccoli-rollup');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');

let es = 'src';

let typedefs = new funnel('src', {
  include: ['**/*.d.ts'],
  getDestinationPath(relativePath) {
    return relativePath === 'twople.d.ts' ? 'index.d.ts' : relativePath;
  },
});

let bundledCJS = new Rollup(es, {
  rollup: {
    input: 'index.js',
    output: {
      file: 'index.js',
      format: 'cjs',
    },
    external: module => /^\w/.test(module),
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      commonjs({
        include: 'node_modules/**',
      }),
    ],
  },
});

module.exports = mergeTrees([bundledCJS, typedefs]);
