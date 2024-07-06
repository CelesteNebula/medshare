package com.example.medshare.service;

import com.example.medshare.model.Room;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class RoomService {
    private static final Logger logger = LoggerFactory.getLogger(RoomService.class);

    private final ConcurrentHashMap<String, Room> rooms = new ConcurrentHashMap<>();

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public synchronized boolean createRoom(String roomCode) {
        if (rooms.containsKey(roomCode)) {
            return false;
        }
        rooms.put(roomCode, new Room(roomCode));
        return true;
    }

    public synchronized Map<String, String> joinRoom(String roomCode, String userId) {
        Map<String, String> result = new HashMap<>();
        Room room = rooms.get(roomCode);
        try {
            if (room != null && room.getMembers().size() < 2) {
                room.join(userId);
                logger.info("joinRoom is called, userId is {}", userId);
                String otherMemberId = room.getMembers().stream()
                        .filter(memberId -> !memberId.equals(userId))
                        .findFirst()
                        .orElse(null);

                if (otherMemberId != null) {
                    logger.info("the second member!");
                    try {
                        // 尝试发送消息给房间中的其他成员
                        Map<String, String> messageContent = new HashMap<>();
                        messageContent.put("destination", userId);
                        logger.info("Sending message to user {} with destination {}", otherMemberId, "/queue/join");
                        messagingTemplate.convertAndSendToUser(otherMemberId, "/queue/join", messageContent);
                        logger.info("Message sent to user {}", otherMemberId);
                        messageContent.put("destination", otherMemberId);
                        messagingTemplate.convertAndSendToUser(userId, "/queue/join", messageContent);

                        // 更新result以反映操作的成功
                        result.put("status", "success");
                        result.put("destination", otherMemberId); // 设置对方为目的地
                    } catch (MessagingException e) {
                        logger.error("发送消息到WebSocket时出错", e);
                        // 如果消息发送失败，也需要更新result来反映这一点
                        result.put("status", "failed");
                        result.put("message", "无法通过WebSocket发送消息。");
                    }
                } else {
                    logger.info("the first member!");
                    result.put("status", "success");
                    result.put("destination", "");
                }
            } else {
                result.put("status", "failed");
                result.put("message", "房间已满或不存在。");
            }
        } catch (Exception e) {
            logger.error("加入房间时发生异常", e);
            result.put("status", "failed");
            result.put("message", "服务器内部错误。");
        }
        return result;
    }

    public synchronized void leaveRoom(String roomCode, String userId) {
        Room room = rooms.get(roomCode);
        if (room != null) {
            boolean isEmpty = room.leave(userId);
            // 如果leave()方法表示房间现在为空，则可以删除房间
            if (isEmpty) {
                rooms.remove(roomCode);
            } else {
                // 否则，通知房间内的其他成员有人离开
                Map<String, String> messageContent = new HashMap<>();
                messageContent.put("action", "left");
                messageContent.put("userId", userId);
                room.getMembers().forEach(memberId -> {
                    messagingTemplate.convertAndSend("/topic/room/" + roomCode, messageContent);
                });
            }
        }
    }

    @Scheduled(fixedRate = 300000) // 每5分钟执行一次
    public void scheduledCleanup() {
        rooms.entrySet().removeIf(entry -> entry.getValue().shouldCleanup());
    }
}
