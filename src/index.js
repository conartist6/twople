import * as t from './twople';

const entry = t.entry;

for (const fnName of Object.keys(t)) {
  if (fnName !== 'default') {
    entry[fnName] = t[fnName];
  }
}

export default entry;
