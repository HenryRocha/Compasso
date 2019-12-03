import api from "../api/api";

//import store from "../store";

export const postIdea = (
  _userId,
  _projectId,
  title,
  description
) => dispatch => {
  api.fetchAndDispatch("POST", "idea", "IDEA", {
    _userId,
    _projectId,
    title,
    description
  });
};
