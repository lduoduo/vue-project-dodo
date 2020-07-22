import { get, post, put } from './fetch';

export const getCategoryList = (param) => {
  return get({
    path: '/getCategoryList',
    data: param,
  })
}

export const getCategoryIdList = (param) => {
  return get({
    path: '/getCategoryIdList',
    data: param
  })
}

export default { getCategoryList, getCategoryIdList }