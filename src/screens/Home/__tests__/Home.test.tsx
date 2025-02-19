import {mockGetGraphQLApi, TestProvider} from '../../../../tests/utils/utils';
import mockApiHome from '../../../../tests/mocks/home.json';

import React from 'react';
import {Text} from 'react-native';
import {fireEvent, render, screen, act} from '@testing-library/react-native';

import {store} from 'core/store';
import {languageService} from 'services/LanguageService';
import {Icon} from 'atoms/Icon';
import {HomeNavigator} from '../../../navigation/navigators/HomeNavigator';
import {getHomePageDataRequest} from 'core/actions';

languageService.init();

jest.mock('api/graphql', () => ({
  GRAPHQL_QUERY_CATEGORY_INDEX: 'category',
  graphQLAPI: mockGetGraphQLApi(mockApiHome),
}));

jest.mock('api/amplify', () => ({
  amplifyApi: {},
}));

describe('Home', () => {
  const loadHomePage = () => {
    render(
      <TestProvider store={store}>
        <HomeNavigator />
      </TestProvider>,
    );
    act(() => {
      store.dispatch(getHomePageDataRequest());
    });
  };

  it('should render carousels on Home page', async () => {
    loadHomePage();
    const sections = await screen.findAllByTestId('homeSectionBar');

    expect(sections.length).toBe(4);
  });

  it("should able to toggle favorites by clicking on corresponding ObjectCard's button", async () => {
    loadHomePage();
    const favoritesButtons = await screen.findAllByTestId(
      'homeSectionBar_objectCard_favoriteButton_favoriteButton',
    );

    const favoriteButton = favoritesButtons[0];
    const FavoriteIcon = await favoriteButton.findByType(Icon);

    expect(FavoriteIcon.props.name).toBe('bookmark');

    fireEvent(favoriteButton, 'press');

    expect(FavoriteIcon.props.name).toBe('bookmarkFilled');
  });

  it('should able to navigate to ObjectDetails page', async () => {
    loadHomePage();
    const objectCards = await screen.findAllByTestId(
      'homeSectionBar_objectCard',
    );

    const objectCard = objectCards[0];
    fireEvent(objectCard, 'press');
    expect(screen.getByText('ObjectDetails')).toBeOnTheScreen();
  });

  it('should able to navigate to Categories page', async () => {
    loadHomePage();
    const categoryCards = await screen.findAllByTestId(
      'homeSectionBar_categoryCard',
    );

    const categoryCard = categoryCards[0];
    const categoryCardTitleNode = await categoryCard.findByType(Text);
    // eslint-disable-next-line testing-library/no-node-access
    const categoryCardTitle = categoryCardTitleNode.props.children as string;

    fireEvent(categoryCard, 'press');

    expect(screen.getByText(categoryCardTitle)).toBeOnTheScreen();
  });
});
