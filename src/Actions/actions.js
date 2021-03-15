import * as type from "../Reducers/Types"
// import Api from "../API/Api"

//Login
export const AuthUser = (user) => ({
  type: type.LOGIN_STARTED,
  payload: user
})

export const LogoutUser = () => ({
  type: type.USER_LOGOUT
})

export const StartEstimation = (estimation) => ({
  type: type.ESTIMATION_STARTED,
  payload: estimation
})

