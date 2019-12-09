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
          action.payload.quizzes && action.payload.quizzes.length > 0
            ? action.payload.quizzes
            : [];
        const a = state.quizzes ? [...state.quizzes] : [];
        if (a && a.length > 0) {
          quizzes
            .map(q => q._id)
            .map((id, index) => {
              if (!state.quizzes.map((q, i) => q._id).includes(id)) {
                a.push(quizzes[index]);
              }
            });

          return { ...state, quizzes: a };
        }
        return { ...state, quizzes: quizzes };
      }
    case "api/PATCH_QUIZ_SUCCESSFUL":
      const oldQuizzes = { ...state.quizzes };
      const index = oldQuizzes.map(q => q._id).indexOf(action.payload._id);
      oldQuizzes[index] = action.payload;
      return { ...state, quizzes: oldQuizzes };
    default:
      return state;
  }
}
