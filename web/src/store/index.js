import Thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

let reducer = combineReducers({});

const persistConfig = {
  key: "root",
  storage,
};

const enhancedReducer = persistReducer(persistConfig, reducer);

//let initialState = {};

let middleware = [Thunk];
if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middleware = [...middleware, logger];
}

const store = createStore(enhancedReducer, applyMiddleware(...middleware));

export default store;
