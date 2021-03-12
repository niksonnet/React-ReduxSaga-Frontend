import * as type from "./Types"
import * as Storage from "../LocalStorage/LocalStorage"

let user = Storage.getUser("user");
const initialState = user ? {
  loggedIn: true,
  loading: false,
  error: null,
  user: { ...user }
} :
  {
    loggedIn: false,
    loading: false,
    error: null
  };

export default function users(state = initialState, action) {
  switch (action.type) {
    case type.LOGIN_STARTED:
      return { ...state, loading: true }
    case type.LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          username: action.payload.username,
          role: action.payload.role,
          discount: action.payload.discount
        },
        loading: false,
        loggedIn: true,
        error: null
      }
    case type.LOGIN_FAILED:
      return { ...state, error: action.error, loading: false }
    case type.USER_LOGOUT:
      return { user: {}, error: null, loggedIn: false, loading: false }
    default:
      return state;
  }
}