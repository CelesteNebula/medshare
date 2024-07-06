<template>
  <div class="register-container">
    <h2 class="form-title">医生注册</h2>
    <form @submit.prevent="handleRegister" class="register-form">
      <input v-model="doctorId" type="text" placeholder="医生ID" required>
      <input v-model="password" type="password" placeholder="密码" required>
      <input v-model="doctorName" type="text" placeholder="医生姓名" required>
      <select v-model="doctorGender" required>
        <option disabled value="">请选择性别</option>
        <option>男</option>
        <option>女</option>
        <option>其他</option>
      </select>
      <button type="submit">注册</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '../services/authService';

export default {
  setup() {
    const doctorId = ref(''); // 医生ID
    const password = ref(''); // 密码
    const doctorName = ref(''); // 医生姓名
    const doctorGender = ref(''); // 医生性别

    const router = useRouter();

    const handleRegister = async () => {
      try {
        const registrationData = {
          doctorId: doctorId.value,
          password: password.value,
          doctorName: doctorName.value, // 确保传递医生姓名
          doctorGender: doctorGender.value // 确保传递医生性别
        };
        await register(registrationData); // 使用更新后的注册数据调用 register 函数
        alert("注册成功");
        router.push('/'); // 假设登录页面的路由是 /
      } catch (error) {
        alert("注册失败");
        console.error(error);
      }
    };

    return {
      doctorId,
      password,
      doctorName,
      doctorGender,
      handleRegister
    };
  }
}
</script>

<style>
.register-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9fcff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  color: #20416E;
  margin-bottom: 30px;
}

.register-form {
  display: flex;
  flex-direction: column;
}

.register-form input,
.register-form select {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.register-form button {
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  background-color: #20416E;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.register-form button:hover {
  background-color: #003366;
}
</style>