// src/services/fileAPI.js
import axios from 'axios';

const fileAPI = axios.create({
  //baseURL: 'http://10.102.226.45:8080/',
  baseURL: 'http://localhost:8080/',
  headers: {
    
  }
});

// 请求拦截器
fileAPI.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  console.log("fileAPI拦截器处token",token);
  if (token) {
    config.headers['Authorization'] = token; // 添加JWT授权头部
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default fileAPI;
