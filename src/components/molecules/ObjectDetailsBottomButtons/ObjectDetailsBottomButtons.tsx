/* eslint-disable react/no-unstable-nested-components */
import React, {memo, useMemo} from 'react';
import {Icon} from 'atoms';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {themeStyles} from './styles';
import {isIOS} from 'services/PlatformService';
import {ButtonsGroup} from '../ButtonsGroup';
import {composeTestID} from 'core/helpers';

interface IProps {
  onShowOnMapPress: () => void;
  onBookmarkPress: () => void;
  onSharePress: () => void;
  isFavorite: boolean;
  isFavoriteLoading: boolean;
  showOnMapButtonEnabled: boolean;
  testID: string;
}

export const ObjectDetailsBottomButtons = memo(
  ({
    onSharePress,
    onBookmarkPress,
    onShowOnMapPress,
    isFavorite,
    isFavoriteLoading,
    showOnMapButtonEnabled,
    testID,
  }: IProps) => {
    const {t} = useTranslation('objectDetails');
    const styles = useThemeStyles(themeStyles);

    const buttons = useMemo(() => {
      return [
        {
          onPress: onShowOnMapPress,
          theme: 'primary' as const,
          testID: composeTestID(testID, 'showOnMapButton'),
          text: t('seeOnTheMap'),
          disabled: !showOnMapButtonEnabled,
        },
        {
          onPress: onBookmarkPress,
          theme: 'secondary' as const,
          isIconOnlyButton: true,
          loading: isFavoriteLoading,
          testID: composeTestID(testID, 'bookmarkButton'),
          checked: isFavorite,
          icon: textStyle => (
            <Icon
              name={isFavorite ? 'bookmarkFilled' : 'bookmark'}
              size={24}
              style={textStyle}
            />
          ),
        },
        {
          onPress: onSharePress,
          theme: 'secondary' as const,
          isIconOnlyButton: true,
          testID: composeTestID(testID, 'shareButton'),

          icon: textStyle => (
            <Icon
              name={isIOS ? 'shareIos' : 'shareAndroid'}
              size={24}
              style={textStyle}
            />
          ),
        },
      ];
    }, [
      isFavorite,
      isFavoriteLoading,
      onBookmarkPress,
      onSharePress,
      onShowOnMapPress,
      showOnMapButtonEnabled,
      t,
      testID,
    ]);

    return (
      <ButtonsGroup
        containerStyle={styles.container}
        buttons={buttons}
        withShadow
      />
    );
  },
);
