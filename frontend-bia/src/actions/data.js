import api from "../api/api";
import store, { persistor, history } from "../store";
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

export const getProjects = userId => async _dispatch => {
  await api.fetchAndDispatch("GET", `projects?userId=${userId}`, "PROJECTS");
};

export const postProject = (
  title,
  description,
  email,
  quizzes,
  ) => async _dispatch => {
    try{
      const response = await api.fetchAndDispatch("POST", `projects`, "PROJECTS", {
        title,
        description,
        email,
        quizzes,
      });
      await store.dispatch(actions.getProjects(store.user._userId));
      history.push("/dash");
      return response
    }catch(error){
      throw error;
    }
};

export const setProject = project => async _dispatch => {
  console.log("Project: " + project)
  store.dispatch({
    type: `SETPROJECT`,
    payload: {project}
  });
  history.push("/project_details");
  return project;
};

export const getTemplates = () => async _dispatch => {
  await api.fetchAndDispatch("GET", `templates`, "TEMPLATES");
};

export const postTemplate = (
  title,
  description,
  questions
  ) => async _dispatch => {
    console.log("Aqui" + title + description + questions)
    try{
      const response = await api.fetchAndDispatch("POST", `template`, "TEMPLATES", {
        title,
        description,
        questions
      });
      await store.dispatch(actions.getTemplates());
      history.push("/dash");
      return response
    }catch(error){
      throw error;
    }
};

export const setTemplate = template => async _dispatch => {
  console.log("Template: " + template)
  store.dispatch({
    type: `SETTEMPLATE`,
    payload: {template}
  });
  history.push("/template_details");
  return template;
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
      `quizzes?quizId=${quizId}`,
      "QUIZZ",
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};
