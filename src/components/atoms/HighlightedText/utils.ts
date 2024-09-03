export const getTextParts = ({
  text,
  textWithMarkup,
  query,
}: {
  textWithMarkup: boolean;
  text: string;
  query?: string;
}) => {
  if (textWithMarkup) {
    const parts = text.split(/(<em>.*?<\/em>)/).filter(part => part);
    const htmlTagsRegex = /(<([^>]+)>|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;)/gi;

    return parts.map(part => ({
      partText: part.replace(/<\/?em>/g, '').replace(htmlTagsRegex, ''),
      isBold: /<em>.*<\/em>/.test(part),
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
