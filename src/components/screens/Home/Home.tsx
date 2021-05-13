import React, {useEffect, useCallback} from 'react';
import {RefreshPageReminder, SuspenseView} from 'atoms';
import {HomeSectionBar} from 'organisms';
import {FlatList} from 'react-native';

import {styles} from './styles';
import {getHomeDataRequest, checkHomeData} from 'core/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {selectHomeData, selectIsUpdatesAvailable} from 'core/selectors';
import {useRequestError, useRequestLoading} from 'core/hooks';
import {IProps} from './types';
import {useIsFocused} from '@react-navigation/core';

export const Home = ({navigation: {navigate}}: IProps) => {
  const dispatch = useDispatch();

  const homeData = useSelector(selectHomeData);
  const isUpdatesAvailable = useSelector(selectIsUpdatesAvailable);
  const isScreenFocused = useIsFocused();

  const getData = useCallback(() => {
    dispatch(getHomeDataRequest());
  }, [dispatch]);

  const loading = useRequestLoading(getHomeDataRequest);
  const {error} = useRequestError(getHomeDataRequest);

  useEffect(() => {
    if (isScreenFocused) {
      dispatch(checkHomeData());
    }
  }, [dispatch, isScreenFocused]);

  const navigateToObjectsList = useCallback(
    ({categoryId, title}: {categoryId: string; title: string}) => {
      navigate('ObjectsList', {categoryId, title});
    },
    [navigate],
  );

  const navigateToCategoriesList = useCallback(
    ({categoryId, title}: {categoryId: string; title: string}) => {
      navigate('CategoriesList', {categoryId, title});
    },
    [navigate],
  );

  const navigateToObjectDetails = useCallback(
    ({objectId}: {objectId: string}) => {
      navigate('ObjectDetails', {objectId});
    },
    [navigate],
  );

  return (
    <SuspenseView
      loading={!homeData && loading}
      error={homeData ? null : error}
      retryCallback={getData}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        data={homeData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <HomeSectionBar
            onObjectPress={navigateToObjectDetails}
            onCategoryPress={navigateToObjectsList}
            onAllObjectsPress={navigateToObjectsList}
            onAllCategoriesPress={navigateToCategoriesList}
            item={item}
          />
        )}
      />
      {isUpdatesAvailable ? <RefreshPageReminder onPress={getData} /> : null}
    </SuspenseView>
  );
};
