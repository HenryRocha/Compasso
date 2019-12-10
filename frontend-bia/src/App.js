import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import DashDaBia from './screens/DashDaBia';
import NewDashProject from './components/NewDashProject';
import CriacaoDeProjeto from './screens/CriacaoDeProjeto';
import store from "./store";
import "./App.css";
import { history } from "./store";
import BiaDashScreen from "./screens/BiaDashScreen";
import CreateProjectScreen from "./screens/CreateProjectScreen";
import Header from "./components/Header";
import createTemplate from "./screens/createTemplate"
import LoginScreen from "./screens/LoginScreen";

export class App extends Component {
  persistor = persistStore(store);
  render() {
    return (
      <PersistGate loading={null} persistor={this.persistor}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <main>
              <Header />
              <Switch>`
                <Route exact path="/" component={LoginScreen} />`
                <Route exact path="/dash" component={BiaDashScreen} />
                <Route exact path="/create_project" component={CreateProjectScreen} />
                <Route exact path="/create_template" component={createTemplate}/>
              </Switch>
            </main>
          </ConnectedRouter>
        </Provider>
      </PersistGate>
    );
  }
}

export default App;
