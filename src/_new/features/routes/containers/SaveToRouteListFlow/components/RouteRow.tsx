import { useValue } from '@legendapp/state/react';
import { ListItem } from '@core/components';
import { Checkbox } from 'atoms';
import { useContext } from 'react';
import { RouteModel } from '../../../model';
import { SaveToRouteListFlowContext } from '../context';

export const RouteRow = ({
  route,
  className,
}: {
  route: RouteModel.Route;
  className?: string;
}) => {
  const { state$, toggle } = useContext(SaveToRouteListFlowContext);
  const isSelected = useValue(() =>
    state$.selectedRouteIds.get().has(route.id),
  );

  return (
    <ListItem
      className={className}
      onPress={() => toggle(route.id)}
      title={route.name}
      leadingContent={<ListItem.SubjectIcon name="routeSimple" />}
      trailingContent={
        <Checkbox
          checked={isSelected}
          onPress={() => toggle(route.id)}
          testID={`saveToRouteCheckbox-${route.id}`}
        />
      }
    />
  );
};
