import { all, call, put, takeLatest } from "redux-saga/effects";
import * as type from "../Types";

//http://localhost:52632/
// function asyncAuthUser(userPayload) {
//   return fetch(type.API_URI, {
//     method: 'POST',
//     body: JSON.stringify(userPayload),
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     },
//   }).then((response) => {
//     response.json().catch((error) => { throw error });
//   });

// }

function* fetchUser(action) {
  try {

    //const userResponse = yield call(asyncAuthUser, action.payload);

    const userResponse = yield call(fetch,
      type.API_URI,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload)
      });
    let user = yield userResponse.json();

    yield put({ type: type.LOGIN_SUCCESS, payload: user })
  } catch (error) {
    yield put({ type: type.LOGIN_FAILED, error: error })
  }

}

function* actionWatcher() {
  yield takeLatest(type.LOGIN_STARTED, fetchUser)
}
export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}