import { initialState } from "../store";

export function quizId(state = initialState.quizzId, action) {
  switch (action.type) {
    case "TOGGLE_QUIZ_MODAL":
      return action.payload.quizId;
    default:
      return state;
  }
}
