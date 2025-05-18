import {put, call} from 'redux-saga/effects';
import {amplifyApi} from '../../../api/amplify';
import {submitNewPlaceFormRequest} from '../../actions/home';
import {getUserIdSaga} from '../visitedObjects/sendEmailSaga';
import {NewPlaceEmailRequest} from 'core/types/addNewPlace';

export function* submitNewPlaceFormSaga({
  payload,
  meta: {successAction, failureAction},
}: ReturnType<typeof submitNewPlaceFormRequest>) {
  try {
    const userId = yield call(getUserIdSaga);

    yield call(
      amplifyApi.sendEmail,
      NewPlaceEmailRequest.from({...payload, userId}),
    );

    yield put(successAction(true));
  } catch (e: any) {
    yield put(failureAction(e));
  }
}
