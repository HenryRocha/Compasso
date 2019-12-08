import * as userActions from "./user";
import * as dataActions from "./data";
import * as uiActions from "./ui";

const actions = {
  ...userActions,
  ...dataActions,
  ...uiActions
};

export default actions;
