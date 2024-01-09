import {put, delay, call} from 'redux-saga/effects';

import {
  scheduleShareExperienceMenu,
  setShareExperienceData,
} from 'core/reducers';
import {hapticFeedbackService} from 'services/HapticFeedbackService';

export function* scheduleShareExperienceMenuSaga({
  payload: {delayMs, data},
}: ReturnType<typeof scheduleShareExperienceMenu>) {
  yield delay(delayMs);
  yield call(
    [hapticFeedbackService, hapticFeedbackService.trigger],
    'notificationSuccess',
  );
  yield put(setShareExperienceData(data));
}
