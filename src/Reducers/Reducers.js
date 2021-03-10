const user = {
  user: {
    loginID: null,
    loginName: null,
    loginType: null
  },
  loading: false,
  error: null,
}

const reducer = (state = user, action) => {
  switch (action.type) {
    case "LOGIN_STARTED":
      return { ...state, loading: true }
    case "LOGIN_SUCCESS":
      return { ...state, user: action.userData, loading: false }
    case "LOGIN_FAILED":
      return { ...state, loading: false }
    default:
      return state;
  }
}

export default reducer;