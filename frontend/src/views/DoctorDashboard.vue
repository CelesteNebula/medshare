<template>
  <div class="doctor-dashboard">
    <div class="sidebar">
      <div class="logo">
        <!-- logo图片位置 -->
        <img src="@/assets/logo.png" alt="logo" />
      </div>
      <button :class="{ active: currentView === 'patientList' }" @click="currentView = 'patientList'">
        病人列表
      </button>
      <button :class="{ active: currentView === 'addPatient' }" @click="currentView = 'addPatient'">
        新增病人
      </button>
      <button :class="{ active: currentView === 'cooperation' }" @click="currentView = 'cooperation'">
        远程协作
      </button>
    </div>
    <div class="content">
      <!-- 上边栏 -->
      <div class="topbar">
        <div class="user-info">
          当前用户ID: {{ currentUserId }}
        </div>
        <button @click="logout">登出</button>
      </div>

      <div v-if="currentView === 'patientList'">
        <!-- 病人列表模块的内容 -->
        <h2>病人列表</h2>
        <table>
          <thead>
            <tr>
              <th>病历号</th>
              <th>姓名</th>
              <th>年龄</th>
              <th>性别</th>
              <th>手机号</th>
              <th>就诊时间</th>
              <th>相关文件</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in patients" :key="patient.id">
              <td>{{ patient.id }}</td>
              <td>{{ patient.name }}</td>
              <td>{{ patient.age }}</td>
              <td>{{ patient.gender }}</td>
              <td>{{ patient.phoneNumber }}</td>
              <td>{{ patient.visitTime }}</td>
              <td>
                <button v-if="patient.files && patient.files.length > 0" @click="showPatientFiles(patient)">
                  文件
                </button>
                <span v-else>无文件</span>
              </td>
              <td>
                <button @click="startEdit(patient)">编辑</button>
                <button @click="deletePatientMethod(patient.id)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>

        <button @click="fetchPatients" class="fetch-patients">刷新病人列表</button>
        <div v-if="editingPatient">
          <h2>编辑病人信息</h2>
          <form @submit.prevent="updatePatientInfo">
            名字: <input v-model="editingPatient.name" type="text" placeholder="名字"><br>
            年龄: <input v-model="editingPatient.age" type="number" placeholder="年龄"><br>
            性别: <input v-model="editingPatient.gender" type="text" placeholder="性别"><br>
            疾病: <input v-model="editingPatient.disease" type="text" placeholder="疾病"><br>
            电话: <input v-model="editingPatient.phoneNumber" type="text" placeholder="手机号" maxlength="11"><br>
            <button type="submit">更新信息</button>
          </form>
          <button @click="cancelEdit">取消</button>
        </div>
      </div>
      <div v-else-if="currentView === 'addPatient'">
        <!-- 新增病人模块的内容 -->
        <h2>新增病人</h2>
        <form @submit.prevent="addNewPatient">
          病号: <input v-model="newPatient.id" type="text" placeholder="病号"><br>
          名字: <input v-model="newPatient.name" type="text" placeholder="名字"><br>
          年龄: <input v-model="newPatient.age" type="number" placeholder="年龄"><br>
          性别: <input v-model="newPatient.gender" type="text" placeholder="性别"><br>
          疾病: <input v-model="newPatient.disease" type="text" placeholder="疾病"><br>
          电话: <input v-model="newPatient.phoneNumber" type="text" placeholder="手机号" maxlength="11"><br>
          <button type="submit">添加病人</button>
        </form>
      </div>
      <div v-else-if="currentView === 'cooperation'">
        <!-- 远程协作模块的内容 -->
        <h2>远程协作</h2>
        <div class="file-transfer">
          <!-- 文件传输界面 -->
          <div v-if="!isInRoom">
            <input v-model="roomCode" placeholder="输入4位房间代码" maxlength="4" />
            <button @click="createRoom">创建房间</button>
            <button @click="joinRoom">加入房间</button>
          </div>
          <div v-else>
            <p>当前房间代码: {{ roomCode }}</p>
            <button @click="leaveRoom">退出房间</button>
            <h2>文件传输</h2>
            <input type="file" @change="handleFileSelected" ref="fileInput" />
            <button @click="sendFile" :disabled="isSending">发送病历等文件</button>
            <p>文件传输状态: {{ fileTransferStatus }}</p>
          </div>
        </div>

        <div class="video-chat">
          <!-- 视频聊天界面 -->
          <div v-if="isInRoom">
            <h2>视频聊天</h2>
            <button @click="startChat">开始视频会诊</button>
            <button @click="endChat">结束视频会诊</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showFilesModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <img :src="currentFile" alt="病人文件">
      <div class="buttons-container"> <!-- 按钮容器 -->
        <button @click="previousFile">上一张</button>
        <button @click="nextFile">下一张</button>
      </div>
    </div>
  </div>


  <!-- WebSocket信号交换、房间组件 -->
  <WebRTCSignalExchange ref="webRTCSignalExchange" url="http://localhost:8080/signal" topic="/topic/offer"
    appDestination="/app/signal/offer" :roomCode=roomCode v-if="currentUserId" :currentUserId=currentUserId
    @file-transfer-complete="handleFileTransferComplete" @file-upload-request="handleUploadToServer"
    @join-room-success="handleJoinRoomSuccess" />

  <div v-if="errorMessage" class="error-message">
    错误：{{ errorMessage }}
  </div>

