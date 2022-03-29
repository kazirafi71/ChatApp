import { combineReducers } from "redux";
import { chatReducer } from "./Chat/ChatReducer";

const rootReducer = combineReducers({
  chat: chatReducer,
});

export default rootReducer;
