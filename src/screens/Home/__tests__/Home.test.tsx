import {
  mockCreateGraphQLAPI,
  TestProvider,
} from '../../../../tests/utils/utils';
import mockApiHome from '../../../../tests/mocks/home.json';

import React from 'react';
import {Text} from 'react-native';
import {fireEvent, render, screen, act} from '@testing-library/react-native';

import {store} from 'core/store';
import {Icon} from 'atoms/Icon';
import {HomeNavigator} from '../../../navigation/navigators/HomeNavigator';
import {getHomePageDataRequest} from 'core/actions';

jest.mock('api/graphql', () => ({
  GRAPHQL_QUERY_CATEGORY_INDEX: 'category',
  graphQLAPI: mockCreateGraphQLAPI(mockApiHome),
}));

jest.mock('api/amplify', () => ({
  amplifyApi: {},
}));

describe('Home page', () => {
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

  it('renders objects and categroies on Home page', async () => {
    loadHomePage();
    const sections = await screen.findAllByTestId('homeSectionBar');

    expect(sections.length).toBe(4);
  });

  it('marks/unmarks object as favourite on favourite button press', async () => {
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

  it('opens object details page on its card press', async () => {
    loadHomePage();
    const objectCards = await screen.findAllByTestId(
      'homeSectionBar_objectCard',
    );

    const objectCard = objectCards[0];
    fireEvent(objectCard, 'press');
    expect(screen.getByText('ObjectDetails')).toBeOnTheScreen();
  });

  it('opens category page on its card press', async () => {
    loadHomePage();
    const categoryCards = await screen.findAllByTestId(
      'homeSectionBar_categoryCard',
    );

    const categoryCard = categoryCards[0];
    const categoryCardTitleNode = await categoryCard.findByType(Text);
    const categoryCardTitle = categoryCardTitleNode.props.children as string;

    fireEvent(categoryCard, 'press');

    expect(screen.getByText(categoryCardTitle)).toBeOnTheScreen();
  });
});