</template>

<script>
import API from '@/services/api';
import fileAPI from '@/services/fileAPI';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { addPatient, deletePatient, getPatientsByDoctorId, updatePatient } from '../services/patientService';
import WebRTCSignalExchange from './WebRTCSignalExchange.vue';

export default {
  watch: {
    currentView(newVal) {
      if (newVal === 'patientList') {
        this.fetchPatients();
      }
    }
  },

  components: {
    WebRTCSignalExchange,
  },

  data() {
    return {
      signalServerUrl: "http://localhost:8080/signal",
      signalTopic: "/topic/offer",
      appDestination: "/app/signal/offer",
      fileTransferStatus: '未开始',
      fileInput: null,
      roomCode: '',
      isInRoom: false,
      errorMessage: '', // 初始为空字符串
      currentUserId: sessionStorage.getItem("doctorId"),
      isSending: false, // 新增状态，控制发送按钮是否禁用

      currentView: 'patientList', // 默认显示病人列表
      showFilesModal: false,
      currentFileIndex: 0,
      patientFiles: [],
      currentFile: ''
    };
  },
  methods: {
    async createRoom() {
      if (this.roomCode.length !== 4) {
        alert("房间代码必须为4位。");
        return;
      }
      // 手动初始化WebSocket连接
      this.$refs.webRTCSignalExchange.initConnection();
      try {
        const response = await API.post('/api/createRoom', { roomCode: this.roomCode });
        // 如果请求成功，处理响应
        if (response.data.message === "房间创建成功，并已加入。") {
          this.isInRoom = true;
          this.fileTransferStatus = "房间创建成功，请选择文件或等待接收方加入。";
        }
      } catch (error) {
        // 如果请求失败，处理错误
        if (error.response && error.response.data) {
          // 服务器返回了一个错误消息
          console.error("创建房间失败:", error.response.data.error);
          alert(`创建房间失败: ${error.response.data.error}`);
        } else {
          // 处理其他类型的错误（例如网络问题或配置错误）
          console.error("请求失败:", error);
          alert("请求失败，请稍后再试。");
        }
      }
    },

    async joinRoom() {
      if (this.roomCode.length !== 4) {
        alert("房间代码必须为4位。");
        return;
      }
      // 手动初始化WebSocket连接
      this.$refs.webRTCSignalExchange.initConnection();
      // 调用修改后的逻辑来发送加入房间的请求
      this.sendRoomJoinSignal();
    },

    sendRoomJoinSignal() {
      // 由于WebSocket连接可能还没完全建立，我们通过轮询来等待连接建立
      const waitForConnectionAndSend = () => {
        if (this.$refs.webRTCSignalExchange.isConnected) {
          // 连接已建立，发送加入房间的请求
          API.post('/api/joinRoom', { roomCode: this.roomCode })
            .then(response => {
              if (response.data && response.data.message && response.data.message.includes("成功加入房间")) {
                this.isInRoom = true;
                this.fileTransferStatus = response.data.message;
              }
            })
            .catch(error => {
              console.error("加入房间失败:", error);
              alert("加入房间失败，请稍后再试。");
            });
        } else {
          setTimeout(waitForConnectionAndSend, 100); // 等待100毫秒后重试
        }
      };

      waitForConnectionAndSend();
    },

    async leaveRoom() {
      const response = await API.post('/api/leaveRoom', { roomCode: this.roomCode });
      if (response.data.message === "已成功离开房间。") {
        this.$refs.webRTCSignalExchange.$refs.videoChatComponent.cleanupVideoChat();
        this.resetRoomState();
      } else {
        alert("退出房间失败：" + response.data.error);
      }
    },

    resetRoomState() {
      this.isInRoom = false;
      this.roomCode = '';
      this.fileTransferStatus = '未开始';
      // 清理其他相关状态
    },

    handleFileSelected() {
      this.fileTransferStatus = "文件已选择，准备上传...";
    },

    sendFile() {
      if (!this.$refs.webRTCSignalExchange.$refs.fileTransferComponent.dataChannel ||
        this.$refs.webRTCSignalExchange.$refs.fileTransferComponent.dataChannel.readyState !== "open") {
        this.errorMessage = "数据通道未准备好或未开启，无法发送文件。";
        return;
      }
      const file = this.$refs.fileInput.files[0];
      if (!file) {
        this.errorMessage = "请先选择一个文件。";
        return;
      }
      this.fileTransferStatus = '正在发送...';
      this.isSending = true; // 设置发送状态为true，禁用发送按钮
      this.$refs.webRTCSignalExchange.$refs.fileTransferComponent.sendFile(file);
    },

    startChat() {
      // 手动发起视频聊天
      this.$refs.webRTCSignalExchange.startVideoChat();
    },

    endChat() {
      // 手动结束视频聊天
      this.$refs.webRTCSignalExchange.$refs.videoChatComponent.cleanupVideoChat();
    },

    handleFileTransferComplete() {
      // 更新UI状态以反映文件传输已完成
      this.fileTransferStatus = "文件传输完成";
      this.isSending = false;
    },

    handleJoinRoomSuccess() {
      // 更新UI状态以反映对方已成功加入房间
      this.fileTransferStatus = "对方已成功加入房间";
    },

    handleUploadToServer(selectedFile) {
      console.log("准备开始上传文件到数据库");
      console.log(selectedFile);
      const patientId = prompt("请输入病人ID：");
      if (patientId && selectedFile && selectedFile.file) {
        // 使用FormData准备文件和病人ID数据
        const formData = new FormData();
        formData.append("file", selectedFile.file); // 从selectedFile对象中提取Blob对象
        formData.append("patientId", patientId);

        // Debugging: 显示FormData内容
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }

        // 发送POST请求到服务器
        fileAPI.post('/api/uploadFile', formData, {
          headers: {
            // 移除'Content-Type': 'multipart/form-data'，让浏览器自动设置
          }
        }).then(() => {
          alert("文件上传成功！");
        }).catch(error => {
          console.error("文件上传失败", error);
          alert("文件上传失败！");
        });
      } else {
        alert("请确保已选择文件并输入病人ID");
      }
    },

    showPatientFiles(patient) {
      this.patientFiles = patient.files; // 假设每个patient对象有一个files数组
      this.currentFileIndex = 0; // 从第一个文件开始显示
      this.currentFile = this.patientFiles.length ? this.patientFiles[0] : '';
      this.showFilesModal = true;
    },
    closeModal() {
      this.showFilesModal = false;
    },
    previousFile() {
      if (this.patientFiles.length) {
        this.currentFileIndex = (this.currentFileIndex + this.patientFiles.length - 1) % this.patientFiles.length;
        this.currentFile = this.patientFiles[this.currentFileIndex];
      }
    },
    nextFile() {
      if (this.patientFiles.length) {
        this.currentFileIndex = (this.currentFileIndex + 1) % this.patientFiles.length;
        this.currentFile = this.patientFiles[this.currentFileIndex];
      }
    },

  },
  mounted() {
    this.fileInput = this.$refs.fileInput;
  },

  setup() {
    const router = useRouter();
    const patients = ref([]);
    const editingPatient = ref(null);

    const fetchPatients = async () => {
      try {
        // 假设登录时保存了医生ID
        const doctorId = sessionStorage.getItem("doctorId");
        if (!doctorId) {
          console.error('医生ID未找到,请确保已登录');
          return;
        }

        const response = await getPatientsByDoctorId(doctorId);
        const patientsData = response.data;

        // 更新patients响应式引用的值
        patients.value = patientsData;

        // 为每个病人获取文件信息
        for (let patient of patientsData) {
          await fetchPatientFiles(patient.id);
        }

      } catch (error) {
        console.error('获取病人列表失败:', error);
      }

    };

    //onMounted(fetchPatients);
    onMounted(() => {
      fetchPatients();
    });

    const startEdit = (patient) => {
      editingPatient.value = { ...patient };
      // 注意：确保你的后端返回的时间字符串是可以直接被这里处理的
    };

    //获取病人数据库的文件
    const fetchPatientFiles = async (patientId) => {
      try {
        const response = await API.get(`/api/patientFiles/${patientId}`);
        const files = response.data;
        if (files.length > 0) {
          const patientIndex = patients.value.findIndex(p => p.id === patientId);
          if (patientIndex !== -1) {
            // 注意：Vue 3的响应式更新方式
            patients.value[patientIndex].files = files; // 直接将文件数组分配给病人的files属性
            patients.value = [...patients.value]; // 通过替换整个数组来触发响应式更新
            //console.log("更新后数据", patients.value[patientIndex].file); // 确认更新后的数据
          }
        }
      } catch (error) {
        console.error("获取病人文件失败", error);
      }
    };

    const updatePatientInfo = async () => {
      try {
        const doctorId = sessionStorage.getItem("doctorId"); // 从sessionStorage中获取doctorId
        if (!doctorId) {
          throw new Error('医生ID未找到,请确保已登录。');
        }
        if (editingPatient.value.phoneNumber && editingPatient.value.phoneNumber.length !== 11) {
          throw new Error('手机号必须为11位');
        }
        await updatePatient(editingPatient.value, doctorId); // 注意传递doctorId作为第二个参数
        alert('病人信息更新成功');
        fetchPatients();
        editingPatient.value = null;
      } catch (error) {
        console.error('更新病人信息失败:', error);
      }
    };

    const cancelEdit = () => {
      editingPatient.value = null;
    };

    const newPatient = ref({});

    const addNewPatient = async () => {
      try {
        const doctorId = sessionStorage.getItem("doctorId"); // 获取当前登录医生的ID
        if (!doctorId) {
          throw new Error('医生ID未找到,请确保已登录');
        }
        if (newPatient.value.phoneNumber && newPatient.value.phoneNumber.length !== 11) {
          throw new Error('手机号必须为11位');
        }
        // 设置访问时间为当前时间，格式为YYYY-MM-DDTHH:mm:ss
        const currentTime = new Date().toISOString();
        const visitTime = currentTime.split('.')[0]; // 移除毫秒部分以符合您的格式要求

        const patientData = {
          ...newPatient.value,
          doctor: doctorId, // 这里假设API需要doctor作为一个字段
          visitTime: visitTime,
        };

        await addPatient(patientData, doctorId);
        alert('病人添加成功');
        fetchPatients();
        newPatient.value = {}; // 重置表单
      } catch (error) {
        console.error('添加病人失败:', error.message);
      }
    };

    const deletePatientMethod = async (patientId) => {
      try {
        const doctorId = sessionStorage.getItem("doctorId");
        if (!doctorId) {
          throw new Error('医生ID未找到,请确保已登录');
        }
        await deletePatient(patientId, doctorId); // 使用已定义的方法
        alert('病人删除成功');
        fetchPatients();
      } catch (error) {
        console.error('删除病人失败:', error.message);
      }
    };

    const logout = () => {
      // 清除本地存储中的JWT和医生ID
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("doctorId");
      // 重定向到登录界面
      router.push('/');
      // 关闭信令通道和WebRTC连接
    };

    return {
      patients,
      newPatient,
      editingPatient,
      fetchPatients,
      fetchPatientFiles,
      startEdit,
      addNewPatient,
      deletePatientMethod,
      updatePatientInfo,
      cancelEdit,
      logout,
    };
  },
};
</script>

