import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import { createBrowserHistory } from "history";
export const initialState = {
  user: null,
  data: { ideas: null, quizzes: null }
};
const middleWares = [thunk];

const persistConfig = {
  key: "Compasso",
  storage,
  blacklist: ["router"]
};

export const history = createBrowserHistory();

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const store = createStore(
  persistedReducer,
  initialState,
  compose(
    applyMiddleware(...middleWares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

export const persistor = persistStore(store);
