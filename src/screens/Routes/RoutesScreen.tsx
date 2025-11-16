import {Header} from 'components/organisms/Header/Header';
import {RouteList} from '../../_new/features/routes/list-of-routes/components/route-list';

export function RoutesScreen() {
  return (
    <>
      <Header>
        <Header.ContentBlock>
          <Header.Title>Routes</Header.Title>
        </Header.ContentBlock>
      </Header>
      <Header.PageContentWithOverlay>
        <RouteList />
      </Header.PageContentWithOverlay>
    </>
  );
}