<style scoped>
/* 确保.html和body没有额外的外边距或内边距 */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

/* 调整doctor-dashboard布局 */
.doctor-dashboard {
  display: flex;
  min-height: 100vh;
}

/* 侧边栏样式 */
.doctor-dashboard>div:first-child {
  width: 200px;
  background-color: #333;
  color: white;
  padding: 1rem;
}

.doctor-dashboard .logo {
  text-align: center;
  margin-bottom: 2rem;
  max-width: 80px;
}

.doctor-dashboard .logo img {
  width: 100%;
}

/* 内容区样式 */
.doctor-dashboard>div:nth-child(2) {
  flex-grow: 1;
  padding: 2rem;
}

/* 侧边栏样式 */
.sidebar {
  width: 200px;
  background-color: #333;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.sidebar button {
  background: none;
  border: none;
  color: white;
  padding: 10px;
  margin-bottom: 5px;
  text-align: left;
}

.sidebar button:hover {
  background-color: #555;
}

.sidebar button.active {
  /* 高亮时的背景色 */
  background-color: #666;
  /* 高亮时的文字颜色 */
  color: #fff;

}

/* 内容区样式 */
.content {
  flex-grow: 1;
  padding: 0;
  position: relative;
  /* 允许绝对定位的子元素相对于此定位 */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

/* 奇数行的样式 */
tr:nth-child(odd) {
  background-color: #f9f9f9;
}

/* 偶数行的样式 */
tr:nth-child(even) {
  background-color: #e6e6e6;
}

/* 分开“刷新病人列表”按钮与表格 */
button.fetch-patients {
  margin-bottom: 20px;
  /* 增加与表格的间距 */
}

/* 表中的编辑和删除按钮分开一定距离 */
table button {
  margin-right: 10px;
  /* 增加按钮之间的间距 */
}

/* 最后一个按钮取消右边距 */
table button:last-child {
  margin-right: 0;
}

/* 移除topbar的宽度限制 */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #eee;
  border-bottom: 1px solid #ddd;
}

