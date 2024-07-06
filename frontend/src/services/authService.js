// src/services/authService.js
import API from './api';

const login = async (doctorId, password) => {
  // 清除可能存在的旧令牌
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("doctorId");
  try {
    const response = await API.post('/login', {
      username: doctorId,
      password: password
    });
    // 假设后端直接返回令牌字符串，而不是一个包含`token`字段的对象
    const token = response.data;
    console.log("登录时后端返回字符串token为",token);
    if (token && token.startsWith('Bearer ')) {
      sessionStorage.setItem("token", token); // 存储JWT
      sessionStorage.setItem("doctorId", doctorId); // 存储医生ID
      return { success: true, token: token };
    } else {
      return { success: false, message: "No token received" };
    }
  } catch (error) {
    console.error("Login error:", error.response);
    // 提取并返回后端可能发送的具体错误消息
    const errorMessage = error.response && error.response.data ? (error.response.data.error || error.response.data) : "Login failed";
    return { success: false, message: errorMessage };
  }
};

const register = (data) => {
  return API.post('/register', data);
};

//const logout = () => {
  //sessionStorage.removeItem("token"); // 移除存储的JWT
  // 进一步处理，比如重定向到登录页面
//};


export { login, register };
