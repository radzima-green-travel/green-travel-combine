import {takeEvery, takeLatest, takeLeading} from 'redux-saga/effects';
import {ACTIONS} from 'core/constants';
import {getVisitedObjectsSaga} from './getVisitedObjectsSaga';
import {addVisitedObjectSaga} from './addVisitedObjectSaga';
import {deleteVisitedObjectSaga} from './deleteVisitedObjectSaga';
import {scheduleShareExperienceMenuSaga} from './scheduleShareExperienceMenuSaga';
import {updateVisitedObjectSaga} from './updateVisitedObjectSaga';
import {sendEmailSaga} from './sendEmailSaga';

export function* visitedObjectsSaga() {
  yield takeEvery(ACTIONS.GET_VISITED_OBJECTS_REQUEST, getVisitedObjectsSaga);
  yield takeLatest(ACTIONS.ADD_VISITED_OBJECT_REQUEST, addVisitedObjectSaga);
  yield takeLatest(
    ACTIONS.DELETE_VISITED_OBJECT_REQUEST,
    deleteVisitedObjectSaga,
  );

  yield takeLeading(
    ACTIONS.SCHEDULE_OPEN_SHARE_EXPERIENCE_MENU,
    scheduleShareExperienceMenuSaga,
  );
  yield takeLeading(
    ACTIONS.UPDATE_VISITED_OBJECT_REQUEST,
    updateVisitedObjectSaga,
  );
  yield takeLeading(ACTIONS.SEND_INACCURACIES_EMAIL_REQUEST, sendEmailSaga);
  yield takeLeading(ACTIONS.SEND_ADD_INFO_EMAIL_REQUEST, sendEmailSaga);
}
