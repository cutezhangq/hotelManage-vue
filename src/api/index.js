import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
//G2的散点图数据
export const fetch_diamond = query => {
  return request({
      url: './diamond.json',
      method: 'get',
      params: query
  });
};
export const fetch_keywords = query => {
  return request({
      url: './antv-keywords.json',
      method: 'get',
      params: query
  });
};
export const fetch_AnimatBar = query => {
  return request({
      url: './china-gdp.json',
      method: 'get',
      params: query
  });
};

export const DataSet = require('@antv/data-set');
export const API = "http://localhost:8080/hotelManage"