import { combineReducers } from "redux";
import breachesReducer from "./breaches/reducer";

const rootReducer = combineReducers({
  breachesData: breachesReducer,
});

export default rootReducer;
