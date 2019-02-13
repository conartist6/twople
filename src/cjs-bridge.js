import entry, * as t from './twople';

/**
 * This is a bit tricky because entry needs to have a clean syntax both when used
 * in CJS, and when used as an esModule. We want to support a variety of sytaxes
 * ```
 *   import entry, {isEntry} from 'twople'
 *   // or
 *   const entry = require('tuple')
 *   // or
 *   const { entry, isEntry } = require('tuple')
 * ```
 * In order to do this we make the module itself a function with properties
 */
entry.__esModule = true;

Object.assign(entry, t);
Object.freeze(entry);

module.exports = entry;
