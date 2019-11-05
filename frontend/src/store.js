import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import { createBrowserHistory } from "history";
const initialState = {};
const middleWares = [thunk];

const persistConfig = {
    key: "Compasso",
    storage
};
export const history = createBrowserHistory();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    initialState,
    compose(
        applyMiddleware(...middleWares),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
