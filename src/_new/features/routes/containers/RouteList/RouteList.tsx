import { useRouteList } from '../../api';
import { SuspenseView } from 'molecules';
import { useTranslation } from 'core/hooks';
import { FlatList } from 'react-native';
import { RoutesEmptyListView, RouteCard } from '../../components';
import { Route } from '../../model';
import { Button } from 'components/atoms';

export const RouteList = ({
  addRouteHandler,
  onRoutePress,
}: {
  addRouteHandler: () => void;
  onRoutePress: (id: Route.Route['id']) => void;
}) => {
  const { data, isPending, error } = useRouteList();
  const { t } = useTranslation('routes');

  if (isPending || error)
    return (
      <SuspenseView
        testID="routeListSuspense"
        loading={isPending}
        error={error ? { text: error.tag, title: 'Error' } : null}
      />
    );

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <RouteCard route={item} onPress={() => onRoutePress(item.id)} />
      )}
      ListEmptyComponent={
        <RoutesEmptyListView
          testID="routesEmptyView"
          title={t('routeList.empty.title')}
          description={t('routeList.empty.description')}
          image="mapPoint">
          <Button
            testID="addRouteButton"
            onPress={addRouteHandler}
            text={t('common.addRouteButtonLabel')}
            className="mt-4"
          />
        </RoutesEmptyListView>
      }
      className="flex-1 bg-secondary"
      contentContainerClassName="grow gap-3 pt-[calc(var(--spacing-header-overlay)+var(--spacing-4))] px-gutter"
    />
  );
};
