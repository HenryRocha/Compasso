import { initialState } from "../store";

export function data(state = initialState.data, action) {
  switch (action.type) {
    case "POST_PROJECT_SUCCESSFULL":
      if (state.projects) {
        const newProjects = [...state.projects, action.payload];
        return { ...state, projects: newProjects };
      } else {
        return { ...state, projects: [action.payload] };
      }

    default:
      return state;
  }
}
