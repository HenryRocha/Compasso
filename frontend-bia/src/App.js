import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import store from "./store";
import "./App.css";
import { history } from "./store";
import BiaDashScreen from "./screens/BiaDashScreen";
import CreateProjectScreen from "./screens/CreateProjectScreen";
import Header from "./components/Header";
import createQuizzes from "./screens/CreateQuizzes"
import DetalheProjeto from "./screens/DetalheProjeto"

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
                <Route exact path="/dash" component={BiaDashScreen} />
                <Route exact path="/create_project" component={CreateProjectScreen} />
                <Route exact path="/create_quizzes" component={createQuizzes}/>
                <Route exact path="/detalhe_projeto" component={DetalheProjeto}/>
              </Switch>
            </main>
          </ConnectedRouter>
        </Provider>
      </PersistGate>
    );
  }
}

export default App;
