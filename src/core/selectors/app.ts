import {compare} from 'compare-versions';
import {getAppVersion} from 'core/helpers';
import {IState} from 'core/store';
import {createSelector} from 'reselect';
import {isIOS} from 'services/PlatformService';

export const selectIsMyProfileFeatureEnabled = () => true;

export const selectGlobalConfiguration = (state: IState) =>
  state.configuration.data;

export const selectRequiredVersions = (state: IState) =>
  state.configuration.data?.mandatoryAppUpdateVersion;

export const selectAvailableVersions = (state: IState) =>
  state.configuration.data?.optionalAppUpdateVersion;

export const selectMandatoryAppVersion = createSelector(
  selectRequiredVersions,
  requiredVersions =>
    isIOS ? requiredVersions?.ios : requiredVersions?.android,
);

export const selectAvailableAppVersion = createSelector(
  selectAvailableVersions,
  availableVersions =>
    isIOS ? availableVersions?.ios : availableVersions?.android,
);

export const selectUpdatesAvailable = createSelector(
  selectAvailableAppVersion,
  availableAppVersion => {
    const currentAppVersion = getAppVersion();

    return availableAppVersion && currentAppVersion
      ? compare(currentAppVersion, availableAppVersion, '<=')
      : false;
  },
);

export const selectUpdatesMandatory = createSelector(
  selectMandatoryAppVersion,
  mandatoryAppVersion => {
    const currentAppVersion = getAppVersion();

    return currentAppVersion && mandatoryAppVersion
      ? compare(currentAppVersion, mandatoryAppVersion, '<=')
      : false;
  },
);

export const selectUpdatesSkipped = (state: IState): boolean =>
  state.configuration.skipUpdate;
