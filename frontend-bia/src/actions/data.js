import api from "../api/api";
//import store from "../store";

export const postProject = project => dispatch => {
  api.fetchAndDispatch("POST", "projects", "POST_PROJECT");
  //store.dispatch({ type: "POST_PROJECT_SUCCESSFULL", payload: project });
};
