import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import store from "./store";
import "./css/app.css";
import { history } from "./store";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

import Header from "./components/Header";


export class App extends Component {
  persistor = persistStore(store);
  render() {
    return (
      <PersistGate loading={null} persistor={this.persistor}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <main>

              <Header />
              <Switch>
                <Route exact path="/" component={LoginScreen} />
                <Route exact path="/home" component={HomeScreen} />
              </Switch>
            </main>
          </ConnectedRouter>
        </Provider>
      </PersistGate>
    );
  }
}

export default App;
