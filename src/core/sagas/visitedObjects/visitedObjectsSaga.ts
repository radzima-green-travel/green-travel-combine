import {takeEvery, takeLatest, takeLeading} from 'redux-saga/effects';
import {
  getVisitedObjectsRequest,
  addVisitedObjectRequest,
  deleteVisitedObjectRequest,
  scheduleShareExperienceMenu,
  updateVisitedObjectRequest,
  sendInaccuraciesEmailRequest,
  sendAddInfoEmailRequest,
} from 'core/actions';
import {getVisitedObjectsSaga} from './getVisitedObjectsSaga';
import {addVisitedObjectSaga} from './addVisitedObjectSaga';
import {deleteVisitedObjectSaga} from './deleteVisitedObjectSaga';
import {scheduleShareExperienceMenuSaga} from './scheduleShareExperienceMenuSaga';
import {updateVisitedObjectSaga} from './updateVisitedObjectSaga';
import {sendEmailSaga} from './sendEmailSaga';

export function* visitedObjectsSaga() {
  yield takeEvery(getVisitedObjectsRequest, getVisitedObjectsSaga);
  yield takeLatest(addVisitedObjectRequest, addVisitedObjectSaga);
  yield takeLatest(deleteVisitedObjectRequest, deleteVisitedObjectSaga);

  yield takeLeading(
    scheduleShareExperienceMenu,
    scheduleShareExperienceMenuSaga,
  );
  yield takeLeading(updateVisitedObjectRequest, updateVisitedObjectSaga);
  yield takeLeading(sendInaccuraciesEmailRequest, sendEmailSaga);
  yield takeLeading(sendAddInfoEmailRequest, sendEmailSaga);
}
