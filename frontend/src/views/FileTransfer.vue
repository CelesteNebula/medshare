<template>
    <div>

    </div>
</template>

<script>
export default {
    name: 'FileTransfer',
    // 只包含文件传输所需的数据和方法
    data() {
        return {
            // 文件传输相关数据
            destination: null, // 目标用户标识
            dataChannel: null,
            receivedChunks: [], // 接收文件的数据块
            peerConnection: new RTCPeerConnection({
                iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
            }),
            bufferedCandidates: [], // 用于暂存ICE候选
        };
    },
    methods: {
        // 文件传输相关方法
        //应答端创建或监听数据通道
        handleDataChannel(event) {
            this.dataChannel = event.channel;

            this.setupDataChannelEvents();
        },

        setupDataChannelEvents() {
            // 设置数据通道的消息处理
            this.dataChannel.onmessage = event => {
                // 检查接收到的数据是否是二进制类型
                if (event.data instanceof ArrayBuffer) {
                    // 这是接收到的文件数据块
                    this.receivedChunks.push(event.data);
                    console.log("Received a file chunk");
                } else {
                    try {
                        // 尝试解析接收到的消息为JSON
                        const message = JSON.parse(event.data);
                        if (message.type === 'readyToReceive') {
                            // 对方已准备好接收文件，可以开始发送文件
                            console.log("对方已准备好接收文件");
                            this.$emit('join-room-success');
                        } else if (message.type === 'readyForFileTransfer') {
                            // 对方请求准备接收文件的消息，发送确认回复
                            this.dataChannel.send(JSON.stringify({ type: 'readyToReceive' }));
                            console.log("发送 readyToReceive 消息");
                        } else if (message.action === "start") {
                            // 开始接收新文件
                            this.receivedChunks = []; // 清空接收缓冲区
                            this.receivedMetadata = message;
                            console.log("开始接收文件", message.fileName);
                        } else if (message.action === "end") {
                            // 文件传输完成，重组文件
                            const receivedFile = new Blob(this.receivedChunks, { type: this.receivedMetadata.fileType });
                            const url = URL.createObjectURL(receivedFile);
                            console.log(`文件接收完成，下载链接: ${url}`);
                            // 弹出对话框询问用户下一步操作
                            const shouldDownload = confirm("文件接收完成。点击确定下载，取消上传到数据库！");
                            console.log("shouldDownload is", shouldDownload);
                            if (shouldDownload) {
                                // 下载文件
                                const downloadLink = document.createElement("a");
                                document.body.appendChild(downloadLink);
                                downloadLink.style = "display: none";
                                downloadLink.href = url;
                                downloadLink.download = this.receivedMetadata.fileName;
                                downloadLink.click();
                                window.URL.revokeObjectURL(url);  // 清理资源
                                console.log(`文件已经准备好下载: ${this.receivedMetadata.fileName}`);
                            } else {
                                // 上传到服务器
                                this.$emit('file-upload-request', { file: receivedFile });
                            }


                            // 重置接收状态，准备接收下一个文件
                            this.receivedChunks = [];
                            this.receivedMetadata = null;

                        }
                    } catch (error) {
                        console.error("接收到的数据不是有效的 JSON 格式:", error);
                    }
                }
            };


            this.dataChannel.onopen = () => {
                console.log("DataChannel Opened");
                this.fileTransferStatus = "连接已建立，可以传输文件";
                this.sendReadyForFileTransfer(); // 通知准备好接收文件
            };

            this.dataChannel.onclose = () => {
                console.log("DataChannel Closed");
                this.fileTransferStatus = "连接已关闭";
            };

            this.dataChannel.onerror = function (error) {
                console.error("Data Channel Error:", error);
            };

            this.dataChannel.onclose = function () {
                console.log("Data channel is closed.");
            };
        },

        //发起端建立信道
        setupWebRTCDataChannel() {
            if (!this.destination) {
                console.log("No destination set, waiting...");
                return; // 如果没有设置目标，就返回并等待
            }
            // 已经在data()中初始化peerConnection
            // 监听ICE候选人并通过WebSocket发送
            this.peerConnection.onicecandidate = event => {
                if (event.candidate) {
                    // 使用 this.$emit 触发事件而不是直接调用 sendMessage
                    this.$emit('send-message', {
                        type: 'candidate',
                        candidate: event.candidate
                    });
                }
            };

            // 使用箭头函数确保this指向Vue组件实例
            this.peerConnection.oniceconnectionstatechange = () => {
                console.log("ICE connection state change:", this.peerConnection.iceConnectionState);
            };

            // 创建数据通道
            const dataChannel = this.peerConnection.createDataChannel("fileTransferChannel");
            this.dataChannel = dataChannel;

            // 设置数据通道的消息处理
            dataChannel.onmessage = event => {
                // 检查接收到的数据是否是二进制类型
                if (event.data instanceof ArrayBuffer) {
                    // 这是接收到的文件数据块
                    this.receivedChunks.push(event.data);
                    console.log("Received a file chunk");
                } else {
                    try {
                        // 尝试解析接收到的消息为JSON
                        const message = JSON.parse(event.data);
                        if (message.type === 'readyToReceive') {
                            // 对方已准备好接收文件，可以开始发送文件
                            console.log("对方已准备好接收文件");
                            this.$emit('join-room-success');
                        } else if (message.type === 'readyForFileTransfer') {
                            // 对方请求准备接收文件的消息，发送确认回复
                            this.dataChannel.send(JSON.stringify({ type: 'readyToReceive' }));
                            console.log("发送 readyToReceive 消息");
                        } else if (message.action === "start") {
                            // 开始接收新文件
                            this.receivedChunks = []; // 清空接收缓冲区
                            this.receivedMetadata = message;
                            console.log("开始接收文件", message.fileName);
                        } else if (message.action === "end") {
                            // 文件传输完成，重组文件
                            const receivedFile = new Blob(this.receivedChunks, { type: this.receivedMetadata.fileType });
                            const url = URL.createObjectURL(receivedFile);
                            console.log(`文件接收完成，下载链接: ${url}`);

                            // 弹出对话框询问用户下一步操作
                            const shouldDownload = confirm("文件接收完成。点击确定下载，取消上传到数据库！");
                            if (shouldDownload) {
                                // 下载文件
                                const downloadLink = document.createElement("a");
                                document.body.appendChild(downloadLink);
                                downloadLink.style = "display: none";
                                downloadLink.href = url;
                                downloadLink.download = this.receivedMetadata.fileName;
                                downloadLink.click();
                                window.URL.revokeObjectURL(url);  // 清理资源
                                console.log(`文件已经准备好下载: ${this.receivedMetadata.fileName}`);
                            } else {
                                // 上传到服务器
                                this.$emit('file-upload-request', { file: receivedFile });
                            }

                            // 重置接收状态，准备接收下一个文件
                            this.receivedChunks = [];
                            this.receivedMetadata = null;
                        }
                    } catch (error) {
                        console.error("接收到的数据不是有效的 JSON 格式:", error);
                    }
                }
            };


            dataChannel.onopen = () => {
                console.log("DataChannel Opened");
                this.fileTransferStatus = "连接已建立，可以传输文件";
                this.sendReadyForFileTransfer(); // 通知准备好接收文件
            };

            dataChannel.onclose = () => {
                console.log("DataChannel Closed");
                this.fileTransferStatus = "连接已关闭";
            };

            dataChannel.onerror = function (error) {
                console.error("Data Channel Error:", error);
            };

            dataChannel.onclose = function () {
                console.log("Data channel is closed.");
            };

            // 创建offer并发送
            this.peerConnection.createOffer().then(offer => {
                return this.peerConnection.setLocalDescription(offer);
            }).then(() => {
                this.$emit('send-message', {
                    type: 'offer',
                    offer: this.peerConnection.localDescription
                });
            }).catch(error => console.error("创建offer时发生错误:", error));

        },

        handleFileSignalMessage(type, signalData) {

            //console.log("Received signal data:", signalData);
            //console.log("Signal type is:", type);

            // 原有文件传输的信令处理...
            switch (type) {
                case 'offer':
                    // 现在`signalData`直接是`offer`的内容
                    this.handleOffer(signalData);
                    break;
                case 'answer':
                    this.handleAnswer(signalData);
                    break;
                case 'candidate':
                    this.handleNewICECandidate(signalData);
                    break;
                default:
                    console.error('Received unknown signal message type:', type);
            }
        },

        handleOffer(offerDesc) {
            if (!this.peerConnection) {
                console.error("peerConnection is not initialized.");
                return;
            }
            // 此处假设offerDesc已经是解析好的offer对象
            const offer = new RTCSessionDescription(offerDesc);
            this.peerConnection.setRemoteDescription(offer)
                .then(() => this.peerConnection.createAnswer())
                .then(answer => this.peerConnection.setLocalDescription(answer))
                .then(() => {
                    // 注意这里向外发送的消息也应该包含`type`字段
                    this.$emit('send-message', {
                        type: 'answer',
                        answer: this.peerConnection.localDescription,
                        destination: this.destination
                    });
                })
                .catch(error => console.error('Error setting remote description:', error));
        },

        handleAnswer(answerDesc) {
            const answer = new RTCSessionDescription(answerDesc);
            if (this.peerConnection.signalingState === 'have-local-offer') {
                this.peerConnection.setRemoteDescription(answer)
                    .then(() => {
                        // 应用之前缓存的ICE候选
                        this.applyBufferedCandidates();
                    })
                    .catch(error => console.error('Error setting remote description:', error));
            } else {
                console.error(`Cannot set remote answer in current signaling state: ${this.peerConnection.signalingState}`);
            }
        },

        handleNewICECandidate(candidateData) {
            const candidate = new RTCIceCandidate({
                sdpMLineIndex: candidateData.sdpMLineIndex,
                candidate: candidateData.candidate
            });

            if (this.peerConnection.remoteDescription) {
                this.peerConnection.addIceCandidate(candidate)
                    .catch(error => console.error('Error adding received ICE candidate:', error));
            } else {
                // 如果远程描述尚未设置，暂存ICE候选
                this.bufferedCandidates.push(candidate);
            }
        },

        // 在handleOffer和handleAnswer中设置远程描述后调用此方法
        applyBufferedCandidates() {
            this.bufferedCandidates.forEach(candidate =>
                this.peerConnection.addIceCandidate(candidate)
                    .catch(error => console.error('Error adding buffered ICE candidate:', error))
            );
            // 清空暂存列表
            this.bufferedCandidates = [];
        },

        sendReadyForFileTransfer() {
            if (this.dataChannel && this.dataChannel.readyState === "open") {
                this.dataChannel.send(JSON.stringify({ type: 'readyForFileTransfer' }));
                console.log("readyForFileTransfer");
            }
        },

        handleFileSelected(event) {
            const file = event.target.files[0];
            if (file) {
                this.sendFile(file);
            }
        },

        sendFile(file) {
            if (this.dataChannel.readyState !== "open") {
                this.errorMessage = "数据通道未打开，无法发送文件。";
                return;
            }
            console.log("开始发送文件");
            const chunkSize = 16384; // 16KB
            let offset = 0;

            // 发送文件元数据
            const metadata = {
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
                action: "start"
            };
            this.dataChannel.send(JSON.stringify(metadata));

            // 读取并发送文件的一部分
            const readSlice = o => {
                const reader = new FileReader();
                const slice = file.slice(offset, o + chunkSize);
                reader.onload = () => {
                    this.dataChannel.send(reader.result);
                    if (file.size > offset) {
                        offset += chunkSize;
                        readSlice(offset);
                    } else {
                        // 文件传输完成
                        this.dataChannel.send(JSON.stringify({ action: "end" }));
                        // 文件传输完成后
                        this.$emit('file-transfer-complete');
                    }
                };
                reader.onerror = (e) => console.error("Error reading file:", e);
                reader.readAsArrayBuffer(slice);
            };

            readSlice(0);
        },

        cleanupFileChat() {
            // 关闭RTCPeerConnection
            if (this.peerConnection) {
                this.peerConnection.close();
                this.peerConnection = null;
                console.log("RTCPeerConnection closed.");
            }
        },

    },
    mounted() {
        // 初始化文件传输功能
        this.peerConnection.ondatachannel = this.handleDataChannel;
    },
    beforeUnmount() {
        // 清理文件传输资源
        this.cleanupFileChat();
    },
};
</script>