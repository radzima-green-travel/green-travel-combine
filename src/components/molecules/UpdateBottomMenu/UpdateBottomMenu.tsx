import React, {memo} from 'react';
import {View} from 'react-native';
import {Button} from 'atoms';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {themeStyles} from './styles';
import {UpdateView} from 'molecules';
import {composeTestID} from 'core/helpers';

interface UpdateBottomMenuProps {
  onUpdate: () => void;
  onRemind: () => void;
  onSkip: () => void;
  bottomInset: number;
  testID: string;
}

export const UpdateBottomMenu = memo(
  ({
    onUpdate,
    onRemind,
    onSkip,
    bottomInset,
    testID,
  }: UpdateBottomMenuProps) => {
    const {t} = useTranslation('updateVersion');
    const styles = useThemeStyles(themeStyles);

    return (
      <View style={[styles.container, {paddingBottom: bottomInset}]}>
        <UpdateView
          title={t('updateAvailable')}
          subTitle={t('improveWork')}
          subTitleStyle={styles.subTitle}
          buttonText={t('updateApp')}
          onUpdate={onUpdate}
          testID={composeTestID(testID, 'updateView')}
        />
        <Button
          textStyle={styles.buttonText}
          theme={'secondary'}
          onPress={onRemind}
          text={t('remindLater')}
          style={styles.button}
          testID={composeTestID(testID, 'remindLaterButton')}
        />
        <Button
          textStyle={styles.buttonText}
          theme={'secondary'}
          onPress={onSkip}
          text={t('dontUpdate')}
          style={styles.button}
          testID={composeTestID(testID, 'dontUpdateButton')}
        />
      </View>
    );
  },
);
