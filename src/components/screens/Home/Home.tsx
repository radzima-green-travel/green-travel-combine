import React, {useEffect, useCallback, ComponentProps} from 'react';
import {SuspenseView} from 'atoms';
import {HomeSectionBar} from 'molecules';
import {FlatList} from 'react-native';

import {styles} from './styles';
import {getHomeDataRequest} from 'core/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {selectHomeData} from 'core/selectors';
import {
  useRequestError,
  useRequestLoading,
  useToggleFavorite,
} from 'core/hooks';
import {IProps} from './types';

export const Home = ({navigation: {navigate}}: IProps) => {
  const dispatch = useDispatch();

  const homeData = useSelector(selectHomeData);
  const getData = useCallback(() => {
    dispatch(getHomeDataRequest());
  }, [dispatch]);
  const loading = useRequestLoading(getHomeDataRequest);
  const {error} = useRequestError(getHomeDataRequest);

  useEffect(() => {
    getData();
  }, [getData]);

  const navigateToObjectsList: ComponentProps<
    typeof HomeSectionBar
  >['onAllPress'] = useCallback(
    ({categoryId, title}) => {
      navigate('ObjectsList', {categoryId, title});
    },
    [navigate],
  );

  const navigateToObjectDetails: ComponentProps<
    typeof HomeSectionBar
  >['onItemPress'] = useCallback(
    ({categoryId, objectId}) => {
      navigate('ObjectDetails', {categoryId, objectId});
    },
    [navigate],
  );

  const toggleFavorite = useToggleFavorite();

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
        keyExtractor={(item) => item._id}
        renderItem={({item}) => (
          <HomeSectionBar
            onItemPress={navigateToObjectDetails}
            onAllPress={navigateToObjectsList}
            item={item}
            onIsFavoriteChange={toggleFavorite}
          />
        )}
      />
    </SuspenseView>
  );
};
