import map from 'lodash/map';
import capitalize from 'lodash/capitalize';

export default function (str: string): string {
  // BGN/PCGN system (simplified), translation of geographical names
  const ru = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ы: 'y',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  };

  return map(str.replace(/[ъь]+/g, ''), char => {
    let letter = ru[char];

    if (letter) {
      return letter;
    }

    letter = ru[char.toLowerCase()];

    if (letter) {
      // handle two letters representing one sound appearing only in initial position
      return capitalize(letter === 'e' ? 'ye' : letter);
    }

    return char;
  }).join('');
}
