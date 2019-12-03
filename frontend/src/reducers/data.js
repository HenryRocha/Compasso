import { initialState } from "../store";

export function data(state = initialState.data, action) {
  switch (action.type) {
    case "api/POST_IDEA_SUCCESSFUL":
      if (action.payload && action.payload.ok) {
        const newIdea = state.ideas
          ? [...state.ideas, action.payload]
          : [action.payload];
        return { ...state, ideas: newIdea };
      } else {
        return { ...state };
      }
    default:
      return state;
  }
}
