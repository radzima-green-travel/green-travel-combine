import React, {useCallback} from 'react';
import {View} from 'react-native';
import {GeneralListItem} from 'molecules';
import {Icon, SettingsSectionTitle} from 'atoms';
import {screenOptions} from './screenOptions';
import {useNavigation} from '@react-navigation/native';
import {ProfileScreenNavigationProps} from './types';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {themeStyles} from './styles';
import {useSelector} from 'react-redux';
import {selectUserAuthorized, selectUserEmail} from 'core/selectors';

export const Profile = () => {
  const styles = useThemeStyles(themeStyles);
  const navigation = useNavigation<ProfileScreenNavigationProps>();
  const {t} = useTranslation('profile');
  const isAuthorized = useSelector(selectUserAuthorized);
  const userEmail = useSelector(selectUserEmail);

  const onAuthorisationItemPress = useCallback(() => {
    if (isAuthorized) {
      navigation.navigate('ProfileDetails');
    } else {
      navigation.navigate('AuthNavigator', {
        screen: 'CheckEmail',
      });
    }
  }, [isAuthorized, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.authItemContainer}>
        <GeneralListItem
          size="M"
          onPress={onAuthorisationItemPress}
          title={
            isAuthorized ? t('authorized.title') : t('notAuthorrized.title')
          }
          subtitle={isAuthorized ? userEmail : t('notAuthorrized.subtitle')}
          renderLeftElement={<Icon name="defaultAcc" size={60} />}
        />
      </View>

      <SettingsSectionTitle text="Настройки" />
      <GeneralListItem
        position="top"
        onPress={() => {}}
        title="Данные и память"
        renderLeftElement={<Icon name="memoryNData" size={30} />}
      />
      <GeneralListItem
        position="middle"
        onPress={() => {}}
        title="Язык"
        renderLeftElement={<Icon name="language" size={30} />}
      />
      <GeneralListItem
        position="bottom"
        onPress={() => {}}
        title="Тема"
        renderLeftElement={<Icon name="theme" size={30} />}
      />
    </View>
  );
};

Profile.screenOptions = screenOptions;
