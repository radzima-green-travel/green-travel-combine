import { SnackBar } from 'atoms';
import { useContext } from 'react';
import { View } from 'react-native';
import { AddToRouteFlowContext } from './AddToRouteFlow';
import { DoneButton } from './DoneButton';

export const ActionBar = () => {
  const { snackbar } = useContext(AddToRouteFlowContext);

  return (
    <View className="absolute right-0 bottom-4 left-0">
      <View>
        <SnackBar {...snackbar} testID="addToRouteFlowSnackBar" />
      </View>
      <DoneButton className="mx-gutter" />
    </View>
  );
};
