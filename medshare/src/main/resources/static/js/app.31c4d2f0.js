(function(){"use strict";var e={1007:function(e,t,n){var o=n(5130),i=n(6768);const s=(0,i.Lk)("nav",null,null,-1);function a(e,t){const n=(0,i.g2)("router-view");return(0,i.uX)(),(0,i.CE)(i.FK,null,[s,(0,i.bF)(n)],64)}var r=n(1241);const l={},d=(0,r.A)(l,[["render",a]]);var c=d,h=n(1387),u=n.p+"img/logo.88596d9d.png";const p=e=>((0,i.Qi)("data-v-4972fc7c"),e=e(),(0,i.jt)(),e),f={class:"login-wrapper"},g=p((()=>(0,i.Lk)("div",{class:"header"},[(0,i.Lk)("img",{src:u,alt:"Logo",class:"logo"})],-1))),m={class:"login-container"},C=p((()=>(0,i.Lk)("h2",null,"医生登录",-1))),v=p((()=>(0,i.Lk)("button",{type:"submit"},"登录",-1)));function k(e,t,n,s,a,r){return(0,i.uX)(),(0,i.CE)("div",f,[g,(0,i.Lk)("div",m,[C,(0,i.Lk)("form",{onSubmit:t[2]||(t[2]=(0,o.D$)(((...e)=>s.handleLogin&&s.handleLogin(...e)),["prevent"])),class:"login-form"},[(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>s.doctorId=e),type:"text",placeholder:"医生ID",required:""},null,512),[[o.Jo,s.doctorId]]),(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[1]||(t[1]=e=>s.password=e),type:"password",placeholder:"密码",required:""},null,512),[[o.Jo,s.password]]),v],32),(0,i.Lk)("button",{onClick:t[3]||(t[3]=(...e)=>s.navigateToRegister&&s.navigateToRegister(...e)),class:"register-btn"},"注册新医生")])])}n(4114);var b=n(144),y=n(8355);const L=y.A.create({baseURL:"http://localhost:8080/",headers:{"Content-Type":"application/json;charset=utf-8"}});L.interceptors.request.use((e=>{const t=sessionStorage.getItem("token");return console.log("拦截器处token",t),t&&(e.headers["Authorization"]=t),e}),(e=>Promise.reject(e)));var S=L;const w=async(e,t)=>{sessionStorage.removeItem("token"),sessionStorage.removeItem("doctorId");try{const n=await S.post("/login",{username:e,password:t}),o=n.data;return console.log("登录时后端返回字符串token为",o),o&&o.startsWith("Bearer ")?(sessionStorage.setItem("token",o),sessionStorage.setItem("doctorId",e),{success:!0,token:o}):{success:!1,message:"No token received"}}catch(n){console.error("Login error:",n.response);const e=n.response&&n.response.data?n.response.data.error||n.response.data:"Login failed";return{success:!1,message:e}}},I=e=>S.post("/register",e);var R={setup(){const e=(0,b.KR)(""),t=(0,b.KR)(""),n=(0,h.rd)(),o=async()=>{try{const o=await w(e.value,t.value);o.success?n.push("/doctor-dashboard"):alert(`登录失败: ${o.message}`)}catch(o){alert("登录过程中发生错误，请稍后再试。"),console.error("Login process error:",o)}},i=()=>{n.push("/doctor-register")};return{doctorId:e,password:t,handleLogin:o,navigateToRegister:i}}};const T=(0,r.A)(R,[["render",k],["__scopeId","data-v-4972fc7c"]]);var F=T;const E={class:"register-container"},$=(0,i.Lk)("h2",{class:"form-title"},"医生注册",-1),P=(0,i.Lk)("option",{disabled:"",value:""},"请选择性别",-1),V=(0,i.Lk)("option",null,"男",-1),D=(0,i.Lk)("option",null,"女",-1),U=(0,i.Lk)("option",null,"其他",-1),x=[P,V,D,U],M=(0,i.Lk)("button",{type:"submit"},"注册",-1);function O(e,t,n,s,a,r){return(0,i.uX)(),(0,i.CE)("div",E,[$,(0,i.Lk)("form",{onSubmit:t[4]||(t[4]=(0,o.D$)(((...e)=>s.handleRegister&&s.handleRegister(...e)),["prevent"])),class:"register-form"},[(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>s.doctorId=e),type:"text",placeholder:"医生ID",required:""},null,512),[[o.Jo,s.doctorId]]),(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[1]||(t[1]=e=>s.password=e),type:"password",placeholder:"密码",required:""},null,512),[[o.Jo,s.password]]),(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[2]||(t[2]=e=>s.doctorName=e),type:"text",placeholder:"医生姓名",required:""},null,512),[[o.Jo,s.doctorName]]),(0,i.bo)((0,i.Lk)("select",{"onUpdate:modelValue":t[3]||(t[3]=e=>s.doctorGender=e),required:""},x,512),[[o.u1,s.doctorGender]]),M],32)])}var N={setup(){const e=(0,b.KR)(""),t=(0,b.KR)(""),n=(0,b.KR)(""),o=(0,b.KR)(""),i=(0,h.rd)(),s=async()=>{try{const s={doctorId:e.value,password:t.value,doctorName:n.value,doctorGender:o.value};await I(s),alert("注册成功"),i.push("/")}catch(s){alert("注册失败"),console.error(s)}};return{doctorId:e,password:t,doctorName:n,doctorGender:o,handleRegister:s}}};const J=(0,r.A)(N,[["render",O]]);var j=J,X=n(4232);const W=e=>((0,i.Qi)("data-v-28b1baf9"),e=e(),(0,i.jt)(),e),A={class:"doctor-dashboard"},q={class:"sidebar"},_=W((()=>(0,i.Lk)("div",{class:"logo"},[(0,i.Lk)("img",{src:u,alt:"logo"})],-1))),K={class:"content"},B={class:"topbar"},Q={class:"user-info"},Y={key:0},z=W((()=>(0,i.Lk)("h2",null,"病人列表",-1))),G=W((()=>(0,i.Lk)("thead",null,[(0,i.Lk)("tr",null,[(0,i.Lk)("th",null,"病历号"),(0,i.Lk)("th",null,"姓名"),(0,i.Lk)("th",null,"年龄"),(0,i.Lk)("th",null,"性别"),(0,i.Lk)("th",null,"手机号"),(0,i.Lk)("th",null,"就诊时间"),(0,i.Lk)("th",null,"相关文件"),(0,i.Lk)("th",null,"操作")])],-1))),H=["onClick"],Z={key:1},ee=["onClick"],te=["onClick"],ne={key:0},oe=W((()=>(0,i.Lk)("h2",null,"编辑病人信息",-1))),ie=W((()=>(0,i.Lk)("br",null,null,-1))),se=W((()=>(0,i.Lk)("br",null,null,-1))),ae=W((()=>(0,i.Lk)("br",null,null,-1))),re=W((()=>(0,i.Lk)("br",null,null,-1))),le=W((()=>(0,i.Lk)("br",null,null,-1))),de=W((()=>(0,i.Lk)("button",{type:"submit"},"更新信息",-1))),ce={key:1},he=W((()=>(0,i.Lk)("h2",null,"新增病人",-1))),ue=W((()=>(0,i.Lk)("br",null,null,-1))),pe=W((()=>(0,i.Lk)("br",null,null,-1))),fe=W((()=>(0,i.Lk)("br",null,null,-1))),ge=W((()=>(0,i.Lk)("br",null,null,-1))),me=W((()=>(0,i.Lk)("br",null,null,-1))),Ce=W((()=>(0,i.Lk)("br",null,null,-1))),ve=W((()=>(0,i.Lk)("button",{type:"submit"},"添加病人",-1))),ke={key:2},be=W((()=>(0,i.Lk)("h2",null,"远程协作",-1))),ye={class:"file-transfer"},Le={key:0},Se={key:1},we=W((()=>(0,i.Lk)("h2",null,"文件传输",-1))),Ie=["disabled"],Re={class:"video-chat"},Te={key:0},Fe=W((()=>(0,i.Lk)("h2",null,"视频聊天",-1))),Ee={key:0,class:"modal"},$e={class:"modal-content"},Pe=["src"],Ve={class:"buttons-container"},De={key:2,class:"error-message"};function Ue(e,t,n,s,a,r){const l=(0,i.g2)("WebRTCSignalExchange");return(0,i.uX)(),(0,i.CE)(i.FK,null,[(0,i.Lk)("div",A,[(0,i.Lk)("div",q,[_,(0,i.Lk)("button",{class:(0,X.C4)({active:"patientList"===a.currentView}),onClick:t[0]||(t[0]=e=>a.currentView="patientList")}," 病人列表 ",2),(0,i.Lk)("button",{class:(0,X.C4)({active:"addPatient"===a.currentView}),onClick:t[1]||(t[1]=e=>a.currentView="addPatient")}," 新增病人 ",2),(0,i.Lk)("button",{class:(0,X.C4)({active:"cooperation"===a.currentView}),onClick:t[2]||(t[2]=e=>a.currentView="cooperation")}," 远程协作 ",2)]),(0,i.Lk)("div",K,[(0,i.Lk)("div",B,[(0,i.Lk)("div",Q," 当前用户ID: "+(0,X.v_)(a.currentUserId),1),(0,i.Lk)("button",{onClick:t[3]||(t[3]=(...e)=>s.logout&&s.logout(...e))},"登出")]),"patientList"===a.currentView?((0,i.uX)(),(0,i.CE)("div",Y,[z,(0,i.Lk)("table",null,[G,(0,i.Lk)("tbody",null,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(s.patients,(e=>((0,i.uX)(),(0,i.CE)("tr",{key:e.id},[(0,i.Lk)("td",null,(0,X.v_)(e.id),1),(0,i.Lk)("td",null,(0,X.v_)(e.name),1),(0,i.Lk)("td",null,(0,X.v_)(e.age),1),(0,i.Lk)("td",null,(0,X.v_)(e.gender),1),(0,i.Lk)("td",null,(0,X.v_)(e.phoneNumber),1),(0,i.Lk)("td",null,(0,X.v_)(e.visitTime),1),(0,i.Lk)("td",null,[e.files&&e.files.length>0?((0,i.uX)(),(0,i.CE)("button",{key:0,onClick:t=>r.showPatientFiles(e)}," 文件 ",8,H)):((0,i.uX)(),(0,i.CE)("span",Z,"无文件"))]),(0,i.Lk)("td",null,[(0,i.Lk)("button",{onClick:t=>s.startEdit(e)},"编辑",8,ee),(0,i.Lk)("button",{onClick:t=>s.deletePatientMethod(e.id)},"删除",8,te)])])))),128))])]),(0,i.Lk)("button",{onClick:t[4]||(t[4]=(...e)=>s.fetchPatients&&s.fetchPatients(...e)),class:"fetch-patients"},"刷新病人列表"),s.editingPatient?((0,i.uX)(),(0,i.CE)("div",ne,[oe,(0,i.Lk)("form",{onSubmit:t[10]||(t[10]=(0,o.D$)(((...e)=>s.updatePatientInfo&&s.updatePatientInfo(...e)),["prevent"]))},[(0,i.eW)(" 名字: "),(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[5]||(t[5]=e=>s.editingPatient.name=e),type:"text",placeholder:"名字"},null,512),[[o.Jo,s.editingPatient.name]]),ie,(0,i.eW)(" 年龄: "),(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[6]||(t[6]=e=>s.editingPatient.age=e),type:"number",placeholder:"年龄"},null,512),[[o.Jo,s.editingPatient.age]]),se,(0,i.eW)(" 性别: "),(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[7]||(t[7]=e=>s.editingPatient.gender=e),type:"text",placeholder:"性别"},null,512),[[o.Jo,s.editingPatient.gender]]),ae,(0,i.eW)(" 疾病: "),(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[8]||(t[8]=e=>s.editingPatient.disease=e),type:"text",placeholder:"疾病"},null,512),[[o.Jo,s.editingPatient.disease]]),re,(0,i.eW)(" 电话: "),(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[9]||(t[9]=e=>s.editingPatient.phoneNumber=e),type:"text",placeholder:"手机号",maxlength:"11"},null,512),[[o.Jo,s.editingPatient.phoneNumber]]),le,de],32),(0,i.Lk)("button",{onClick:t[11]||(t[11]=(...e)=>s.cancelEdit&&s.cancelEdit(...e))},"取消")])):(0,i.Q3)("",!0)])):"addPatient"===a.currentView?((0,i.uX)(),(0,i.CE)("div",ce,[he,(0,i.Lk)("form",{onSubmit:t[18]||(t[18]=(0,o.D$)(((...e)=>s.addNewPatient&&s.addNewPatient(...e)),["prevent"]))},[(0,i.eW)(" 病号: "),(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[12]||(t[12]=e=>s.newPatient.id=e),type:"text",placeholder:"病号"},null,512),[[o.Jo,s.newPatient.id]]),ue,(0,i.eW)(" 名字: "),(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[13]||(t[13]=e=>s.newPatient.name=e),type:"text",placeholder:"名字"},null,512),[[o.Jo,s.newPatient.name]]),pe,(0,i.eW)(" 年龄: "),(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[14]||(t[14]=e=>s.newPatient.age=e),type:"number",placeholder:"年龄"},null,512),[[o.Jo,s.newPatient.age]]),fe,(0,i.eW)(" 性别: "),(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[15]||(t[15]=e=>s.newPatient.gender=e),type:"text",placeholder:"性别"},null,512),[[o.Jo,s.newPatient.gender]]),ge,(0,i.eW)(" 疾病: "),(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[16]||(t[16]=e=>s.newPatient.disease=e),type:"text",placeholder:"疾病"},null,512),[[o.Jo,s.newPatient.disease]]),me,(0,i.eW)(" 电话: "),(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[17]||(t[17]=e=>s.newPatient.phoneNumber=e),type:"text",placeholder:"手机号",maxlength:"11"},null,512),[[o.Jo,s.newPatient.phoneNumber]]),Ce,ve],32)])):"cooperation"===a.currentView?((0,i.uX)(),(0,i.CE)("div",ke,[be,(0,i.Lk)("div",ye,[a.isInRoom?((0,i.uX)(),(0,i.CE)("div",Se,[(0,i.Lk)("p",null,"当前房间代码: "+(0,X.v_)(a.roomCode),1),(0,i.Lk)("button",{onClick:t[22]||(t[22]=(...e)=>r.leaveRoom&&r.leaveRoom(...e))},"退出房间"),we,(0,i.Lk)("input",{type:"file",onChange:t[23]||(t[23]=(...e)=>r.handleFileSelected&&r.handleFileSelected(...e)),ref:"fileInput"},null,544),(0,i.Lk)("button",{onClick:t[24]||(t[24]=(...e)=>r.sendFile&&r.sendFile(...e)),disabled:a.isSending},"发送病历等文件",8,Ie),(0,i.Lk)("p",null,"文件传输状态: "+(0,X.v_)(a.fileTransferStatus),1)])):((0,i.uX)(),(0,i.CE)("div",Le,[(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":t[19]||(t[19]=e=>a.roomCode=e),placeholder:"输入4位房间代码",maxlength:"4"},null,512),[[o.Jo,a.roomCode]]),(0,i.Lk)("button",{onClick:t[20]||(t[20]=(...e)=>r.createRoom&&r.createRoom(...e))},"创建房间"),(0,i.Lk)("button",{onClick:t[21]||(t[21]=(...e)=>r.joinRoom&&r.joinRoom(...e))},"加入房间")]))]),(0,i.Lk)("div",Re,[a.isInRoom?((0,i.uX)(),(0,i.CE)("div",Te,[Fe,(0,i.Lk)("button",{onClick:t[25]||(t[25]=(...e)=>r.startChat&&r.startChat(...e))},"开始视频会诊"),(0,i.Lk)("button",{onClick:t[26]||(t[26]=(...e)=>r.endChat&&r.endChat(...e))},"结束视频会诊")])):(0,i.Q3)("",!0)])])):(0,i.Q3)("",!0)])]),a.showFilesModal?((0,i.uX)(),(0,i.CE)("div",Ee,[(0,i.Lk)("div",$e,[(0,i.Lk)("span",{class:"close",onClick:t[27]||(t[27]=(...e)=>r.closeModal&&r.closeModal(...e))},"×"),(0,i.Lk)("img",{src:a.currentFile,alt:"病人文件"},null,8,Pe),(0,i.Lk)("div",Ve,[(0,i.Lk)("button",{onClick:t[28]||(t[28]=(...e)=>r.previousFile&&r.previousFile(...e))},"上一张"),(0,i.Lk)("button",{onClick:t[29]||(t[29]=(...e)=>r.nextFile&&r.nextFile(...e))},"下一张")])])])):(0,i.Q3)("",!0),a.currentUserId?((0,i.uX)(),(0,i.Wv)(l,{key:1,ref:"webRTCSignalExchange",url:"http://localhost:8080/signal",topic:"/topic/offer",appDestination:"/app/signal/offer",roomCode:a.roomCode,currentUserId:a.currentUserId,onFileTransferComplete:r.handleFileTransferComplete,onFileUploadRequest:r.handleUploadToServer,onJoinRoomSuccess:r.handleJoinRoomSuccess},null,8,["roomCode","currentUserId","onFileTransferComplete","onFileUploadRequest","onJoinRoomSuccess"])):(0,i.Q3)("",!0),a.errorMessage?((0,i.uX)(),(0,i.CE)("div",De," 错误："+(0,X.v_)(a.errorMessage),1)):(0,i.Q3)("",!0)],64)}const xe=y.A.create({baseURL:"http://localhost:8080/",headers:{}});xe.interceptors.request.use((e=>{const t=sessionStorage.getItem("token");return console.log("fileAPI拦截器处token",t),t&&(e.headers["Authorization"]=t),e}),(e=>Promise.reject(e)));var Me=xe;const Oe=(e,t)=>S.post(`/patients?doctorId=${t}`,e),Ne=(e,t)=>(console.log("Updating patient with doctorId:",t),S.put(`/patients?doctorId=${t}`,e)),Je=e=>S.get(`/patients/by-doctor/${e}`),je=(e,t)=>S.delete(`/patients/${e}?doctorId=${t}`);function Xe(e,t,n,o,s,a){const r=(0,i.g2)("FileTransfer"),l=(0,i.g2)("VideoChat");return(0,i.uX)(),(0,i.CE)("div",null,[(0,i.bF)(r,{ref:"fileTransferComponent",onSendMessage:a.sendMessage,onFileTransferComplete:a.handleFileTransferComplete,onFileUploadRequest:a.handleFileUploadRequest,onJoinRoomSuccess:a.handleJoinRoomSuccess},null,8,["onSendMessage","onFileTransferComplete","onFileUploadRequest","onJoinRoomSuccess"]),(0,i.bF)(l,{ref:"videoChatComponent",onSendMessage:a.sendMessage},null,8,["onSendMessage"])])}var We=n(4587),Ae=n.n(We),qe=n(9769),_e=n.n(qe);function Ke(e,t,n,o,s,a){return(0,i.uX)(),(0,i.CE)("div")}n(6573),n(8100),n(7936),n(4603),n(7566),n(8721);var Be={name:"FileTransfer",data(){return{destination:null,dataChannel:null,receivedChunks:[],peerConnection:new RTCPeerConnection({iceServers:[{urls:"stun:stun.l.google.com:19302"}]}),bufferedCandidates:[]}},methods:{handleDataChannel(e){this.dataChannel=e.channel,this.setupDataChannelEvents()},setupDataChannelEvents(){this.dataChannel.onmessage=e=>{if(e.data instanceof ArrayBuffer)this.receivedChunks.push(e.data),console.log("Received a file chunk");else try{const t=JSON.parse(e.data);if("readyToReceive"===t.type)console.log("对方已准备好接收文件"),this.$emit("join-room-success");else if("readyForFileTransfer"===t.type)this.dataChannel.send(JSON.stringify({type:"readyToReceive"})),console.log("发送 readyToReceive 消息");else if("start"===t.action)this.receivedChunks=[],this.receivedMetadata=t,console.log("开始接收文件",t.fileName);else if("end"===t.action){const e=new Blob(this.receivedChunks,{type:this.receivedMetadata.fileType}),t=URL.createObjectURL(e);console.log(`文件接收完成，下载链接: ${t}`);const n=confirm("文件接收完成。点击确定下载，取消上传到数据库。注意只可上传图片！");if(console.log("shouldDownload is",n),n){const e=document.createElement("a");document.body.appendChild(e),e.style="display: none",e.href=t,e.download=this.receivedMetadata.fileName,e.click(),window.URL.revokeObjectURL(t),console.log(`文件已经准备好下载: ${this.receivedMetadata.fileName}`)}else this.$emit("file-upload-request",{file:e});this.receivedChunks=[],this.receivedMetadata=null}}catch(t){console.error("接收到的数据不是有效的 JSON 格式:",t)}},this.dataChannel.onopen=()=>{console.log("DataChannel Opened"),this.fileTransferStatus="连接已建立，可以传输文件",this.sendReadyForFileTransfer()},this.dataChannel.onclose=()=>{console.log("DataChannel Closed"),this.fileTransferStatus="连接已关闭"},this.dataChannel.onerror=function(e){console.error("Data Channel Error:",e)},this.dataChannel.onclose=function(){console.log("Data channel is closed.")}},setupWebRTCDataChannel(){if(!this.destination)return void console.log("No destination set, waiting...");this.peerConnection.onicecandidate=e=>{e.candidate&&this.$emit("send-message",{type:"candidate",candidate:e.candidate})},this.peerConnection.oniceconnectionstatechange=()=>{console.log("ICE connection state change:",this.peerConnection.iceConnectionState)};const e=this.peerConnection.createDataChannel("fileTransferChannel");this.dataChannel=e,e.onmessage=e=>{if(e.data instanceof ArrayBuffer)this.receivedChunks.push(e.data),console.log("Received a file chunk");else try{const t=JSON.parse(e.data);if("readyToReceive"===t.type)console.log("对方已准备好接收文件"),this.$emit("join-room-success");else if("readyForFileTransfer"===t.type)this.dataChannel.send(JSON.stringify({type:"readyToReceive"})),console.log("发送 readyToReceive 消息");else if("start"===t.action)this.receivedChunks=[],this.receivedMetadata=t,console.log("开始接收文件",t.fileName);else if("end"===t.action){const e=new Blob(this.receivedChunks,{type:this.receivedMetadata.fileType}),t=URL.createObjectURL(e);console.log(`文件接收完成，下载链接: ${t}`);const n=confirm("文件接收完成。点击确定下载，取消上传到数据库。注意只可上传图片！");if(n){const e=document.createElement("a");document.body.appendChild(e),e.style="display: none",e.href=t,e.download=this.receivedMetadata.fileName,e.click(),window.URL.revokeObjectURL(t),console.log(`文件已经准备好下载: ${this.receivedMetadata.fileName}`)}else this.$emit("file-upload-request",{file:e});this.receivedChunks=[],this.receivedMetadata=null}}catch(t){console.error("接收到的数据不是有效的 JSON 格式:",t)}},e.onopen=()=>{console.log("DataChannel Opened"),this.fileTransferStatus="连接已建立，可以传输文件",this.sendReadyForFileTransfer()},e.onclose=()=>{console.log("DataChannel Closed"),this.fileTransferStatus="连接已关闭"},e.onerror=function(e){console.error("Data Channel Error:",e)},e.onclose=function(){console.log("Data channel is closed.")},this.peerConnection.createOffer().then((e=>this.peerConnection.setLocalDescription(e))).then((()=>{this.$emit("send-message",{type:"offer",offer:this.peerConnection.localDescription})})).catch((e=>console.error("创建offer时发生错误:",e)))},handleFileSignalMessage(e,t){switch(e){case"offer":this.handleOffer(t);break;case"answer":this.handleAnswer(t);break;case"candidate":this.handleNewICECandidate(t);break;default:console.error("Received unknown signal message type:",e)}},handleOffer(e){if(!this.peerConnection)return void console.error("peerConnection is not initialized.");const t=new RTCSessionDescription(e);this.peerConnection.setRemoteDescription(t).then((()=>this.peerConnection.createAnswer())).then((e=>this.peerConnection.setLocalDescription(e))).then((()=>{this.$emit("send-message",{type:"answer",answer:this.peerConnection.localDescription,destination:this.destination})})).catch((e=>console.error("Error setting remote description:",e)))},handleAnswer(e){const t=new RTCSessionDescription(e);"have-local-offer"===this.peerConnection.signalingState?this.peerConnection.setRemoteDescription(t).then((()=>{this.applyBufferedCandidates()})).catch((e=>console.error("Error setting remote description:",e))):console.error(`Cannot set remote answer in current signaling state: ${this.peerConnection.signalingState}`)},handleNewICECandidate(e){const t=new RTCIceCandidate({sdpMLineIndex:e.sdpMLineIndex,candidate:e.candidate});this.peerConnection.remoteDescription?this.peerConnection.addIceCandidate(t).catch((e=>console.error("Error adding received ICE candidate:",e))):this.bufferedCandidates.push(t)},applyBufferedCandidates(){this.bufferedCandidates.forEach((e=>this.peerConnection.addIceCandidate(e).catch((e=>console.error("Error adding buffered ICE candidate:",e))))),this.bufferedCandidates=[]},sendReadyForFileTransfer(){this.dataChannel&&"open"===this.dataChannel.readyState&&(this.dataChannel.send(JSON.stringify({type:"readyForFileTransfer"})),console.log("readyForFileTransfer"))},handleFileSelected(e){const t=e.target.files[0];t&&this.sendFile(t)},sendFile(e){if("open"!==this.dataChannel.readyState)return void(this.errorMessage="数据通道未打开，无法发送文件。");console.log("开始发送文件");const t=16384;let n=0;const o={fileName:e.name,fileSize:e.size,fileType:e.type,action:"start"};this.dataChannel.send(JSON.stringify(o));const i=o=>{const s=new FileReader,a=e.slice(n,o+t);s.onload=()=>{this.dataChannel.send(s.result),e.size>n?(n+=t,i(n)):(this.dataChannel.send(JSON.stringify({action:"end"})),this.$emit("file-transfer-complete"))},s.onerror=e=>console.error("Error reading file:",e),s.readAsArrayBuffer(a)};i(0)},cleanupFileChat(){this.peerConnection&&(this.peerConnection.close(),this.peerConnection=null,console.log("RTCPeerConnection closed."))}},mounted(){this.peerConnection.ondatachannel=this.handleDataChannel},beforeUnmount(){this.cleanupFileChat()}};const Qe=(0,r.A)(Be,[["render",Ke]]);var Ye=Qe;const ze=e=>((0,i.Qi)("data-v-5f49bbec"),e=e(),(0,i.jt)(),e),Ge=ze((()=>(0,i.Lk)("video",{id:"remoteVideo",autoplay:""},null,-1))),He=ze((()=>(0,i.Lk)("video",{id:"localVideo",autoplay:"",muted:"",class:"local-video"},null,-1))),Ze=[Ge,He];function et(e,t,n,o,s,a){return s.isChatting?((0,i.uX)(),(0,i.CE)("div",{key:0,class:"video-container",onMousedown:t[0]||(t[0]=(...e)=>a.dragStart&&a.dragStart(...e))},Ze,32)):(0,i.Q3)("",!0)}var tt={name:"VideoChat",data(){return{videoPeerConnection:new RTCPeerConnection({iceServers:[{urls:"stun:stun.l.google.com:19302"}]}),localStream:null,remoteStream:new MediaStream,bufferedVideoCandidates:[],isInitiator:!1,isChatting:!1,dragging:!1,startX:0,startY:0}},methods:{initVideoCall(){return this.isChatting=!0,navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then((e=>{this.localStream=e;const t=document.querySelector("#localVideo");t&&(t.srcObject=e),e.getTracks().forEach((t=>{this.videoPeerConnection.addTrack(t,e)})),this.setupVideoCall()})).catch((e=>{console.error("Error accessing media devices:",e)}))},setupVideoCall(){this.videoPeerConnection.ontrack=e=>{e.streams[0].getTracks().forEach((e=>{this.remoteStream.addTrack(e)}))};const e=document.querySelector("#remoteVideo");e&&(e.srcObject=this.remoteStream),this.videoPeerConnection.onicecandidate=e=>{e.candidate&&this.$emit("send-message",{type:"video-candidate",candidate:e.candidate})},this.isInitiator&&this.videoPeerConnection.createOffer().then((e=>this.videoPeerConnection.setLocalDescription(e))).then((()=>{this.$emit("send-message",{type:"video-offer",offer:this.videoPeerConnection.localDescription})})).catch((e=>console.error("Error creating video offer:",e)))},handleVideoSignalMessage(e,t){switch(e){case"video-offer":this.initVideoCall().then((()=>{this.handleVideoOffer(t)})),this.isChatting=!0;break;case"video-answer":this.handleVideoAnswer(t);break;case"video-candidate":this.handleNewVideoICECandidate(t);break}},handleVideoOffer(e){const t=new RTCSessionDescription(e);this.videoPeerConnection.setRemoteDescription(t).then((()=>this.videoPeerConnection.createAnswer())).then((e=>this.videoPeerConnection.setLocalDescription(e))).then((()=>{this.$emit("send-message",{type:"video-answer",answer:this.videoPeerConnection.localDescription})})).catch((e=>console.error("Error during handleVideoOffer:",e)))},handleVideoAnswer(e){const t=new RTCSessionDescription(e);this.videoPeerConnection.setRemoteDescription(t).then((()=>{this.applyBufferedVideoCandidates()})).catch((e=>console.error("Error during handleVideoAnswer:",e)))},handleNewVideoICECandidate(e){const t=new RTCIceCandidate({sdpMLineIndex:e.sdpMLineIndex,candidate:e.candidate});this.videoPeerConnection.remoteDescription&&this.videoPeerConnection.remoteDescription.type?this.videoPeerConnection.addIceCandidate(t).catch((e=>console.error("Error adding received video ICE candidate:",e))):this.bufferedVideoCandidates.push(t)},applyBufferedVideoCandidates(){this.bufferedVideoCandidates.forEach((e=>this.videoPeerConnection.addIceCandidate(e).catch((e=>console.error("Error adding buffered video ICE candidate:",e))))),this.bufferedVideoCandidates=[]},cleanupVideoChat(){if(this.localStream){this.localStream.getTracks().forEach((e=>{e.stop()}));const e=document.querySelector("#localVideo");e&&(e.srcObject=null)}if(this.remoteStream){this.remoteStream.getTracks().forEach((e=>{e.stop()}));const e=document.querySelector("#remoteVideo");e&&(e.srcObject=null)}this.videoPeerConnection&&(this.videoPeerConnection.close(),this.videoPeerConnection=null),this.isChatting=!1},dragStart(e){this.dragging=!0,this.startX=e.clientX,this.startY=e.clientY,e.preventDefault(),document.addEventListener("mousemove",this.dragMove),document.addEventListener("mouseup",this.dragEnd)},dragMove(e){if(!this.dragging)return;const t=e.clientX-this.startX,n=e.clientY-this.startY;this.startX=e.clientX,this.startY=e.clientY;const o=window.getComputedStyle(this.$el).transform;let i="none"===o?"matrix(1, 0, 0, 1, 0, 0)":o,s=i.match(/matrix.*\((.+)\)/)[1].split(", "),a=parseInt(s[4])+t,r=parseInt(s[5])+n;this.$el.style.transform=`translate(${a}px, ${r}px)`},dragEnd(){this.dragging=!1,document.removeEventListener("mousemove",this.dragMove),document.removeEventListener("mouseup",this.dragEnd)}},mounted(){},beforeUnmount(){this.cleanupVideoChat()}};const nt=(0,r.A)(tt,[["render",et],["__scopeId","data-v-5f49bbec"]]);var ot=nt,it={name:"WebRTCSignalExchange",components:{FileTransfer:Ye,VideoChat:ot},props:{url:String,topic:String,roomCode:String,appDestination:String,currentUserId:String},data(){return{stompClient:null,errorMessage:"",destination:null,isConnected:!1}},methods:{initConnection(){this.connect()},connect(){let e=sessionStorage.getItem("token");console.log("sessionStorage Token:",e),e&&e.startsWith("Bearer ")&&(e=e.substring(7),console.log("修改后Token:",e));const t=`${this.url}?token=${e}`;console.log("当前urlWithToken:",t);const n=new(Ae())(t);this.stompClient=_e().over(n),this.stompClient.connect({},(e=>{console.log("Connected: "+e),console.log("当前用户ID:",this.currentUserId),console.log("当前房间编号:",this.roomCode),this.stompClient.subscribe("/user/"+this.currentUserId+"/queue/join",(e=>{console.log("收到加入房间通知！");const t=JSON.parse(e.body);t.destination&&t.destination!==this.currentUserId&&(console.log(`Destination set to ${t.destination}`),this.destination=t.destination,this.$refs.fileTransferComponent.destination=t.destination,t.destination<this.currentUserId&&this.$refs.fileTransferComponent.setupWebRTCDataChannel())})),this.stompClient.subscribe(`/topic/room/${this.roomCode}`,(e=>{console.log("收到离开房间通知！");const t=JSON.parse(e.body);t.action&&"left"===t.action&&t.userId===this.destination&&(console.log(`${this.destination} has left the room.`),this.terminateConnectionWithUser(this.destination))})),this.stompClient.subscribe("/user/"+this.currentUserId+"/queue/offer",(e=>{this.handleSignalMessage(JSON.parse(e.body))})),this.isConnected=!0}),(e=>{console.error("Connection error: "+e),this.errorMessage="连接失败，请检查网络后重试。",this.isConnected=!1}))},waitForConnection(e){setTimeout((()=>{this.stompClient.connected?e():this.waitForConnection(e)}),100)},terminateConnectionWithUser(e){console.log(`Terminating connection with ${e}`),this.$refs.fileTransferComponent&&this.$refs.fileTransferComponent.cleanupFileChat(),this.$refs.videoChatComponent&&this.$refs.videoChatComponent.cleanupVideoChat(),this.destination=null},handleSignalMessage(e){const{type:t,content:n}=e;let o;try{o=JSON.parse(n)}catch(i){return void console.error("Error parsing signal message content:",i)}t.startsWith("video-")?this.$refs.videoChatComponent.handleVideoSignalMessage(t,o):this.$refs.fileTransferComponent.handleFileSignalMessage(t,o)},sendMessage(e){if(this.stompClient&&this.isConnected&&this.destination){let t;t=e.offer||e.answer||e.candidate?JSON.stringify(e.offer||e.answer||e.candidate):JSON.stringify(e);const n={...e,destination:this.destination,content:t};this.stompClient.send(this.appDestination,JSON.stringify(n),{})}else console.error("Cannot send message, destination is undefined")},handleFileTransferComplete(){this.$emit("file-transfer-complete")},handleFileUploadRequest(e){console.log("上传事件已被WebRTCSignalExchange组件转发"),this.$emit("file-upload-request",e)},handleJoinRoomSuccess(){this.$emit("join-room-success")},startVideoChat(){this.$refs.videoChatComponent.isInitiator=!0,this.$refs.videoChatComponent.initVideoCall()},disconnect(){this.$refs.fileTransferComponent&&this.$refs.fileTransferComponent.cleanupFileChat(),this.$refs.videoChatComponent&&this.$refs.videoChatComponent.cleanupVideoChat(),this.stompClient&&this.isConnected&&this.stompClient.disconnect((()=>{console.log("Disconnected from WebSocket server."),this.isConnected=!1}))}},mounted(){},beforeUnmount(){this.disconnect()}};const st=(0,r.A)(it,[["render",Xe]]);var at=st,rt={watch:{currentView(e){"patientList"===e&&this.fetchPatients()}},components:{WebRTCSignalExchange:at},data(){return{signalServerUrl:"http://localhost:8080/signal",signalTopic:"/topic/offer",appDestination:"/app/signal/offer",fileTransferStatus:"未开始",fileInput:null,roomCode:"",isInRoom:!1,errorMessage:"",currentUserId:sessionStorage.getItem("doctorId"),isSending:!1,currentView:"patientList",showFilesModal:!1,currentFileIndex:0,patientFiles:[],currentFile:""}},methods:{async createRoom(){if(4===this.roomCode.length){this.$refs.webRTCSignalExchange.initConnection();try{const e=await S.post("/api/createRoom",{roomCode:this.roomCode});"房间创建成功，并已加入。"===e.data.message&&(this.isInRoom=!0,this.fileTransferStatus="房间创建成功，请选择文件或等待接收方加入。")}catch(e){e.response&&e.response.data?(console.error("创建房间失败:",e.response.data.error),alert(`创建房间失败: ${e.response.data.error}`)):(console.error("请求失败:",e),alert("请求失败，请稍后再试。"))}}else alert("房间代码必须为4位。")},async joinRoom(){4===this.roomCode.length?(this.$refs.webRTCSignalExchange.initConnection(),this.sendRoomJoinSignal()):alert("房间代码必须为4位。")},sendRoomJoinSignal(){const e=()=>{this.$refs.webRTCSignalExchange.isConnected?S.post("/api/joinRoom",{roomCode:this.roomCode}).then((e=>{e.data&&e.data.message&&e.data.message.includes("成功加入房间")&&(this.isInRoom=!0,this.fileTransferStatus=e.data.message)})).catch((e=>{console.error("加入房间失败:",e),alert("加入房间失败，请稍后再试。")})):setTimeout(e,100)};e()},async leaveRoom(){const e=await S.post("/api/leaveRoom",{roomCode:this.roomCode});"已成功离开房间。"===e.data.message?(this.$refs.webRTCSignalExchange.$refs.videoChatComponent.cleanupVideoChat(),this.resetRoomState()):alert("退出房间失败："+e.data.error)},resetRoomState(){this.isInRoom=!1,this.roomCode="",this.fileTransferStatus="未开始"},handleFileSelected(){this.fileTransferStatus="文件已选择，准备上传..."},sendFile(){if(!this.$refs.webRTCSignalExchange.$refs.fileTransferComponent.dataChannel||"open"!==this.$refs.webRTCSignalExchange.$refs.fileTransferComponent.dataChannel.readyState)return void(this.errorMessage="数据通道未准备好或未开启，无法发送文件。");const e=this.$refs.fileInput.files[0];e?(this.fileTransferStatus="正在发送...",this.isSending=!0,this.$refs.webRTCSignalExchange.$refs.fileTransferComponent.sendFile(e)):this.errorMessage="请先选择一个文件。"},startChat(){this.$refs.webRTCSignalExchange.startVideoChat()},endChat(){this.$refs.webRTCSignalExchange.$refs.videoChatComponent.cleanupVideoChat()},handleFileTransferComplete(){this.fileTransferStatus="文件传输完成",this.isSending=!1},handleJoinRoomSuccess(){this.fileTransferStatus="对方已成功加入房间"},handleUploadToServer(e){console.log("准备开始上传文件到数据库"),console.log(e);const t=prompt("请输入病人ID：");if(t&&e&&e.file){const n=new FormData;n.append("file",e.file),n.append("patientId",t);for(let[e,t]of n.entries())console.log(`${e}: ${t}`);Me.post("/api/uploadFile",n,{headers:{}}).then((()=>{alert("文件上传成功！")})).catch((e=>{console.error("文件上传失败",e),alert("文件上传失败！")}))}else alert("请确保已选择文件并输入病人ID")},showPatientFiles(e){this.patientFiles=e.files,this.currentFileIndex=0,this.currentFile=this.patientFiles.length?this.patientFiles[0]:"",this.showFilesModal=!0},closeModal(){this.showFilesModal=!1},previousFile(){this.patientFiles.length&&(this.currentFileIndex=(this.currentFileIndex+this.patientFiles.length-1)%this.patientFiles.length,this.currentFile=this.patientFiles[this.currentFileIndex])},nextFile(){this.patientFiles.length&&(this.currentFileIndex=(this.currentFileIndex+1)%this.patientFiles.length,this.currentFile=this.patientFiles[this.currentFileIndex])}},mounted(){this.fileInput=this.$refs.fileInput},setup(){const e=(0,h.rd)(),t=(0,b.KR)([]),n=(0,b.KR)(null),o=async()=>{try{const e=sessionStorage.getItem("doctorId");if(!e)return void console.error("医生ID未找到,请确保已登录");const n=await Je(e),o=n.data;t.value=o;for(let t of o)await a(t.id)}catch(e){console.error("获取病人列表失败:",e)}};(0,i.sV)((()=>{o()}));const s=e=>{n.value={...e}},a=async e=>{try{const n=await S.get(`/api/patientFiles/${e}`),o=n.data;if(o.length>0){const n=t.value.findIndex((t=>t.id===e));-1!==n&&(t.value[n].files=o,t.value=[...t.value])}}catch(n){console.error("获取病人文件失败",n)}},r=async()=>{try{const e=sessionStorage.getItem("doctorId");if(!e)throw new Error("医生ID未找到,请确保已登录。");if(n.value.phoneNumber&&11!==n.value.phoneNumber.length)throw new Error("手机号必须为11位");await Ne(n.value,e),alert("病人信息更新成功"),o(),n.value=null}catch(e){console.error("更新病人信息失败:",e)}},l=()=>{n.value=null},d=(0,b.KR)({}),c=async()=>{try{const e=sessionStorage.getItem("doctorId");if(!e)throw new Error("医生ID未找到,请确保已登录");if(d.value.phoneNumber&&11!==d.value.phoneNumber.length)throw new Error("手机号必须为11位");const t=(new Date).toISOString(),n=t.split(".")[0],i={...d.value,doctor:e,visitTime:n};await Oe(i,e),alert("病人添加成功"),o(),d.value={}}catch(e){console.error("添加病人失败:",e.message)}},u=async e=>{try{const t=sessionStorage.getItem("doctorId");if(!t)throw new Error("医生ID未找到,请确保已登录");await je(e,t),alert("病人删除成功"),o()}catch(t){console.error("删除病人失败:",t.message)}},p=()=>{sessionStorage.removeItem("token"),sessionStorage.removeItem("doctorId"),e.push("/")};return{patients:t,newPatient:d,editingPatient:n,fetchPatients:o,fetchPatientFiles:a,startEdit:s,addNewPatient:c,deletePatientMethod:u,updatePatientInfo:r,cancelEdit:l,logout:p}}};const lt=(0,r.A)(rt,[["render",Ue],["__scopeId","data-v-28b1baf9"]]);var dt=lt;const ct=[{path:"/",name:"DoctorLogin",component:F},{path:"/doctor-register",name:"DoctorRegister",component:j},{path:"/doctor-dashboard",name:"DoctorDashboard",component:dt}],ht=(0,h.aE)({history:(0,h.LA)(),routes:ct});var ut=ht;(0,o.Ef)(c).use(ut).mount("#app")}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var s=t[o]={exports:{}};return e[o].call(s.exports,s,s.exports,n),s.exports}n.m=e,function(){var e=[];n.O=function(t,o,i,s){if(!o){var a=1/0;for(c=0;c<e.length;c++){o=e[c][0],i=e[c][1],s=e[c][2];for(var r=!0,l=0;l<o.length;l++)(!1&s||a>=s)&&Object.keys(n.O).every((function(e){return n.O[e](o[l])}))?o.splice(l--,1):(r=!1,s<a&&(a=s));if(r){e.splice(c--,1);var d=i();void 0!==d&&(t=d)}}return t}s=s||0;for(var c=e.length;c>0&&e[c-1][2]>s;c--)e[c]=e[c-1];e[c]=[o,i,s]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){var e={524:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var i,s,a=o[0],r=o[1],l=o[2],d=0;if(a.some((function(t){return 0!==e[t]}))){for(i in r)n.o(r,i)&&(n.m[i]=r[i]);if(l)var c=l(n)}for(t&&t(o);d<a.length;d++)s=a[d],n.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return n.O(c)},o=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[504],(function(){return n(1007)}));o=n.O(o)})();
//# sourceMappingURL=app.31c4d2f0.js.map