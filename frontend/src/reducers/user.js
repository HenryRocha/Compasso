import { initialState } from "../store";

export function user(state = initialState.user, action) {
  switch (action.type) {
    case "LOGIN_SUCCESSFUL":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
