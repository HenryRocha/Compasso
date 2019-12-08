import store from "../store";

export const toggleQuizModal = quizId => async dispatch => {
  await store.dispatch({ type: "TOGGLE_QUIZ_MODAL", payload: { quizId } });
};
