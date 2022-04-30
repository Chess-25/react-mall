import request from './request';

export function getMultidata() {
  return request({
    url: "/category/multidata",
  })
}

export function getCategoryData(cate,type,page) {
  return request({
    url: "category/data",
    params: {
      cate,
      type,
      page
    }
  })
}