<template>
    <div>
        <!-- 子组件的引用 -->
        <FileTransfer ref="fileTransferComponent" @send-message="sendMessage"
            @file-transfer-complete="handleFileTransferComplete" @file-upload-request="handleFileUploadRequest"
            @join-room-success="handleJoinRoomSuccess" />
        <VideoChat ref="videoChatComponent" @send-message="sendMessage" />
    </div>
</template>


<script>
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import FileTransfer from './FileTransfer';
import VideoChat from './VideoChat';

export default {
    name: 'WebRTCSignalExchange',
    components: {
        FileTransfer,
        VideoChat
    },
    props: {
        url: String,
        topic: String,
        roomCode: String, // 确保传入roomCode作为prop
        appDestination: String,
        currentUserId: String, // 从父组件传入当前用户ID
    },
    data() {
        return {
            stompClient: null,
            errorMessage: '',
            destination: null, // 目标用户标识
            isConnected: false, // 添加一个标志来指示WebSocket连接是否已经建立
        };
    },
    methods: {
        initConnection() {
            this.connect();
        },

        connect() {
            let token = sessionStorage.getItem('token'); // 令牌存储在sessionStorage中
            console.log("sessionStorage Token:", token);
            // 检查令牌是否以"Bearer "开头，如果是，则移除该前缀
            if (token && token.startsWith('Bearer ')) {
                token = token.substring('Bearer '.length);
                console.log("修改后Token:", token);
            }
            // 注意：这里直接附加处理过的令牌，无需使用encodeURIComponent
            const urlWithToken = `${this.url}?token=${token}`; // 直接附加令牌
            console.log("当前urlWithToken:", urlWithToken);

            const socket = new SockJS(urlWithToken);
            this.stompClient = Stomp.over(socket);
            this.stompClient.connect({}, frame => {
                console.log('Connected: ' + frame);

                console.log("当前用户ID:", this.currentUserId);
                console.log("当前房间编号:", this.roomCode);
                // 订阅加入房间的通知
                this.stompClient.subscribe('/user/' + this.currentUserId + '/queue/join', message => {
                    console.log(`收到加入房间通知！`);
                    const data = JSON.parse(message.body);
                    if (data.destination && data.destination !== this.currentUserId) {
                        console.log(`Destination set to ${data.destination}`);
                        this.destination = data.destination; // 更新目标用户ID
                        this.$refs.fileTransferComponent.destination = data.destination;
                        if (data.destination < this.currentUserId) {
                            //加入房间即发起文件传输
                            this.$refs.fileTransferComponent.setupWebRTCDataChannel();
                        }
                    }
                });

                // 订阅离开房间的通知
                this.stompClient.subscribe(`/topic/room/${this.roomCode}`, message => {
                    console.log(`收到离开房间通知！`);
                    const data = JSON.parse(message.body);
                    if (data.action && data.action === "left" && data.userId === this.destination) {
                        console.log(`${this.destination} has left the room.`);
                        this.terminateConnectionWithUser(this.destination);
                    }
                });

                // 订阅Offer、Answer和Candidate消息
                this.stompClient.subscribe('/user/' + this.currentUserId + '/queue/offer', message => {
                    this.handleSignalMessage(JSON.parse(message.body));
                });

                // 请确保在 connect 方法中添加了下面这行来处理接收方的数据通道创建

                this.isConnected = true;

            }, error => {
                console.error('Connection error: ' + error);
                this.errorMessage = '连接失败，请检查网络后重试。';
                this.isConnected = false;
            });
        },

        waitForConnection(callback) {
            setTimeout(() => {
                if (this.stompClient.connected) {
                    callback();
                } else {
                    this.waitForConnection(callback);
                }
            }, 100); // 检查连接状态的间隔时间可以根据实际情况调整
        },

        terminateConnectionWithUser(userId) {
            console.log(`Terminating connection with ${userId}`);
            // 调用子组件的清理方法
            if (this.$refs.fileTransferComponent) {
                this.$refs.fileTransferComponent.cleanupFileChat();
            }
            if (this.$refs.videoChatComponent) {
                this.$refs.videoChatComponent.cleanupVideoChat();
            }
            // 重置 destination 以便可以与新的用户建立连接
            this.destination = null;
        },

        handleSignalMessage(signalMessage) {
            // 从信令消息中直接读取`type`字段
            const { type, content } = signalMessage;

            let signalData;
            try {
                signalData = JSON.parse(content);
            } catch (error) {
                console.error('Error parsing signal message content:', error);
                return;
            }

            //console.log("Received signal data:", signalData);
            //console.log("Signal type is:", type);

            // 根据类型将信号分发给相应的子组件
            if (type.startsWith('video-')) {
                this.$refs.videoChatComponent.handleVideoSignalMessage(type, signalData);
            } else {
                this.$refs.fileTransferComponent.handleFileSignalMessage(type, signalData);
            }
        },

        sendMessage(message) {
            if (this.stompClient && this.isConnected && this.destination) {
                // 包括destination字段

                // 对消息进行区分，以处理不同类型的信令（文件传输或视频聊天）
                let msgContent;
                if (message.offer || message.answer || message.candidate) {
                    msgContent = JSON.stringify(message.offer || message.answer || message.candidate);
                } else {
                    // 处理视频聊天的信令消息
                    msgContent = JSON.stringify(message);
                }

                const msg = {
                    ...message,
                    destination: this.destination,
                    content: msgContent
                };
                this.stompClient.send(this.appDestination, JSON.stringify(msg), {});
            } else {
                console.error("Cannot send message, destination is undefined");
            }
        },

        handleFileTransferComplete() {
            // 将发送文件成功事件向上传递
            this.$emit('file-transfer-complete');
        },

        handleFileUploadRequest(file) {
            console.log("上传事件已被WebRTCSignalExchange组件转发");
            // 转发事件到DoctorDashboard组件
            this.$emit('file-upload-request', file);
        },

        handleJoinRoomSuccess() {
            // 将发送文件成功事件向上传递
            this.$emit('join-room-success');
        },

        startVideoChat() {
            //发起视频聊天
            this.$refs.videoChatComponent.isInitiator = true;
            this.$refs.videoChatComponent.initVideoCall();
        },

        disconnect() {
            // 调用子组件的清理方法
            if (this.$refs.fileTransferComponent) {
                this.$refs.fileTransferComponent.cleanupFileChat();
            }
            if (this.$refs.videoChatComponent) {
                this.$refs.videoChatComponent.cleanupVideoChat();
            }

            if (this.stompClient && this.isConnected) {
                this.stompClient.disconnect(() => {
                    console.log("Disconnected from WebSocket server.");
                    this.isConnected = false;
                });
            }


        },

    },
    mounted() {
        //this.connect();
    },
    beforeUnmount() {
        // 断开连接等清理工作
        this.disconnect();
    },
};
</script>