import api from "../api/api";

import store, { persistor, history } from "../store";
import actions from ".";

export const login = (email, password) => async _dispatch => {
  try {
    const response = await api.fetchAndDispatch("POST", "login", "LOGIN", {
      email: email,
      password: password
    });
    history.push("/home");
    store.dispatch(actions.getIdeas(response.data.id));
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = (name, email, password, token) => async _dispatch => {
  try {
    const response = await api.fetchAndDispatch("POST", "user", "USER", {
      name: name,
      email: email,
      password: password,
      projectToken: token
    });
    history.push("/home");
    store.dispatch(actions.getIdeas(response.data.id));
    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  persistor.purge();
  window.location.href = "/";
};
