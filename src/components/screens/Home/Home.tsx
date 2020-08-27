import React, {useEffect, useCallback} from 'react';
import {SuspenseView} from 'atoms';
import {HomeSectionBar} from 'molecules';
import {FlatList} from 'react-native';

import {styles} from './styles';
import {getHomeDataRequest} from 'core/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {selectHomeData} from 'core/selectors';
import {useRequestError, useRequestLoading} from 'core/hooks';
import {SCREEN_NAMES} from 'navigation/constants';

export const Home = ({navigation: {navigate}}) => {
  const dispatch = useDispatch();

  const getData = useCallback(() => {
    dispatch(getHomeDataRequest());
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  const homeData = useSelector(selectHomeData);
  const loading = useRequestLoading(getHomeDataRequest);
  const {error} = useRequestError(getHomeDataRequest);

  const navigateToObjectsList = useCallback(
    ({data, title}) => {
      navigate(SCREEN_NAMES.objectsList, {data, title});
    },
    [navigate],
  );

  return (
    <SuspenseView loading={loading} error={error} retryCallback={getData}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        data={homeData}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => (
          <HomeSectionBar
            onAllPress={navigateToObjectsList}
            title={item.name}
            content={item.objects}
          />
        )}
      />
    </SuspenseView>
  );
};
