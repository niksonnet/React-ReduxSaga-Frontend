import { all, call, put, take, takeLatest } from "redux-saga/effects";

import * as type from "../Reducers/Types";
import * as storage from "../LocalStorage/LocalStorage"

function* fetchUser(action) {
  try {
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
    if (userResponse.status >= 200 && userResponse.status < 300) {
      storage.setUser(user);
      yield put({ type: type.LOGIN_SUCCESS, payload: user });
    } else {
      yield put({ type: type.LOGIN_FAILED, error: user.message });
    }

  } catch (error) {
    yield put({ type: type.LOGIN_FAILED, error: error });
  }
}

function* Logout() {
  storage.deleteLocalStorage('user');

  console.log("Logout executed", storage.getUser("user"));

  yield put({ type: type.USER_LOGOUT });
}

function* actionWatcher() {


  yield takeLatest(type.LOGIN_STARTED, fetchUser);
  // yield takeLatest(type.USER_LOGOUT, Logout);

  // while (true) {
  const action = yield take('*')
  switch (action.type) {
    case type.LOGIN_STARTED:
      yield takeLatest(type.LOGIN_STARTED, fetchUser);
      break;
    case type.USER_LOGOUT:
      yield takeLatest(type.USER_LOGOUT, Logout);
      break;
    default:
      break;
  }
  //   console.log(action.type);
  // }
}

export default function* rootSaga() {
  yield all([
    actionWatcher()
  ]);
}