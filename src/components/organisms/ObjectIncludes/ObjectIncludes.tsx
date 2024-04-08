import React, {memo} from 'react';
import {ObjectInlcudesItem} from 'molecules';
import {View, Text, ScrollView} from 'react-native';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
import {IInclude} from 'core/types';
import {composeTestID, getPlatformsTestID} from 'core/helpers';

interface IProps {
  data: IInclude[];
  onIncludePress: (config: {
    id: string;
    name: string;
    objects: string[];
  }) => void;
  title: string;
  testID: string;
}

export const ObjectIncludes = memo(
  ({data, title, onIncludePress, testID}: IProps) => {
    const styles = useThemeStyles(themeStyles);
    return (
      <View {...getPlatformsTestID(testID)} style={styles.container}>
        <Text
          style={styles.title}
          {...getPlatformsTestID(composeTestID(testID, 'title'))}>
          {title}
        </Text>
        <ScrollView horizontal contentContainerStyle={styles.listContainer}>
          {data.map(item => (
            <ObjectInlcudesItem
              key={item.categoryId}
              onPress={onIncludePress}
              data={item}
              testID={composeTestID(testID, 'item')}
            />
          ))}
        </ScrollView>
      </View>
    );
  },
);
