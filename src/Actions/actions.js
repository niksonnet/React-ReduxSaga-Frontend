import { LOGIN_FAILED, LOGIN_STARTED, LOGIN_SUCCESS } from "../Util"
import Api from "../API/Api"

export const Login = (data) => ({
  type: LOGIN_STARTED,
  userData: data
})

export const AuthUser = (userPayload) => dispatch => {
  dispatch({ type: LOGIN_STARTED });

  return Api
    .AuthenticateUser(userPayload)
    .then(response => response.json())
    .then(data =>
      dispatch({ type: LOGIN_SUCCESS, data }),
      error => dispatch({
        type: LOGIN_FAILED,
        error: error.message || 'Unexpected Error!!!'
      }))
};
