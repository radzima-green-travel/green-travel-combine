import { reactive } from '@legendapp/state/react';
import { Button, Icon } from 'components/atoms';

interface AddToRouteButtonProps {
  objectId: string;
  routeObjectIds: string[];
}

export const AddToRouteButton = reactive(
  ({ objectId, routeObjectIds }: AddToRouteButtonProps) => {
    const isAdded = routeObjectIds.includes(objectId);
    return (
      <Button
        testID="addToRouteButton"
        isIconOnlyButton
        onPress={() => {}}
        renderIcon={() => (
          <Icon
            name={isAdded ? 'check' : 'addLocation'}
            size={24}
            color="white"
          />
        )}
      />
    );
  },
);
