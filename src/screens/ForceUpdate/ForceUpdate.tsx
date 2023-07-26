import React from 'react';
import {BottomMenu} from 'atoms';
import {UpdateBottomMenu} from 'molecules';
import {useForceUpdate} from './hooks';

export const ForceUpdate = () => {
  const {menuProps, bottom} = useForceUpdate();

  return (
    <BottomMenu
      withBackdrop
      initialIndex={-1}
      isPanDownEnabled={false}
      showDragIndicator={false}
      {...menuProps}>
      <UpdateBottomMenu
        onUpdate={() => {}}
        onRemind={() => {}}
        onSkip={() => {}}
        bottomInset={bottom}
      />
    </BottomMenu>
  );
};
