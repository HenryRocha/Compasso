import { initialState } from "../store";

export function data(state = initialState.data, action) {
  switch (action.type) {
    case "api/POST_IDEA_SUCCESSFUL":
      if (action.payload && action.payload.ok) {
        const newIdea = state.ideas
          ? [...state.ideas, action.payload.idea]
          : [action.payload.idea];
        return { ...state, ideas: newIdea };
      } else {
        return { ...state };
      }
    case "api/GET_IDEAS_SUCCESSFUL":
      if (action.payload) {
        const ideas = state.ideas
          ? [...state.ideas, action.payload.ideas]
          : action.payload.ideas;
        return { ...state, ideas };
      }
    case "api/GET_QUIZZ_SUCCESSFUL":
      if (action.payload) {
        const quizzes =
          typeof action.payload.quizzes === Array
            ? action.payload.quizzes
            : action.payload.quizzes;
        const newQuizzes = state.quizzes
          ? [...state.quizzes].concat(quizzes)
          : quizzes;
        return { ...state, quizzes: newQuizzes };
      }
    default:
      return state;
  }
}
