import * as type from "./Types"
import * as Storage from "../LocalStorage/LocalStorage"

let estimation = Storage.getLocalStorage(Storage.ESTIMATION_STORAGE_KEY);

const initialState = estimation ? {
  loading: false,
  error: null,
  estimation: { ...estimation }
} :
  {
    loading: false,
    error: null
  };


export default function users(state = initialState, action) {
  switch (action.type) {
    case type.ESTIMATION_STARTED:
      return { ...state, loading: true }
    case type.ESTIMATION_SUCCESS:
      return {
        ...state,
        estimation: {
          total: action.payload.total,
          discount: action.payload.discount.percentage
        },
        loading: false,
        error: null
      }
    case type.ESTIMATION_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    default:
      return state;
  }
}
