import * as actionTypes from "./constants";

const changeCartListAction = (cartList) => ({
  type:actionTypes.CHANGE_CARTLIST,
  cartList:cartList,
});
export const cartListAction = (cartList) => {
  return (dispatch) => {
    // 1.根据id查找cartList中是否已经有了该商品
    dispatch(changeCartListAction(cartList))
  };
};
