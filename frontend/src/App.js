import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store";
import React from "react";
import "./App.css";
import { history } from "./store";

function App() {
    const persistor = persistStore(store);
    return (
        <PersistGate loading={null} persistor={persistor}>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div className="App"></div>
                </ConnectedRouter>
            </Provider>
        </PersistGate>
    );
}

export default App;
