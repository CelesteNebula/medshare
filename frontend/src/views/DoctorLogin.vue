<template>
  <div class="login-wrapper">
    <div class="header">
      <img src="@/assets/logo.png" alt="Logo" class="logo">
    </div>
    <div class="login-container">
      <h2>医生登录</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <input v-model="doctorId" type="text" placeholder="医生ID" required>
        <input v-model="password" type="password" placeholder="密码" required>
        <button type="submit">登录</button>
      </form>
      <button @click="navigateToRegister" class="register-btn">注册新医生</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/authService';

export default {
  setup() {
    const doctorId = ref('');
    const password = ref('');
    const router = useRouter();

    const handleLogin = async () => {
      try {
        const result = await login(doctorId.value, password.value);
        if (result.success) {
          router.push('/doctor-dashboard');
        } else {
          alert(`登录失败: ${result.message}`);
        }
      } catch (error) {
        alert("登录过程中发生错误，请稍后再试。");
        console.error("Login process error:", error);
      }
    };

    const navigateToRegister = () => {
      router.push('/doctor-register'); // 假设注册界面的路由是 /doctor-register
    };

    return { doctorId, password, handleLogin, navigateToRegister };
  }
}
</script>

<style scoped>
.logo {
  margin-top: 40px;
  max-width: 80px;
  /* 根据需要调整Logo的大小 */
}

.login-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  padding-bottom: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: #f9fcff;
}

.login-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.login-form button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #20416E;
  color: white;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #003366;
}

.register-btn {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  background-color: #2196F3;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.register-btn:hover {
  background-color: #007BFF;
}
</style>