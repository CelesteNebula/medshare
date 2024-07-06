// src/services/api.js
import axios from 'axios';

const API = axios.create({
  //baseURL: 'http://10.102.226.45:8080/',
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  }
});

// 请求拦截器
API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  console.log("拦截器处token",token);
  if (token) {
    config.headers['Authorization'] = token; // 添加JWT授权头部
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default API;
