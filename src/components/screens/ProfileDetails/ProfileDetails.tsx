import React, {useCallback} from 'react';
import {View} from 'react-native';
import {GeneralListItem} from 'molecules';
import {Icon} from 'atoms';
import {screenOptions} from './screenOptions';
import {useNavigation} from '@react-navigation/native';
import {ProfileDetailsScreenNavigationProps} from './types';
import {
  useOnRequestSuccess,
  useRequestLoading,
  useThemeStyles,
  useTranslation,
} from 'core/hooks';
import {themeStyles} from './styles';
import {useDispatch} from 'react-redux';
import {deleteUserRequest, signOutRequest} from 'core/reducers';

export const ProfileDetails = () => {
  const styles = useThemeStyles(themeStyles);
  const {t} = useTranslation('profile');
  const dispatch = useDispatch();
  const navigation = useNavigation<ProfileDetailsScreenNavigationProps>();
  const {loading} = useRequestLoading(signOutRequest);
  const {loading: deleting} = useRequestLoading(deleteUserRequest);
  const onSignOutPress = useCallback(() => {
    dispatch(signOutRequest());
  }, [dispatch]);

  const onDeleteUserPress = useCallback(() => {
    dispatch(deleteUserRequest());
  }, [dispatch]);

  useOnRequestSuccess(signOutRequest, () => {
    navigation.goBack();
  });

  useOnRequestSuccess(deleteUserRequest, () => {
    navigation.goBack();
  });

  return (
    <View style={styles.container}>
      <GeneralListItem
        loading={loading}
        position="single"
        onPress={onSignOutPress}
        title="Выйти"
        renderLeftElement={<Icon name="theme" size={30} />}
      />
      <GeneralListItem
        loading={deleting}
        position="single"
        onPress={onDeleteUserPress}
        title="Удалить"
        renderLeftElement={<Icon name="theme" size={30} />}
      />
    </View>
  );
};

ProfileDetails.screenOptions = screenOptions;
