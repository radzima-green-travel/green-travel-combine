import React, {memo} from 'react';
import {ObjectInlcudesItem} from 'molecules';
import {View, Text} from 'react-native';
import {themeStyles} from './styles';
import {useThemeStyles} from 'core/hooks';
import {IInclude, TestIDs} from 'core/types';
import {composeTestID, getPlatformsTestID} from 'core/helpers';

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
      <Text
        style={styles.title}
        {...getPlatformsTestID(TestIDs.ObjectDetailsLinkedTitle)}>
        {title}
      </Text>
      {data.map((item, index) => (
        <ObjectInlcudesItem
          key={item.id}
          onPress={onIncludePress}
          data={item}
          testID={composeTestID(TestIDs.ObjectDetailsLinkedObject, index)}
        />
      ))}
    </View>
  );
});
