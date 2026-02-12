import { useValue } from '@legendapp/state/react';
import { Button } from 'components/atoms';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AddToRouteFlowContext } from './AddToRouteFlow';

export const DoneButton = ({ className }: { className?: string }) => {
  const { state$, save } = useContext(AddToRouteFlowContext);

  const count = useValue(() => state$.selectedIds.size);
  const isPending = useValue(() => state$.isPending.get());
  const { t } = useTranslation('routes');

  return (
    <Button
      className={className}
      testID="doneButton"
      text={
        count > 0
          ? t('addToRouteFlow.submitButtonLabel_other', { count })
          : t('addToRouteFlow.submitButtonLabel_zero')
      }
      loading={isPending}
      onPress={save}
      elevated
    />
  );
};
