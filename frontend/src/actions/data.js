import api from "../api/api";
import store from "../store";
import actions from ".";

export const postIdea = (
  _userId,
  _projectId,
  title,
  description
) => async _dispatch => {
  await api.fetchAndDispatch("POST", "idea", "IDEA", {
    _userId,
    _projectId,
    title,
    description
  });
  await store.dispatch(actions.getQuizzes());
};

export const getIdeas = userId => async _dispatch => {
  await api.fetchAndDispatch("GET", `user/ideas?userId=${userId}`, "IDEAS");
};

export const getQuizz = (userId, ideaId) => async _dispatch => {
  try {
    const response = await api.fetchAndDispatch(
      "GET",
      `idea/quizzes?userId=${userId}&ideaId=${ideaId}`,
      "QUIZZ"
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getQuizzes = () => async _dispatch => {
  const { user, data } = store.getState();
  data.ideas &&
    (await data.ideas.map(idea =>
      store.dispatch(actions.getQuizz(user.id, idea._id))
    ));
};

export const patchQuizz = (quizId, data) => async _dispatch => {
  try {
    const response = await api.fetchAndDispatch(
      "PATCH",
      `quiz?quizId=${quizId}`,
      "QUIZZ",
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};
