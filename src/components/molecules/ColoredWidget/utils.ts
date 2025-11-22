const badgeTextSplitRegex = /(<em>.*?<\/em>)/;

export const parseTitleLine = (inputString: string) =>
  inputString.split(badgeTextSplitRegex).reduce(
    (chunks, part) => {
      if (!part) {
        return chunks;
      }

      if (part.startsWith('<em>') && part.endsWith('</em>')) {
        chunks.push({ text: part.slice(4, -5), highlighted: true });
      } else {
        chunks.push({ text: part, highlighted: false });
      }

      return chunks;
    },
    [] as { text: string; highlighted: boolean }[],
  );
