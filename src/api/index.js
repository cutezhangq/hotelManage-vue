import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

export const fetch_diamond = query => {
  return request({
      url: './diamond.json',
      method: 'get',
      params: query
  });
};

export const API = "http://localhost:8080/hotelManage"