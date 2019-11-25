import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import * as dataReducer from "./data";

import * as userReducer from "./user";
const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    ...dataReducer,
    ...userReducer

  });
export default rootReducer;
