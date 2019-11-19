import api from "../api/api";
import { persistor, history } from "../store";

export const login = (email, password) => async _dispatch => {
  try {
    const response = await api.fetchAndDispatch("POST", "login", "LOGIN", {
      email: email,
      password: password
    });
    history.push("/home");
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
      password: password
      //token: token
    });
    history.push("/home");
    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  persistor.purge();
};
