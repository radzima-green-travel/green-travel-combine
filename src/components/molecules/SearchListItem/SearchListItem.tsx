import React, {memo, useCallback} from 'react';

import {HighlightedText} from 'atoms';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
import {ICONS_MATCHER} from 'core/constants';
import {ListItem} from '../ListItem';
import {TextProps} from 'react-native';
import {trim} from 'lodash';

interface IProps {
  objectName: string;
  categoryName: string;
  categoryIcon: string;
  description?: string;
  address?: string;
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
    address,
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

    const descriptionWithTruncate = description
      ? `...${trim(description)}...`
      : '';

    const subtitlePostfix = address || descriptionWithTruncate;

    const renderSubtitle = (props: TextProps) => {
      if (address && descriptionWithTruncate) {
        return (
          <>
            <HighlightedText
              {...props}
              textWithMarkup
              numberOfLines={1}
              boldTextStyle={styles.subtitleHighlight}>
              {categoryName + ` · ${address}`}
            </HighlightedText>
            <HighlightedText
              {...props}
              textWithMarkup
              numberOfLines={2}
              boldTextStyle={styles.subtitleHighlight}>
              {` · ${descriptionWithTruncate}`}
            </HighlightedText>
          </>
        );
      }

      return (
        <HighlightedText
          {...props}
          textWithMarkup
          boldTextStyle={styles.subtitleHighlight}
        />
      );
    };
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
        renderSubtitle={renderSubtitle}
        subtitle={
          categoryName + (subtitlePostfix ? ` · ${subtitlePostfix}` : '')
        }
        boldTitle={false}
      />
    );
  },
);
