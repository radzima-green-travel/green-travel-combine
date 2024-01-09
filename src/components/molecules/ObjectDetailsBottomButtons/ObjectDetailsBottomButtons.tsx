import React, {memo, useMemo} from 'react';
import {Icon} from 'atoms';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {themeStyles} from './styles';
import {isIOS} from 'services/PlatformService';
import {TestIDs} from 'core/types';
import {ButtonsGroup} from '../ButtonsGroup';

interface IProps {
  onShowOnMapPress: () => void;
  onBookmarkPress: () => void;
  onSharePress: () => void;
  isFavorite: boolean;
  isFavoriteLoading: boolean;
  showOnMapButtonEnabled: boolean;
}

export const ObjectDetailsBottomButtons = memo(
  ({
    onSharePress,
    onBookmarkPress,
    onShowOnMapPress,
    isFavorite,
    isFavoriteLoading,
    showOnMapButtonEnabled,
  }: IProps) => {
    const {t} = useTranslation('objectDetails');
    const styles = useThemeStyles(themeStyles);

    const buttons = useMemo(() => {
      return [
        {
          onPress: onShowOnMapPress,
          theme: 'primary' as const,
          testID: TestIDs.SeeOnTheMapButton,
          text: t('seeOnTheMap'),
          disabled: !showOnMapButtonEnabled,
        },
        {
          onPress: onBookmarkPress,
          theme: 'secondary' as const,
          isIconOnlyButton: true,
          loading: isFavoriteLoading,
          testID: TestIDs.HeaderBookmarkButton,
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
          testID: TestIDs.HeaderShareButton,
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
