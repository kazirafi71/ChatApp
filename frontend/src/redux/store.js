import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
