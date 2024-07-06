package com.example.medshare.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.example.medshare.model.RoomRequest;
import com.example.medshare.service.RoomService;

@RestController
@RequestMapping("/api")
public class RoomController {
    private static final Logger logger = LoggerFactory.getLogger(RoomController.class);

    @Autowired
    private RoomService roomService;

    @PostMapping("/createRoom")
    public ResponseEntity<?> createRoom(@RequestBody RoomRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName(); // 获取当前用户ID
        boolean created = roomService.createRoom(request.getRoomCode());
        if (created) {
            roomService.joinRoom(request.getRoomCode(), userId);
            Map<String, Object> response = new HashMap<>();
            response.put("userId", userId);
            response.put("message", "房间创建成功，并已加入。");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(Map.of("error", "房间代码已存在。"));
        }
    }

    @PostMapping("/joinRoom")
    public ResponseEntity<?> joinRoom(@RequestBody RoomRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName(); // 获取当前用户ID
        Map<String, String> joinResult = roomService.joinRoom(request.getRoomCode(), userId);
        // logger.info("joinRoom result: {}", joinResult); // 记录joinRoom的返回值
        if ("success".equals(joinResult.get("status"))) {
            Map<String, Object> response = new HashMap<>();
            response.put("userId", userId);
            if (joinResult.get("destination") != null && !joinResult.get("destination").isEmpty()) {
                response.put("destination", joinResult.get("destination"));
                response.put("message", "成功加入房间，已找到目的地。");
            } else {
                response.put("message", "成功加入房间。等待另一方加入...");
            }
            return ResponseEntity.ok(response);
        } else {
            String errorMsg = joinResult.getOrDefault("message", "未知错误");
            logger.error("加入房间失败: {}", errorMsg); // 明确记录错误消息
            return ResponseEntity.badRequest().body(Map.of("error", errorMsg));
        }
    }

    @PostMapping("/leaveRoom")
    public ResponseEntity<?> leaveRoom(@RequestBody RoomRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName(); // 获取当前用户ID
        roomService.leaveRoom(request.getRoomCode(), userId);
        return ResponseEntity.ok(Map.of("message", "已成功离开房间。"));
    }

}
