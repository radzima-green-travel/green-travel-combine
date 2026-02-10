import { useRouteList } from '../../api';
import { SuspenseView } from 'molecules';
import { useTranslation } from 'core/hooks';
import { FlatList, View } from 'react-native';
import { RoutesEmptyListView, RouteCard } from '../../components';
import { RouteModel } from '../../model';
import { Button, Icon } from 'components/atoms';
import { idKeyExtractor } from 'core/utils/react';

export const RouteList = ({
  addRouteHandler,
  onRoutePress,
}: {
  addRouteHandler: () => void;
  onRoutePress: (id: RouteModel.Route['id']) => void;
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

  const hasItems = data.length > 0;

  return (
    <View className="flex-1">
      <FlatList
        data={data}
        keyExtractor={idKeyExtractor}
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
              className="mt-4 self-center px-3"
              renderIcon={textStyle => (
                <Icon name="addRoute" style={textStyle} />
              )}
            />
          </RoutesEmptyListView>
        }
        className="flex-1 bg-secondary"
        contentContainerClassName="grow gap-3 pt-[calc(var(--spacing-header-overlay)+var(--spacing-4))] px-gutter"
      />
      {hasItems && (
        <Button
          testID="addRouteFloatingButton"
          onPress={addRouteHandler}
          text={t('common.addRouteButtonLabel')}
          className="absolute right-gutter bottom-4 px-4"
          elevated
          renderIcon={textStyle => <Icon name="addRoute" style={textStyle} />}
        />
      )}
    </View>
  );
};
