import { combineReducers } from "redux";
import adviceReducer from "./reducers/adviceReducers";
import patientReducer from "./reducers/patientReducers";

const RootReducer = combineReducers({
  advice : adviceReducer,
  patient : patientReducer
});

export default RootReducer;