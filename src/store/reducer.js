import { combineReducers } from "redux";

import { reducer as cartReducer } from "./cart";

const cReducer = combineReducers({
  cart: cartReducer,
});

export default cReducer;
