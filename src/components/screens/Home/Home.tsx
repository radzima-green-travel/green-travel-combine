import React, {useEffect, useCallback} from 'react';
import {SuspenseView} from 'atoms';
import {HomeSectionBar} from 'organisms';
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
    ({categoryId, objectId}: {categoryId: string; objectId: string}) => {
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
            onObjectPress={navigateToObjectDetails}
            onCategoryPress={navigateToObjectsList}
            onAllObjectsPress={navigateToObjectsList}
            onAllCategoriesPress={navigateToCategoriesList}
            item={item}
            onIsFavoriteChange={toggleFavorite}
          />
        )}
      />
    </SuspenseView>
  );
};
