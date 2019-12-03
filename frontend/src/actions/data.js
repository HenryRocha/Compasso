import api from "../api/api";

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
};

export const getIdeas = userId => async _dispatch => {
  await api.fetchAndDispatch("GET", `user/ideas?userId=${userId}`, "IDEAS");
};
