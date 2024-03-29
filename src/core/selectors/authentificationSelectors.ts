import {IState} from 'core/store';
import {split} from 'lodash';
import {createSelector} from 'reselect';

export const selectUserAuthorizedData = (state: IState) =>
  state.authentication.userAttributes;

export const selectUserAuthorized = createSelector(
  selectUserAuthorizedData,
  data => Boolean(data),
);

export const selectUserEmail = createSelector(
  selectUserAuthorizedData,
  data => {
    return data?.email || '';
  },
);

export const selectFullUserName = createSelector(
  selectUserAuthorizedData,
  data => {
    if (!data) {
      return '';
    }
    const {family_name, email, name} = data;
    if (name && family_name && !family_name.includes('@')) {
      return `${name} ${family_name}`;
    }

    return split(email, '@')[0] || '';
  },
);

export const selectIsAuthorizedWithSocialProviders = createSelector(
  selectUserAuthorizedData,
  userData => {
    if (userData?.identities) {
      const parsedIdentities = JSON.parse(userData.identities);

      return ['Google', 'Facebook', 'SignInWithApple'].includes(
        parsedIdentities?.[0]?.providerName,
      );
    }

    return false;
  },
);
