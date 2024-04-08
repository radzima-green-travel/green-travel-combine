import React, {memo} from 'react';
import {ObjectBelongsToItem} from 'molecules';
import {View, Text, ScrollView} from 'react-native';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
import {IBelongsTo} from 'core/types';
import {composeTestID, getPlatformsTestID} from 'core/helpers';

interface IProps {
  data: IBelongsTo[];
  onBelongsToItemPress: (config: {id: string; name: string}) => void;
  title: string;
  testID: string;
}

export const ObjectBelongsTo = memo(
  ({data, title, onBelongsToItemPress, testID}: IProps) => {
    const styles = useThemeStyles(themeStyles);

    const renderItems = () => {
      if (data.length === 1) {
        return (
          <View style={styles.listContainer}>
            <ObjectBelongsToItem
              key={data[0].objectId}
              onPress={onBelongsToItemPress}
              data={data[0]}
              testID={composeTestID(testID, 'item')}
            />
          </View>
        );
      }

      return (
        <ScrollView horizontal contentContainerStyle={styles.listContainer}>
          {data.map(item => (
            <View style={styles.listItem} key={item.objectId}>
              <ObjectBelongsToItem
                onPress={onBelongsToItemPress}
                data={item}
                testID={composeTestID(testID, 'item')}
              />
            </View>
          ))}
        </ScrollView>
      );
    };
    return (
      <View {...getPlatformsTestID(testID)} style={styles.container}>
        <Text
          style={styles.title}
          {...getPlatformsTestID(composeTestID(testID, 'title'))}>
          {title}
        </Text>
        {renderItems()}
      </View>
    );
  },
);
