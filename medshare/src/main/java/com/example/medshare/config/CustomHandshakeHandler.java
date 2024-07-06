package com.example.medshare.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;

public class CustomHandshakeHandler extends DefaultHandshakeHandler {
    private static final Logger logger = LoggerFactory.getLogger(CustomHandshakeHandler.class);

    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String, Object> attributes) {
        // 从握手属性中获取用户Principal
        Principal tempUserPrincipal = (Principal) attributes.get("user");
        String tempPrincipaluserId = tempUserPrincipal.getName(); // 获取用户ID
        logger.info("tempPrincipaluserId is {}",tempPrincipaluserId);
        return (Principal) attributes.get("user");
    }
}

