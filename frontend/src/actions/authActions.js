import { LOGIN, LOGOUT } from "../constants/action-types";

function login(user) {
  return { type: LOGIN, user };
}

function logout() {
  return { type: LOGOUT};
}


export {login, logout}
