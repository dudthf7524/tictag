import { combineReducers } from "redux";
import user from "./user";
import admin from "./admin";
import worker from "./worker";


const rootReducer = combineReducers({
  user,
  admin,
  worker,
});

export default rootReducer;