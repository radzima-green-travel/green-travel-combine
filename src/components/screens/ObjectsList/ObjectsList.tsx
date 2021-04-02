import React, {useLayoutEffect, useMemo, useCallback} from 'react';
import {FlatList} from 'react-native';
import {ObjectCard} from 'molecules';
import {styles} from './styles';
import {IProps} from './types';

import {useCategoryObjects} from 'core/hooks';
import {SCREEN_WIDTH} from 'services/PlatformService';
import {PADDING_HORIZONTAL} from 'core/constants';
import {IExtendedObject} from 'core/types';
import {debounce} from 'lodash';
const cardWidth = SCREEN_WIDTH - PADDING_HORIZONTAL * 2;
export const ObjectsList = ({
  route,
  navigation: {setOptions, push},
}: IProps) => {
  const {
    params: {categoryId, title},
  } = route;

  const listData = useCategoryObjects(categoryId);

  const navigateToObjectDetails = useCallback(
    ({_id}: IExtendedObject) => {
      push('ObjectDetails', {objectId: _id});
    },
    [push],
  );

  const navigateToObjectDetailsDebounced = useMemo(
    () =>
      debounce(navigateToObjectDetails, 300, {leading: true, trailing: false}),
    [navigateToObjectDetails],
  );

  useLayoutEffect(() => {
    setOptions({
      title: title,
    });
  }, [setOptions, title]);

  return (
    <FlatList
      data={listData}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={item => item._id}
      renderItem={({item}) => (
        <ObjectCard
          onPress={navigateToObjectDetailsDebounced}
          containerStyle={styles.cardContainer}
          data={item}
          width={cardWidth}
        />
      )}
    />
  );
};
