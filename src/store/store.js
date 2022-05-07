import { createStore, applyMiddleware } from "redux";
import RootReducer from "./RootReducer";
import logger from "redux-logger";

export const store = createStore(RootReducer, applyMiddleware(logger));
