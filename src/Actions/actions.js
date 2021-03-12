import * as type from "../Types"
// import Api from "../API/Api"

//Login
export const AuthUser = (user) => ({
  type: type.LOGIN_STARTED,
  payload: user
})

// export const AuthUser = (userPayload) => dispatch => {
//   dispatch({ type: LOGIN_STARTED });

//   return Api
//     .AuthenticateUser(userPayload)
//     .then(response => response.json())
//     .then(data =>
//       dispatch({ type: LOGIN_SUCCESS, data }),
//       error => dispatch({
//         type: LOGIN_FAILED,
//         error: error.message || 'Unexpected Error!!!'
//       }))
// };
