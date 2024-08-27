export const getTextParts = ({
  text,
  textWithMarkup,
  query,
}: {
  textWithMarkup?: string;
  text?: string;
  query?: string;
}) => {
  if (textWithMarkup) {
    const parts = textWithMarkup
      .split(/(<span>.*?<\/span>)/)
      .filter(part => part);
    return parts.map(part => ({
      partText: part.replace(/<\/?span>/g, ''),
      isBold: /<span>.*<\/span>/.test(part),
    }));
  }

  if (text && query) {
    const parts = text.split(new RegExp(`(${query})`, 'i'));
    return parts.map(part => ({
      partText: part,
      isBold: part.toLowerCase() === query.toLowerCase(),
    }));
  }

  return text ? [{partText: text, isBold: false}] : [];
};
