import { put, delay, call } from 'redux-saga/effects';

import {
  scheduleShareExperienceMenu,
  setShareExperienceData,
} from 'core/actions';
import { hapticFeedbackService } from 'services/HapticFeedbackService';

export function* scheduleShareExperienceMenuSaga({
  payload: { delayMs, data },
}: ReturnType<typeof scheduleShareExperienceMenu>) {
  yield delay(delayMs);
  yield call([hapticFeedbackService, hapticFeedbackService.notify]);
  yield put(setShareExperienceData(data));
}
