import React, {memo} from 'react';
import {ObjectInlcudesItem} from 'molecules';
import {View, Text} from 'react-native';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
import {IInclude} from 'core/types';
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
      <Text style={styles.title}>{title}</Text>
      {data.map(item => {
        return (
          <ObjectInlcudesItem
            key={item.id}
            onPress={onIncludePress}
            data={item}
          />
        );
      })}
    </View>
  );
});
