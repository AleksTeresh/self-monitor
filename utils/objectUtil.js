// copied from https://matthiashager.com/converting-snake-case-to-camel-case-object-keys-with-javascript
const toCamel = (s) => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

// adapted from https://matthiashager.com/converting-snake-case-to-camel-case-object-keys-with-javascript
const keysToCamel = (o) => {
  const n = {};
  Object.keys(o)
    .forEach((k) => {
      n[toCamel(k)] = o[k];
    });

  return n;
};

export { keysToCamel }
