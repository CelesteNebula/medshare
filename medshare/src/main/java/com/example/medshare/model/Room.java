package com.example.medshare.model;

import java.time.Instant;
import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class Room {
    private String roomCode;
    private Instant lastActive;
    private Set<String> members = ConcurrentHashMap.newKeySet();

    public Room(String roomCode) {
        this.roomCode = roomCode;
        this.lastActive = Instant.now();
    }

    public String getRoomCode() {
        return roomCode;
    }

    public synchronized void join(String userId) {
        members.add(userId);
        lastActive = Instant.now();
    }

    // 修改后的leave方法
    public synchronized boolean leave(String userId) {
        members.remove(userId); // 从成员列表中移除用户
        lastActive = Instant.now();
        
        // 如果成员列表为空，则返回true，表示房间可以被清理
        return members.isEmpty();
    }

    public Set<String> getMembers() {
        return Collections.unmodifiableSet(members);
    }

    public Instant getLastActive() {
        return lastActive;
    }

    public boolean shouldCleanup() {
        // 示例：如果房间在30分钟内没有活动，则认为应该被清理
        return lastActive.plusSeconds(1800).isBefore(Instant.now());
    }
}
