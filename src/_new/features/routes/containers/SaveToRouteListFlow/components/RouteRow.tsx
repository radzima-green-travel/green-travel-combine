import { useValue } from '@legendapp/state/react';
import { Checkbox, Icon } from 'atoms';
import { useContext } from 'react';
import { Pressable, Text, View } from 'react-native';
import { RouteModel } from '../../../model';
import { SaveToRouteListFlowContext } from '../context';

export const RouteRow = ({ route }: { route: RouteModel.Route }) => {
  const { state$, toggle } = useContext(SaveToRouteListFlowContext);
  const isSelected = useValue(() =>
    state$.selectedRouteIds.get().has(route.id),
  );
  return (
    <Pressable
      className="flex-row items-center gap-3 px-gutter py-3"
      onPress={() => toggle(route.id)}>
      <View className="h-10 w-10 items-center justify-center rounded-[12] bg-quarterly">
        <Icon name="routeSimple" size={24} className="text-accent" />
      </View>
      <Text
        numberOfLines={2}
        className="font-subheadlineRegular flex-1 text-primary">
        {route.name}
      </Text>
      <Checkbox
        checked={isSelected}
        onPress={() => toggle(route.id)}
        testID={`saveToRouteCheckbox-${route.id}`}
      />
    </Pressable>
  );
};
