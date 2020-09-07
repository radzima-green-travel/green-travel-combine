import React, {useLayoutEffect} from 'react';
import {FlatList, Text} from 'react-native';
import {ObjectCard} from 'atoms';
import {styles} from './styles';
import {IProps} from './types';

export const ObjectsList = ({route, navigation: {setOptions}}: IProps) => {
  const {
    params: {data, title},
  } = route;

  useLayoutEffect(() => {
    setOptions({
      title: title,
    });
  }, [setOptions, title]);

  return (
    <FlatList
      data={data}
      contentContainerStyle={styles.contentContainer}
      ListHeaderComponent={<Text style={styles.listTitle}>{title}</Text>}
      keyExtractor={(item) => item._id}
      renderItem={({item}) => (
        <ObjectCard containerStyle={styles.cardContainer} data={item} />
      )}
    />
  );
};
