<template>
    <div class="video-container" v-if="isChatting" @mousedown="dragStart">
        <video id="remoteVideo" autoplay></video>
        <video id="localVideo" autoplay muted class="local-video"></video>
    </div>
</template>

<script>
export default {
    name: 'VideoChat',
    // 只包含视频聊天所需的数据和方法
    data() {
        return {
            // 视频聊天相关数据
            // 新的 RTCPeerConnection 对象和视频流变量
            videoPeerConnection: new RTCPeerConnection({
                iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
            }),
            localStream: null,
            remoteStream: new MediaStream(),
            bufferedVideoCandidates: [], // 用于暂存视频ICE候选
            isInitiator: false, //用于标记是否为发送视频offer的用户
            isChatting: false,  //是否正在聊天

            // 拖动状态
            dragging: false,
            // 拖动开始时的坐标
            startX: 0,
            startY: 0,
        };
    },
    methods: {
        // 视频聊天相关方法
        // 添加媒体流处理
        // 新增方法获取本地视频流并初始化视频通话
        initVideoCall() {
            this.isChatting = true;
            return navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(stream => {
                    this.localStream = stream;
                    // 显示本地视频流
                    const localVideo = document.querySelector('#localVideo');
                    if (localVideo) localVideo.srcObject = stream;

                    // 添加本地流到 RTCPeerConnection
                    stream.getTracks().forEach(track => {
                        this.videoPeerConnection.addTrack(track, stream);
                    });

                    this.setupVideoCall();
                })
                .catch(error => {
                    console.error('Error accessing media devices:', error);
                });
        },

        // 设置视频通话的 RTCPeerConnection
        setupVideoCall() {
            this.videoPeerConnection.ontrack = event => {
                event.streams[0].getTracks().forEach(track => {
                    this.remoteStream.addTrack(track);
                });
            };
            // 显示远程视频流
            const remoteVideo = document.querySelector('#remoteVideo');
            if (remoteVideo) remoteVideo.srcObject = this.remoteStream;

            // Handle ICE candidates
            this.videoPeerConnection.onicecandidate = event => {
                if (event.candidate) {
                    this.$emit('send-message', {
                        type: 'video-candidate',
                        candidate: event.candidate
                    });
                }
            };

            // 创建offer
            if (this.isInitiator) { // 假设有某种方式决定谁是通话的发起者
                this.videoPeerConnection.createOffer()
                    .then(offer => this.videoPeerConnection.setLocalDescription(offer))
                    .then(() => {
                        this.$emit('send-message', {
                            type: 'video-offer',
                            offer: this.videoPeerConnection.localDescription
                        });

                    })
                    .catch(error => console.error('Error creating video offer:', error));
            }
        },

        // 新增方法处理视频信令消息
        handleVideoSignalMessage(type, signalData) {
            switch (type) {
                case 'video-offer':
                    // 确保在处理视频offer之前，已经初始化了视频通话环境
                    this.initVideoCall().then(() => {
                        this.handleVideoOffer(signalData);
                    });
                    this.isChatting = true;
                    break;
                case 'video-answer':
                    this.handleVideoAnswer(signalData);
                    break;
                case 'video-candidate':
                    this.handleNewVideoICECandidate(signalData);
                    break;
                // 添加其他处理逻辑...
            }
        },

        // 实现视频信令消息的处理方法
        // 处理收到的视频offer
        handleVideoOffer(offerDesc) {

            const offer = new RTCSessionDescription(offerDesc);
            this.videoPeerConnection.setRemoteDescription(offer)
                .then(() => this.videoPeerConnection.createAnswer())
                .then(answer => this.videoPeerConnection.setLocalDescription(answer))
                .then(() => {
                    // 发送视频answer响应
                    this.$emit('send-message', {
                        type: 'video-answer',
                        answer: this.videoPeerConnection.localDescription
                    });

                })
                .catch(error => console.error('Error during handleVideoOffer:', error));
        },

        // 处理收到的视频answer
        handleVideoAnswer(answerDesc) {
            const answer = new RTCSessionDescription(answerDesc);
            this.videoPeerConnection.setRemoteDescription(answer)
                .then(() => {
                    // 应用之前缓存的视频ICE候选
                    this.applyBufferedVideoCandidates();
                })
                .catch(error => console.error('Error during handleVideoAnswer:', error));
        },

        // 处理新的视频ICE candidate
        handleNewVideoICECandidate(candidateData) {
            const candidate = new RTCIceCandidate({
                sdpMLineIndex: candidateData.sdpMLineIndex,
                candidate: candidateData.candidate
            });
            if (this.videoPeerConnection.remoteDescription && this.videoPeerConnection.remoteDescription.type) {
                this.videoPeerConnection.addIceCandidate(candidate)
                    .catch(error => console.error('Error adding received video ICE candidate:', error));
            } else {
                // 如果远程描述尚未设置，暂存视频ICE候选
                this.bufferedVideoCandidates.push(candidate);
            }
        },

        // 在设置远程描述后应用缓存的视频ICE候选
        applyBufferedVideoCandidates() {
            this.bufferedVideoCandidates.forEach(candidate =>
                this.videoPeerConnection.addIceCandidate(candidate)
                    .catch(error => console.error('Error adding buffered video ICE candidate:', error))
            );
            // 清空暂存列表
            this.bufferedVideoCandidates = [];
        },

        // 清理视频聊天资源的方法
        cleanupVideoChat() {
            // 关闭本地视频流的轨道
            if (this.localStream) {
                this.localStream.getTracks().forEach(track => {
                    track.stop();
                });
                // 可选：清除视频元素的源
                const localVideo = document.querySelector('#localVideo');
                if (localVideo) localVideo.srcObject = null;
            }

            // 关闭远程视频流的轨道（通常不必要，但保持完整性）
            if (this.remoteStream) {
                this.remoteStream.getTracks().forEach(track => {
                    track.stop();
                });
                // 可选：清除视频元素的源
                const remoteVideo = document.querySelector('#remoteVideo');
                if (remoteVideo) remoteVideo.srcObject = null;
            }

            // 关闭视频 RTCPeerConnection
            if (this.videoPeerConnection) {
                this.videoPeerConnection.close();
                this.videoPeerConnection = null;
            }

            // UI清理逻辑，例如隐藏视频区域，显示结束提示等
            this.isChatting = false;
        },

        dragStart(e) {
            this.dragging = true;
            this.startX = e.clientX;
            this.startY = e.clientY;

            // 确保移动过程中文本不会被选中导致拖动不流畅
            e.preventDefault();

            document.addEventListener('mousemove', this.dragMove);
            document.addEventListener('mouseup', this.dragEnd);
        },
        dragMove(e) {
            if (!this.dragging) return;

            const dx = e.clientX - this.startX;
            const dy = e.clientY - this.startY;
            this.startX = e.clientX;
            this.startY = e.clientY;

            // 使用transform进行位移
            const currentTransform = window.getComputedStyle(this.$el).transform;
            let matrix = currentTransform === 'none'
                ? 'matrix(1, 0, 0, 1, 0, 0)'
                : currentTransform;
            let matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
            let translateX = parseInt(matrixValues[4]) + dx;
            let translateY = parseInt(matrixValues[5]) + dy;

            this.$el.style.transform = `translate(${translateX}px, ${translateY}px)`;
        },
        dragEnd() {
            this.dragging = false;
            document.removeEventListener('mousemove', this.dragMove);
            document.removeEventListener('mouseup', this.dragEnd);
        },
    },
    mounted() {
        // 初始化视频聊天功能
    },
    beforeUnmount() {
        // 清理视频聊天资源
        this.cleanupVideoChat();
    },
};
</script>

<style scoped>
.video-container {
    position: fixed;
    /* 或 absolute，根据需要 */
    top: 0;
    left: 0;
    /* 其他样式保持不变 */
}


#remoteVideo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* 保持视频比例，可能会裁剪一部分视频以填充容器 */
}

.local-video {
    position: absolute;
    bottom: 20px;
    /* 右下角，距底部20px */
    right: 20px;
    /* 右下角，距右侧20px */
    width: 20%;
    /* 本地视频大小，根据需要调整 */
    z-index: 10;
    /* 确保本地视频在远程视频上方 */
}
</style>
