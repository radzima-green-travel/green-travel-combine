import { useValue } from '@legendapp/state/react';
import { Button, Icon } from 'atoms';
import { useContext } from 'react';
import { SaveToRouteListFlowContext } from '../context';

export const SaveToRouteListButton = () => {
  const { menuProps, state$ } = useContext(SaveToRouteListFlowContext);
  const isActive = useValue(() => state$.initialRouteIds.get().size > 0);

  return (
    <Button
      testID="saveToRouteListButton"
      isIconOnlyButton
      theme={isActive ? 'primary' : 'secondary'}
      onPress={menuProps.openMenu}
      renderIcon={textStyle => <Icon style={textStyle} name="addRoute" />}
    />
  );
};
