import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import {AnimatedCircleButton, ButtonsGroup, ListItem} from 'molecules';
import {useOnRequestSuccess, useThemeStyles, useTranslation} from 'core/hooks';
import {MARGIN_TOP, themeStyles} from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {useObjectDetailsAddInfo} from './hooks';
import {ObjectDetailsAddInfoMenu} from 'organisms';
import {ObjectField} from 'core/constants';
import {BottomMenu} from 'atoms';
import {ConfirmMenu} from 'molecules';
import {sendAddInfoEmailRequest} from 'core/reducers';
import {selectForPlatform} from 'services/PlatformService';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ICONS_MAP = {
  [ObjectField.workingHours]: 'clock',
  [ObjectField.phoneNumber]: 'telephone',
  [ObjectField.attendanceTime]: 'clockHistory',
  [ObjectField.childServices]: 'sportsTennis',
  [ObjectField.accommodationPlace]: 'hotel',
  [ObjectField.dinnerPlaces]: 'restaurant',
  [ObjectField.renting]: 'deck',
  [ObjectField.upcomingEvents]: 'calendar',
};

export const ObjectDetailsAddInfo = () => {
  const {t} = useTranslation('objectDetailsAddInfo');
  const styles = useThemeStyles(themeStyles);
  const {top} = useSafeAreaInsets();
  const {
    name,
    navigateBack,
    addInfoMenuProps,
    toggleMenu,
    incompleteFields,
    currentField,
    onChange,
    value,
    isFormValid,
    getDisplayValue,
    onSendPress,
    isSendLoading,
    snackBarProps,
    onBackPress,
    confirmMenuProps,
    onConfirmMenuConfirmPress,
    onConfirmMenuDeclinePress,
    onMenuHideEnd,
    saveCurrentFieldValueForAnalytics,
  } = useObjectDetailsAddInfo();

  const buttons = useMemo(() => {
    return [
      {
        onPress: onSendPress,
        theme: 'primary' as const,
        testID: 'addInfoSubmitButton',
        text: t('send'),
        loading: isSendLoading,
        disabled: !isFormValid,
      },
    ];
  }, [isFormValid, isSendLoading, onSendPress, t]);

  useOnRequestSuccess(sendAddInfoEmailRequest, navigateBack);
  const {bottom} = useSafeAreaInsets();

  return (
    <View
      style={styles.container}
      pointerEvents={isSendLoading ? 'none' : 'auto'}>
      <View
        style={[
          styles.header,
          selectForPlatform(
            {marginTop: MARGIN_TOP},
            {marginTop: Math.max(top, MARGIN_TOP * 2)},
          ),
        ]}>
        <AnimatedCircleButton
          icon={{name: 'chevronMediumLeft'}}
          testID={'backButton'}
          onPress={onBackPress}
        />
      </View>
      {!!name && (
        <>
          <Text style={styles.title}>
            <Text>{`${t('headerTitle')} `}</Text>
            <Text style={styles.objectName}>{name}</Text>
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}>
            {incompleteFields.map(field => (
              <ListItem
                type='primary'
                key={field.id}
                testID={'item'}
                subtitle={getDisplayValue(field.id)}
                leadIcon={ICONS_MAP[field.id]}
                title={field.label}
                onPress={() => toggleMenu(field)}
                tailIcon="chevronMediumRight"
              />
            ))}
          </ScrollView>
          {currentField ? (
            <ObjectDetailsAddInfoMenu
              currentField={currentField}
              onHideEnd={onMenuHideEnd}
              testID="addInfoMenu"
              addInfoMenuProps={addInfoMenuProps}
              onChange={onChange}
              value={value}
              snackBarProps={snackBarProps}
              onInputValueChange={saveCurrentFieldValueForAnalytics}
            />
          ) : null}
        </>
      )}
      <ButtonsGroup
        bottomInset={bottom}
        buttons={buttons}
        containerStyle={styles.buttonContainer}
      />
      <BottomMenu withBackdrop testID={'bottomMenu'} {...confirmMenuProps}>
        <ConfirmMenu
          testID={'confirmMenu'}
          title={t('confirmAddedInfoTitle')}
          subtitle={t('confirmAddedInfoSubtitle')}
          buttonConfirmText={t('confirmAddedInfoSubmit')}
          buttonDeclineText={t('confirmAddedInfoDecline')}
          onConfirmPress={onConfirmMenuConfirmPress}
          onDeclinePress={onConfirmMenuDeclinePress}
        />
      </BottomMenu>
    </View>
  );
};
