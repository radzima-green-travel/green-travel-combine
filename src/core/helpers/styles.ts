import {NamedThemeStyles} from '../types/styles';

export function createThemeStyles<
  T extends NamedThemeStyles<T> | NamedThemeStyles<any>,
>(styles: T | NamedThemeStyles<T>): T {
  return styles as T;
}
