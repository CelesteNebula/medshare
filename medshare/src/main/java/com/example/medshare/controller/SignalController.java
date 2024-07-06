package com.example.medshare.controller;

import com.example.medshare.model.WebRTCSignal;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class SignalController {

    private final SimpMessagingTemplate messagingTemplate;

    public SignalController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/signal/offer")
    public void processOffer(@Payload WebRTCSignal signal) {
        // 假设destination字段包含了目标用户的唯一标识
        // 发送offer到特定用户
        // 注意：此处的"/user/{destination}/offer"路径应该与客户端订阅的路径匹配
        messagingTemplate.convertAndSendToUser(signal.getDestination(), "/queue/offer", signal);
    }

    @MessageMapping("/signal/answer")
    public void processAnswer(@Payload WebRTCSignal signal) {
        // 发送answer到特定用户
        messagingTemplate.convertAndSendToUser(signal.getDestination(), "/queue/answer", signal);
    }

    @MessageMapping("/signal/candidate")
    public void processCandidate(@Payload WebRTCSignal signal) {
        // 发送ICE候选人到特定用户
        messagingTemplate.convertAndSendToUser(signal.getDestination(), "/queue/candidate", signal);
    }
}
