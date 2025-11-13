import React, { memo, useCallback } from 'react';

import { HighlightedText } from 'atoms';
import { themeStyles } from './styles';
import { useThemeStyles } from 'core/hooks';
import { ListItem } from '../ListItem';
import { TextProps } from 'react-native';
import { trim } from 'lodash';
import { IconsNames } from 'atoms/Icon';

interface IProps<T> {
  item: T;
  objectName: string;
  categoryName: string;
  categoryIcon: IconsNames;
  description?: string;
  address?: string;
  onPress: (item: T) => void;
  testID: string;
  withRemoveButton?: boolean;
  withIconBackground?: boolean;
  onRemovePress?: (item: T) => void;
}

const SearchListItemComponent = <T,>({
  item,
  objectName,
  categoryName,
  categoryIcon,
  description,
  address,
  testID,
  onPress,
  withRemoveButton = false,
  withIconBackground = true,
  onRemovePress,
}: IProps<T>) => {
  const styles = useThemeStyles(themeStyles);

  const onPressHandler = useCallback(() => {
    onPress(item);
  }, [onPress, item]);

  const onRemovePressHandler = useCallback(() => {
    onRemovePress?.(item);
  }, [onRemovePress, item]);

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
      leadIcon={categoryIcon}
      leadIconStyle={styles.leadIconStyle}
      leadIconContainerStyle={
        withIconBackground ? styles.iconContainer : undefined
      }
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
      subtitle={categoryName + (subtitlePostfix ? ` · ${subtitlePostfix}` : '')}
      boldTitle={false}
    />
  );
};

export const SearchListItem = memo(
  SearchListItemComponent,
) as typeof SearchListItemComponent;
