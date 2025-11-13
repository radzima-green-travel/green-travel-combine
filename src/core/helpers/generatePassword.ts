import { shuffle } from 'lodash';

export function generatePassword(passwordLength: number) {
  const numberChars = '0123456789';
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const specialSymbols = '~`!@#$%^&*()+=_-{}|:;”’?/<>';
  const allChars = numberChars + upperChars + lowerChars + specialSymbols;
  let randPasswordArray = Array(passwordLength);
  randPasswordArray[0] = numberChars;
  randPasswordArray[1] = upperChars;
  randPasswordArray[2] = lowerChars;
  randPasswordArray = randPasswordArray.fill(allChars, 3);
  return shuffle(
    randPasswordArray.map(function (x) {
      return x[Math.floor(Math.random() * x.length)];
    }),
  ).join('');
}
