import { SEARCH_USER } from "./ChatTypes";

const init = { search_users: "" };

export const chatReducer = (state = init, action) => {
  switch (action.type) {
    case SEARCH_USER: {
      return {
        ...init,
        search_users: action.payload,
      };
    }
    default:
      return { state };
  }
};
