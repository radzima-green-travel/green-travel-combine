import React, {useEffect, useCallback, ComponentProps} from 'react';
import {SuspenseView} from 'atoms';
import {HomeSectionBar} from 'molecules';
import {FlatList} from 'react-native';

import {styles} from './styles';
import {getHomeDataRequest, addToBookmarksRequest} from 'core/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {selectHomeData, selectSavedBookmarksIds} from 'core/selectors';
import {useRequestError, useRequestLoading} from 'core/hooks';
import {IProps} from './types';
import {getCategoriesList} from 'api/native';

export const Home = ({navigation: {navigate}}: IProps) => {
  const dispatch = useDispatch();

  const getData = useCallback(() => {
    dispatch(getHomeDataRequest());
  }, [dispatch]);

  useEffect(() => {
    getCategoriesList().then(console.log);
    getData();
  }, [getData]);

  const homeData = useSelector(selectHomeData);
  const savedBookmarksIds = useSelector(selectSavedBookmarksIds);
  const loading = useRequestLoading(getHomeDataRequest);
  const {error} = useRequestError(getHomeDataRequest);

  const navigateToObjectsList: ComponentProps<
    typeof HomeSectionBar
  >['onAllPress'] = useCallback(
    ({data, title}) => {
      navigate('ObjectsList', {data, title});
    },
    [navigate],
  );

  const navigateToPlaceDetails: ComponentProps<
    typeof HomeSectionBar
  >['onItemPress'] = useCallback(() => {
    navigate('PlaceDetails');
  }, [navigate]);

  const addToFavorite = useCallback(
    (data) => {
      dispatch(addToBookmarksRequest(data));
    },
    [dispatch],
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
            onItemPress={navigateToPlaceDetails}
            onAllPress={navigateToObjectsList}
            title={item.name}
            content={item.items}
            categoryId={item._id}
            addToFavorite={addToFavorite}
            favoritesObjects={
              savedBookmarksIds ? savedBookmarksIds[item._id] : null
            }
          />
        )}
      />
    </SuspenseView>
  );
};
