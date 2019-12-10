import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import * as dataReducer from "./data";
import * as userReducer from "./user";
import * as uiReducer from "./ui";

const rootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        ...dataReducer,
        ...userReducer,
        ...uiReducer
    });
export default rootReducer;
