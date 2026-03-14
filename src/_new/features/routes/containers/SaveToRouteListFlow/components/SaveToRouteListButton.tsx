import { Button, Icon } from 'atoms';
import { useContext } from 'react';
import { SaveToRouteListFlowContext } from '../context';

export const SaveToRouteListButton = () => {
  const { menuProps } = useContext(SaveToRouteListFlowContext);

  return (
    <Button
      testID="saveToRouteListButton"
      isIconOnlyButton
      theme="secondary"
      onPress={menuProps.openMenu}
      renderIcon={textStyle => <Icon style={textStyle} name="addRoute" />}
    />
  );
};