/* 上边栏左侧模块标题样式 */
.topbar .module-title {
  font-size: 20px;
  /* 根据需要调整 */
  font-weight: bold;
}

/* 上边栏右侧内容 */
.topbar .right-content {
  display: flex;
  align-items: center;
}

.user-info {
  margin-right: auto;
  /* 推动所有元素到右侧 */
  padding-right: 20px;
  /* 或根据需要调整 */
}

.modal {
  display: block;
  /* 显示模态框 */
  position: fixed;
  /* 固定定位 */
  z-index: 2;
  /* 确保它在其他内容之上 */
  left: 0;
  top: 0;
  width: 100%;
  /* 全屏宽度 */
  height: 100%;
  /* 全屏高度 */
  background-color: rgba(0, 0, 0, 0.6);
  /* 半透明背景 */
  padding-top: 100px;
  /* 从顶部留出一些空间 */
}

.modal-content {
  display: flex;
  flex-direction: column;
  /* 改变布局方向为垂直 */
  align-items: center;
  /* 居中对齐 */
  justify-content: center;
  /* 内容居中 */
  padding: 20px;
  border: 1px solid #888;
  background-color: #fefefe;
  margin: auto;
  border-radius: 5px;
  width: auto;
  /* 宽度自适应内容 */
  max-width: 600px;
  /* 最大宽度，可根据需要调整 */
}

