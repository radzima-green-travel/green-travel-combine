import React from 'react';
import {BottomMenu} from 'atoms';
import {UpdateBottomMenu} from 'molecules';
import {useOptionalUpdate} from './hooks';
import {TestIDs} from 'core/types';
import {Portal} from '@gorhom/portal';

export const OptionalUpdate = () => {
  const {onUpdate, onRemindLater, onSkipUpdate, menuProps, bottom} =
    useOptionalUpdate();

  return (
    <Portal>
      <BottomMenu
        testID={TestIDs.AppUpdateBottomMenu}
        withBackdrop
        isPanDownEnabled={false}
        initialIndex={0}
        header={{
          closeButtonVisible: true,
        }}
        showDragIndicator={false}
        {...menuProps}>
        <UpdateBottomMenu
          onUpdate={onUpdate}
          onRemind={onRemindLater}
          onSkip={onSkipUpdate}
          bottomInset={bottom}
        />
      </BottomMenu>
    </Portal>
  );
};
