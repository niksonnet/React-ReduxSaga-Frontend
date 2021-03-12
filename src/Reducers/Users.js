import * as type from "../Types"

const initialState = {
  user: {
    username: "",
    role: "",
    discount: {
      percentage: 0
    }
  },
  loading: false,
  error: null
}

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
        loading: false
      }
    case type.LOGIN_FAILED:
      return { ...state, error: action.error, loading: false }
    default:
      return state;
  }
}