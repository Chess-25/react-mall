import * as actionTypes from "./constants";

const defaultState = {
  cartList: [],
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CARTLIST:
      return { ...state, cartList: action.cartList };
    default:
      return state;
  }
}

export default reducer