import { Button, Icon } from 'components/atoms';
import { useTranslation } from 'core/hooks';
import { resolveErrorMessage } from '@core/utils/resolveErrorMessage';
import { idKeyExtractor } from 'core/utils/react';
import { SuspenseView } from 'molecules';
import { FlatList } from 'react-native';
import { useRouteList } from '../../api';
import { RouteCard, RoutesEmptyListView } from '../../components';
import { RouteModel } from '../../model';

export const RouteList = ({
  onAddRoute,
  onSelectRoute,
}: {
  onAddRoute: () => void;
  onSelectRoute: (id: RouteModel.Route['id']) => void;
}) => {
  const { data, isPending, error } = useRouteList();
  const { t } = useTranslation('routes');

  const hasItems = data?.length! > 0;

  return (
    <SuspenseView
      testID="routeListSuspense"
      loading={isPending}
      error={resolveErrorMessage(error, t)}>
      <FlatList
        data={data}
        keyExtractor={idKeyExtractor}
        renderItem={({ item }) => (
          <RouteCard route={item} onPress={() => onSelectRoute(item.id)} />
        )}
        ListEmptyComponent={
          <RoutesEmptyListView
            testID="routesEmptyView"
            title={t('routeList.empty.title')}
            description={t('routeList.empty.description')}
            image="mapPoint">
            <Button
              testID="addRouteButton"
              onPress={onAddRoute}
              text={t('common.addRouteButtonLabel')}
              className="mt-4 self-center px-3"
              renderIcon={textStyle => (
                <Icon name="addRoute" style={textStyle} />
              )}
            />
          </RoutesEmptyListView>
        }
        className="flex-1 bg-secondary"
        contentContainerClassName="grow gap-3 pt-[calc(var(--spacing-header-overlay)+var(--spacing-4))] px-gutter pb-30"
      />
      {hasItems && (
        <Button
          testID="addRouteFloatingButton"
          onPress={onAddRoute}
          text={t('common.addRouteButtonLabel')}
          className="absolute right-gutter bottom-4 px-4"
          elevated
          renderIcon={textStyle => <Icon name="addRoute" style={textStyle} />}
        />
      )}
    </SuspenseView>
  );
};
