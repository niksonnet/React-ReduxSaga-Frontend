import { all, put, takeLatest } from "redux-saga/effects";
import Utility, { LOGIN_STARTED, LOGIN_SUCCESS } from "../Util";


function* fetchUser(userData) {
  const userResponse = yield
  fetch(Utility.API_URL, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    response.json().then((data) => {
      console.log('Successful' + data);
    });
  });

  yield put({ type: LOGIN_SUCCESS, user: userResponse })
}

function* actionWatcher() {
  yield takeLatest(LOGIN_STARTED, fetchUser)
}
export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}