.modal-content img {
  max-width: 100%;
  /* 图片最大宽度为容器宽度 */
  max-height: 80vh;
  /* 最大高度不超过视窗高度的80% */
}

/* 按钮容器 */
.buttons-container {
  display: flex;
  width: 100%;
  /* 占满整个容器宽度 */
  justify-content: space-between;
  /* 按钮间距平均分布 */
}

/* 按钮样式 */
.modal-content button {
  padding: 10px 20px;
  margin: 10px;
  /* 增加按钮外边距 */
  font-size: 16px;
  border-radius: 5px;
  flex: none;
}


.close {
  position: absolute;
  /* 绝对定位 */
  top: 20px;
  /* 距离顶部20px */
  right: 30px;
  /* 距离右侧30px */
  color: #fff;
  /* 白色图标 */
  background-color: #f44336;
  /* 背景色 */
  border-radius: 50%;
  /* 圆形 */
  padding: 5px 12px;
  /* 内间距 */
  border: none;
  /* 无边框 */
  cursor: pointer;
  /* 鼠标指针效果 */
}

/* 表单样式优化 */
input[type="text"],
input[type="number"],
input[type="file"] {
  border: 1px solid #ccc;
  /* 更细的边框 */
  border-radius: 4px;
  /* 圆角 */
  padding: 10px;
  /* 更大的填充区域 */
  width: 90%;
  /* 输入框宽度 */
  margin-bottom: 15px;
  /* 增加与下一个元素的间距 */
}

button {
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  background-color: #007bff;
  /* 蓝色背景 */
  color: white;
  /* 白色文字 */
  cursor: pointer;
  transition: background-color 0.3s ease;
  /* 平滑过渡效果 */
}

button:hover {
  background-color: #0056b3;
  /* 按钮悬浮时的颜色变深 */
}

/* 分隔刷新按钮和表格 */
button.fetch-patients {
  margin: 20px;
}

/* 远程协作模块样式优化 */
.file-transfer,
.video-chat {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  /* 与下一个模块的间距 */
}

.file-transfer h2,
.video-chat h2 {
  margin-top: 0;
  color: #007bff;
  /* 主题颜色 */
}

/* 进度条样式（示例） */
.progress-bar {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  /* 确保内部元素不会溢出 */
}

.progress-bar-inner {
  height: 20px;
  background-color: #007bff;
  width: 0%;
  /* 初始宽度为0，之后通过JavaScript调整 */
  transition: width 0.4s ease;
  /* 平滑过渡效果 */
}

.file-transfer button {
  margin-left: 10px;
}

/* 错误消息样式 */
.error-message {
  color: red;
  margin-top: 1rem;
}

/* 其他特定部分的样式可以根据需要添加 */
</style>