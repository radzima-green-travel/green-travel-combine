const badgeTextSplitRegex = /(\*\*.*?\*\*)/;

export const parseTitleLine = (inputString: string) =>
  inputString.split(badgeTextSplitRegex).reduce(
    (chunks, part) => {
      if (!part) {
        return chunks;
      }

      if (part.startsWith('**') && part.endsWith('**')) {
        chunks.push({text: part.slice(2, -2), highlighted: true});
      } else {
        chunks.push({text: part, highlighted: false});
      }

      return chunks;
    },
    [] as Array<{text: string; highlighted: boolean}>,
  );
