import { useValue } from '@legendapp/state/react';
import { Icon } from 'components/atoms';
import { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import type { ObjectListViewMode } from 'components/types';
import { AddToRouteFlowContext } from './AddToRouteFlow';
import { tv } from 'tailwind-variants';

const AddButtonCard = ({
  isAdded,
  onPress,
}: {
  isAdded: boolean;
  onPress: () => void;
}) => {
  const button = tv({
    base: 'h-[30] w-[30] items-center justify-center rounded-[15]',
    variants: {
      isAdded: {
        true: 'border-2 border-white bg-accent',
        false: 'bg-primary',
      },
    },
  });

  return (
    <TouchableOpacity
      hitSlop={15}
      activeOpacity={0.8}
      testID="addToRouteButton"
      onPress={onPress}>
      <View className={button({ isAdded })}>
        <Icon
          name={isAdded ? 'check' : 'addLarge'}
          size={20}
          className={isAdded ? 'text-white' : 'text-icon-secondary'}
        />
      </View>
    </TouchableOpacity>
  );
};

const AddButtonList = ({
  isAdded,
  onPress,
}: {
  isAdded: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      hitSlop={15}
      activeOpacity={0.8}
      testID="addToRouteButton"
      onPress={onPress}>
      <View className="h-[30] w-[30] items-center justify-center rounded-[15] bg-primary">
        <Icon
          name={isAdded ? 'checkCircle' : 'plusCircle'}
          size={20}
          className={isAdded ? 'text-accent' : 'text-icon-secondary'}
        />
      </View>
    </TouchableOpacity>
  );
};

export const AddButton = ({
  objectId,
  listViewMode,
}: {
  objectId: string;
  listViewMode: ObjectListViewMode;
}) => {
  const { state$, toggle } = useContext(AddToRouteFlowContext);
  const isAdded = useValue(() => state$.selectedIds.get().has(objectId));

  const pressHandler = () => toggle(objectId);

  return listViewMode === 'card' ? (
    <AddButtonCard isAdded={isAdded} onPress={pressHandler} />
  ) : (
    <AddButtonList isAdded={isAdded} onPress={pressHandler} />
  );
};
