import React, {useEffect, useCallback, ComponentProps} from 'react';
import {SuspenseView} from 'atoms';
import {HomeSectionBar} from 'molecules';
import {FlatList} from 'react-native';

import {styles} from './styles';
import {getHomeDataRequest, addToBookmarksRequest} from 'core/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {selectHomeData} from 'core/selectors';
import {useRequestError, useRequestLoading} from 'core/hooks';
import {IProps} from './types';

export const Home = ({navigation: {navigate}}: IProps) => {
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

  const navigateToObjectsList: ComponentProps<
    typeof HomeSectionBar
  >['onAllPress'] = useCallback(
    ({categoryId, title}) => {
      navigate('ObjectsList', {categoryId, title});
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
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        data={homeData}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => (
          <HomeSectionBar
            onItemPress={navigateToPlaceDetails}
            onAllPress={navigateToObjectsList}
            title={item.name}
            content={item.objects}
            categoryId={item._id}
            addToFavorite={addToFavorite}
          />
        )}
      />
    </SuspenseView>
  );
};
