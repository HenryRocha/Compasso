import * as userActions from "./user";
import * as dataActions from "./data";

const actions = {
  ...userActions,
  ...dataActions
};

export default actions;
