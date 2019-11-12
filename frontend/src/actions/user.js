import api from "../api/api";
import { persistor } from "../store";

export const login = (email, password) => _dispatch => {
  api.fetchAndDispatch("GET", "login", "LOGIN");
};

export const logout = () => {
  persistor.purge();
};
