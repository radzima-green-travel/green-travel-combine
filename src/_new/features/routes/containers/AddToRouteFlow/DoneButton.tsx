import { useValue } from '@legendapp/state/react';
import { Button } from 'components/atoms';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AddToRouteFlowContext } from './AddToRouteFlow';

export const DoneButton = () => {
  const { state$, save } = useContext(AddToRouteFlowContext);

  const count = useValue(() => state$.selectedIds.size);
  const isPending = useValue(() => state$.isPending.get());
  const { t } = useTranslation('routes');

  return (
    <Button
      testID="doneButton"
      text={t('addToRouteFlow.submitButtonLabel', { count })}
      loading={isPending}
      className="absolute right-gutter bottom-4 left-gutter"
      onPress={save}
    />
  );
};
