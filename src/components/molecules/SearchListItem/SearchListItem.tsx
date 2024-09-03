import React, {memo, useCallback} from 'react';

import {HighlightedText} from 'atoms';
import {themeStyles} from './styles';
import {useThemeStyles, useColorScheme} from 'core/hooks';
import {SearchObject} from 'core/types';
import {DARK_ICONS_MATCHER, ICONS_MATCHER} from 'core/constants';
import {ListItem} from '../ListItem';

interface IProps {
  data: SearchObject;
  onPress: (item: SearchObject) => void;
  testID: string;
}

export const SearchListItem = memo(({data, testID, onPress}: IProps) => {
  const {
    name,
    category: {icon, name: categoryName},
    description,
  } = data;

  const styles = useThemeStyles(themeStyles);
  const colorScheme = useColorScheme();

  const onPressHandler = useCallback(() => {
    onPress(data);
  }, [onPress, data]);

  return (
    <ListItem
      leadIcon={
        colorScheme === 'light' ? ICONS_MATCHER[icon] : DARK_ICONS_MATCHER[icon]
      }
      leadIconContainerStyle={styles.iconContainer}
      testID={testID}
      type="primary"
      onPress={onPressHandler}
      titleNumberOfLines={2}
      subTitleNumberOfLines={2}
      containerStyle={styles.container}
      title={name}
      renderTitle={props => <HighlightedText {...props} textWithMarkup />}
      renderSubtitle={props => (
        <HighlightedText
          {...props}
          textWithMarkup
          boldTextStyle={styles.subtitleHighlight}
        />
      )}
      subtitle={categoryName + (description ? ` · ${description}` : '')}
      boldTitle={false}
    />
  );
});
