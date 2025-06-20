import {memoize} from 'lodash';

export const indexKeyExtractor = <T>(_: T, index: number) => String(index);

const createKeyExtractorBase =
  <T extends string>(attribute: T) =>
  (item: {[K in T]: string | number}) =>
    String(item?.[attribute] ?? '');

export const createKeyExtractor = memoize(createKeyExtractorBase);

export const idKeyExtractor = createKeyExtractor('id');
