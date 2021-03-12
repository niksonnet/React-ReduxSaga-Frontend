import { combineReducers } from "redux"
import user from "./Users"

const rootReducer = combineReducers({
  user: user
});

export default rootReducer;