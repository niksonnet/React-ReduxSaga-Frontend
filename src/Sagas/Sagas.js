import { all, call, put, take, takeLatest } from "redux-saga/effects";

import * as type from "../Reducers/Types";
import * as storage from "../LocalStorage/LocalStorage"

function* fetchUser(action) {
  try {
    const userResponse = yield call(fetch,
      type.API_URI + "/authenticate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload)
      });
    let user = yield userResponse.json();
    if (userResponse.status >= 200 && userResponse.status < 300) {
      storage.setLocalStorage(storage.USER_STORAGE_KEY, user);
      yield put({ type: type.LOGIN_SUCCESS, payload: user });
    } else {
      yield put({ type: type.LOGIN_FAILED, error: user.message });
    }

  } catch (error) {
    yield put({ type: type.LOGIN_FAILED, error: error });
  }
}

function* Logout() {
  storage.deleteLocalStorage(storage.USER_STORAGE_KEY);
  storage.deleteLocalStorage(storage.ESTIMATION_STORAGE_KEY);

  yield put({ type: type.USER_LOGOUT });
}

function* startEstimation(action) {
  try {
    var bearer = 'Bearer ' + action.payload.token;
    const formData = new FormData();
    formData.append("username", action.payload["username"]);
    formData.append("rate", action.payload["rate"]);
    formData.append("weight", action.payload["weight"]);

    const estimationResponse = yield call(fetch,
      type.API_URI + "/estimation",
      {
        method: "POST",
        headers: {
          'Authorization': bearer,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: action.payload["username"],
          rate: action.payload["rate"],
          weight: action.payload["weight"]
        })
      });
    let estimation = yield estimationResponse.json();

    if (estimationResponse.status >= 200 && estimationResponse.status < 300) {
      storage.setLocalStorage(storage.ESTIMATION_STORAGE_KEY, estimation);
      yield put({ type: type.ESTIMATION_SUCCESS, payload: estimation });

    } else {
      yield put({ type: type.ESTIMATION_FAILED, error: estimation.message });
    }

  } catch (error) {
    yield put({ type: type.ESTIMATION_FAILED, error: error });
  }
}

function* actionWatcher() {
  yield takeLatest(type.LOGIN_STARTED, fetchUser);
  yield takeLatest(type.ESTIMATION_STARTED, startEstimation);

  // while (true) {
  const action = yield take('*')
  switch (action.type) {
    case type.LOGIN_STARTED:
      yield takeLatest(type.LOGIN_STARTED, fetchUser);
      break;
    case type.USER_LOGOUT:
      yield takeLatest(type.USER_LOGOUT, Logout);
      break;
    case type.ESTIMATION_STARTED:
      yield takeLatest(type.ESTIMATION_STARTED, startEstimation);
      break;
    default:
      break;
  }
}

export default function* rootSaga() {
  yield all([
    actionWatcher()
  ]);
}