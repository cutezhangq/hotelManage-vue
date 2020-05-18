import axios from 'axios';
import {API} from '@/api/index'

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 5000,
    headers: {
      'Content-Type': "application/json;charset=utf-8",
      'Access-Control-Allow-Origin':'*'
    }
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;

//封装请求
function request(url, method, data, headers={}){
  return new Promise((resolve,reject)=>{
    axios({
      url: API + url,
      method,
      data,
      headers: {
        'Content-Type': "application/json;charset=utf-8",
        'Access-Control-Allow-Origin':'*'
      }
     })
      .then(res => {
        resolve(res.data);
      })
      .catch(err =>{
        reject(false);
      })
  })
}
export function get(url,data){
  return request(url, "GET", data);
}
export function post(url,data){
  return request(url,"POST",data);
}
