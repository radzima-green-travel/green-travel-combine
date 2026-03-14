import { useValue } from '@legendapp/state/react';
import { BottomMenu, Button } from 'atoms';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useRouteList } from '../../../api';
import { SaveToRouteListFlowContext } from '../context';
import { CreateRouteMenuItem } from './CreateRouteMenuItem';
import { RouteRow } from './RouteRow';

type Props = {
  onCreateRoute: () => void;
};

export const SaveToRouteListMenu = ({ onCreateRoute }: Props) => {
  const { menuProps, state$, save } = useContext(SaveToRouteListFlowContext);
  const routes = useRouteList();
  const isPending = useValue(() => state$.isPending.get());
  const { t } = useTranslation('routes');

  return (
    <BottomMenu
      ref={menuProps.ref}
      testID="saveToRouteListMenu"
      withBackdrop
      header={{ title: t('saveToRouteList.title') }}>
      <CreateRouteMenuItem onPress={onCreateRoute} />
      {routes.data?.map(route => (
        <RouteRow key={route.id} route={route} />
      ))}
      <View className="px-gutter pt-2 pb-safe-offset-4">
        <Button
          testID="saveToRouteListDoneButton"
          onPress={save}
          text={t('saveToRouteList.done')}
          loading={isPending}
        />
      </View>
    </BottomMenu>
  );
};
