import * as type from "./Types"
import * as Storage from "../LocalStorage/LocalStorage"

let user = Storage.getLocalStorage(Storage.USER_STORAGE_KEY);
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
      return {
        ...state,
        loggedIn: false,
        loading: true
      }
    case type.LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          username: action.payload.username,
          role: action.payload.role,
          discount: action.payload.discount,
          token: action.payload.token
        },
        loading: false,
        loggedIn: true,
        error: null
      }
    case type.LOGIN_FAILED:
      return {
        ...state, error: action.error,
        loading: false,
        loggedIn: false,
      }
    case type.USER_LOGOUT:
      return {
        user: {
          token: null,
          error: false
        },
        loggedIn: false,
        loading: false
      }
    default:
      return state;
  }
}