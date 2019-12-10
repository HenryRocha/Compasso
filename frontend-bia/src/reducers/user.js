import { initialState } from "../store";

export function user(state = initialState.user, action) {
  switch (action.type) {
    case "api/POST_USER_SUCCESSFUL":
      return { ...action.payload };
    case "api/POST_LOGIN_SUCCESSFUL":
      return { ...action.payload };
    default:
      return state;
  }
}
