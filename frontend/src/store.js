import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";
const initialState = {};
const middleWares = [thunk];
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: "Compasso",
    storage
};
export const history = createBrowserHistory();
const rootReducer = createRootReducer(history); // root reducer with router state

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
