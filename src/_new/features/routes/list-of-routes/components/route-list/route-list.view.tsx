import {FlatList, type FlatListProps} from 'react-native';
import {RoutesEmptyView} from '../../../components/empty-view';

interface RouteListViewProps
  extends Pick<FlatListProps<any>, 'style' | 'contentContainerStyle'> {}

export const RouteListView = ({...listProps}: RouteListViewProps) => {
  return (
    <FlatList
      data={[]}
      renderItem={({item}) => null}
      ListEmptyComponent={
        <RoutesEmptyView
          testID="routesEmptyView"
          title="No routes found"
          description="Create a new route to get started"
          image="mapPoint"
        />
      }
      style={{flex: 1}}
      contentContainerStyle={{flexGrow: 1}}
      {...listProps}
    />
  );
};
