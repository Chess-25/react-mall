import React, { memo, useEffect} from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { getMultidataAction } from "./store/actionCreaters";
import { Button } from 'antd-mobile'
function Home(props) {
  const { banners } = useSelector((state) => ({
    banners: state.home.banners,
  }),shallowEqual);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMultidataAction());
  }, [dispatch]);

  return (
    <div>
      <Button>
        Default
      </Button>
      <div>
        {banners.length>0&&banners.map((item, index) => {
          return (
            <div className="banner-item" key={index}>
              <img className="image" src={item.image} alt={item.title}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(Home);