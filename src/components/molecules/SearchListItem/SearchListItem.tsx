import React, {memo, useCallback} from 'react';

import {HighlightedText} from 'atoms';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
import {ICONS_MATCHER} from 'core/constants';
import {ListItem} from '../ListItem';

interface IProps {
  objectName: string;
  categoryName: string;
  categoryIcon: string;
  description?: string;
  objectId: string;
  onPress: (objectId: string) => void;
  testID: string;
  withRemoveButton?: boolean;
  onRemovePress?: (objectId: string) => void;
}

export const SearchListItem = memo(
  ({
    objectName,
    categoryName,
    categoryIcon,
    description,
    objectId,
    testID,
    onPress,
    withRemoveButton = false,
    onRemovePress,
  }: IProps) => {
    const styles = useThemeStyles(themeStyles);

    const onPressHandler = useCallback(() => {
      onPress(objectId);
    }, [onPress, objectId]);

    const onRemovePressHandler = useCallback(() => {
      onRemovePress?.(objectId);
    }, [onRemovePress, objectId]);

    return (
      <ListItem
        leadIcon={ICONS_MATCHER[categoryIcon]}
        leadIconStyle={styles.leadIconStyle}
        leadIconContainerStyle={styles.iconContainer}
        testID={testID}
        type="primary"
        onPress={onPressHandler}
        titleNumberOfLines={2}
        subTitleNumberOfLines={2}
        containerStyle={styles.container}
        title={objectName}
        renderTitle={props => <HighlightedText {...props} textWithMarkup />}
        tailIcon={withRemoveButton ? 'close' : undefined}
        tailIconStyle={styles.tailIconStyle}
        onRightLabelPress={onRemovePressHandler}
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
  },
);
