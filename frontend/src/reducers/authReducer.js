import {LOGIN, LOGOUT} from "../constants/action-types"
// Initial State
const initialState = {
    loggedIn: false,
    email: null,
    id: null
  };// Reducers (Modifies The State And Returns A New State)
  const authReducer = (state = initialState, action) => {
    switch (action.type) {    // Login
      case LOGIN: {
        return {
          // State
          ...state,
          // Redux Store
          loggedIn: true,
          email: action.user.email,
          id: action.user.id,
        }
      }case LOGOUT: {
        return {
          // State
          ...state,
          // Redux Store
          loggedIn: false,
          email: null,
          id: null,
        }
      }    // Default
      default: {
        return state;
      }
    }
  };// Exports
  export default authReducer;