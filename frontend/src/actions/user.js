import api from "../api/api";
import { persistor } from "../store";

export const login = (email, password) => _dispatch => {
  api.fetchAndDispatch("GET", "login", "LOGIN", {
    email: email,
    password: password
  });
};

export const register = (email, password, token) => _dispatch => {
  api.fetchAndDispatch("GET", "register", "REGISTER", {
    email: email,
    password: password,
    token: token
  });
};

export const logout = () => {
  persistor.purge();
};
