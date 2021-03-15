import { combineReducers } from "redux"
import user from "./Users"
import estimation from "./Estimation"

const rootReducer = combineReducers({
  user: user,
  estimation: estimation
});

export default rootReducer;