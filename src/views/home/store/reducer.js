import * as actionTypes from "./constants";

const defaultState = {
  banners: [1,2,3],
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_BANNERS:
      return { ...state, banners: action.banners };
    default:
      return state;
  }
}

export default reducer