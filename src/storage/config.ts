export default {
  operations: {
    get: 'getItem',
    set: 'setItem',
    remove: 'removeItem',
    merge: 'mergeItem',
    multiRemove: 'multiRemove',
  },
  paramsOrderPattern: { key: 0, value: 1, cb: 2 },
};
