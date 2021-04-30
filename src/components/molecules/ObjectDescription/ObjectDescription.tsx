import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import HTML from 'react-native-render-html';
import {themeStyles} from './styles';
interface IProps {
  description: string;
}

export const ObjectDescription = memo(({description}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  return (
    <HTML
      containerStyle={styles.container}
      html={description}
      ignoredStyles={[
        'font-family',
        'width',
        'height',
        'background-color',
        'color',
      ]}
      // ignoredTags={[]}

      tagsStyles={{
        h1: styles.headline,
        h2: styles.headline,
        p: styles.text,
        span: styles.text,
      }}
    />
  );
});
