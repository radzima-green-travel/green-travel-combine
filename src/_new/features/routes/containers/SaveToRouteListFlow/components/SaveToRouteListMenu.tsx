import { ListItem } from '@core/components';
import { useValue } from '@legendapp/state/react';
import { BottomMenu, Button } from 'atoms';
import { Header } from 'components/containers';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRouteList } from '../../../api';
import { SaveToRouteListFlowContext } from '../context';
import { RouteRow } from './RouteRow';

type Props = {
  onCreateRoute: () => void;
};

export const SaveToRouteListMenu = ({ onCreateRoute }: Props) => {
  const { menuProps, state$, save } = useContext(SaveToRouteListFlowContext);
  const routes = useRouteList();
  const isPending = useValue(() => state$.isPending.get());
  const { t } = useTranslation('routes');

  const { height } = useWindowDimensions();
  const maxHeight = height * 0.75;

  const menuItemClassName = 'h-[74]';

  const createRouteButton = (
    <ListItem
      className={menuItemClassName}
      title={
        <ListItem.Title fontVariant="bold" className="text-accent">
          {t('saveToRouteList.createNewRoute')}
        </ListItem.Title>
      }
      onPress={() => {
        menuProps.closeMenu();
        onCreateRoute();
      }}
      leadingContent={<ListItem.SubjectIcon name="addLarge" />}
    />
  );

  //This layout is used because the bottomsheet does not support dynamic height
  // properly with mixed content - multiple views or scrollview + view (footer)

  return (
    <BottomMenu ref={menuProps.ref} testID="saveToRouteListMenu" withBackdrop>
      <View style={{ maxHeight }}>
        <Header
          title={t('saveToRouteList.title')}
          replacesDefaultHeader={false}
          backButtonHidden
          withSafeArea={false}
          overlaysContent={false}
          statusbarStyle="light"
          className="bg-transparent"
        />
        {createRouteButton}
        <ScrollView>
          {routes.data?.map(route => (
            <RouteRow
              key={route.id}
              route={route}
              className={menuItemClassName}
            />
          ))}
        </ScrollView>
        <View className="px-gutter pt-4 pb-4">
          <Button
            testID="saveToRouteListDoneButton"
            onPress={save}
            text={t('saveToRouteList.done')}
            loading={isPending}
          />
        </View>
      </View>
    </BottomMenu>
  );
};
