import React, {memo} from 'react';
import {ObjectInlcudesItem} from 'molecules';
import {View, Text} from 'react-native';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
import {IInclude, TestIDs} from 'core/types';

interface IProps {
  data: IInclude[];
  onIncludePress: (config: {
    id: string;
    name: string;
    objects: string[];
  }) => void;
  title: string;
}

export const ObjectIncludes = memo(({data, title, onIncludePress}: IProps) => {
  const styles = useThemeStyles(themeStyles);
  return (
    <View style={styles.container}>
      <Text style={styles.title} testID={TestIDs.ObjectDetailsLinkedTitle}>
        {title}
      </Text>
      {data.map((item, index) => {
        const testID = `${TestIDs.ObjectDetailsLinkedObject}_${index + 1}`;

        return (
          <ObjectInlcudesItem
            key={item.id}
            onPress={onIncludePress}
            data={item}
            testID={testID}
          />
        );
      })}
    </View>
  );
});
