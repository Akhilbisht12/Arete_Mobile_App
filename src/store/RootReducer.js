import { combineReducers } from "redux";
import adviceReducer from "./reducers/adviceReducers";

const RootReducer = combineReducers({
  advice : adviceReducer
});

export default RootReducer;