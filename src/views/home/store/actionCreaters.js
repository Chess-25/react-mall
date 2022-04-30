import * as actionTypes from "./constants";

import { getMultidata } from "@/services/home";
const changeGetMultidataAction = (res) => ({
  type:actionTypes.CHANGE_BANNERS,
  banners:res.data.banner.list
});
export const getMultidataAction = () => {
  return (dispatch) => {
    getMultidata().then((res) => {
      dispatch(changeGetMultidataAction(res))
    });
  };
};
