/*
 * @Author: lduoduo
 * @Date: 2020-07-21 22:19:36
 * @Last Modified by: zouhuan
 * @Last Modified time: 2020-07-22 17:24:28
 * 网络请求基础类库
 */

import axios from 'axios';
import qs from 'qs';

import ENV from '@/config/env';

const { API } = ENV;

const getUrl = (opts = {}) => {
  const { method = 'get', server = 'local', path = '', data = {} } = opts;

  if (!API[server]) return;

  const prefix = /^http/.test(API[server]) ? '' : '//';

  return `${prefix}${API[server]}${path}`
}

const doFetch = (opts = {}) => {
  const { method = 'get', server = '', path = '', data = {} } = opts;

  const url = getUrl(opts);

  if (!url) return;

  const options = {
    method,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url,
  };

  console.log('options', options);

  return axios(options).then(e => {
    /* eslint-disable @typescript-eslint/camelcase */
    const { data: { code: c, result: d, message } = {}, status = 200 } = e;
    // console.log('axios', e);

    if (status === 200 && c == 0) return Promise.resolve(d);
    return Promise.reject({ message: message || '网络错误' })
  })
  // .catch(e => {
  //   console.log('e', e.message)
  // });
}


export const get = (opts = {}) => {
  return doFetch({ ...opts, method: 'GET' })
}

export const post = (opts = {}) => {
  return doFetch({ ...opts, method: 'POST' })
}

export const put = (opts = {}) => {
  return doFetch({ ...opts, method: 'PUT' })
}

export default {
  get, post, put
}