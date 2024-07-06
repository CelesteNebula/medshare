package com.example.medshare.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import com.example.medshare.util.JwtUtil;

import java.security.Principal;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AuthHandshakeInterceptor extends HttpSessionHandshakeInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(AuthHandshakeInterceptor.class);

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
            Map<String, Object> attributes) throws Exception {
        String token = request.getURI().getQuery().split("token=")[1];
        //logger.info("websocket token result: {}", token); // 记录token的返回值
        if (token != null && !token.isEmpty() && validateToken(token)) {
            String userId = JwtUtil.validateTokenAndRetrieveSubject(token);
            logger.info("websocket USERID result: {}", userId); // 记录用户ID的返回值
            if (userId != null) {
                // 创建并返回一个实现了Principal接口的匿名类实例
                Principal userPrincipal = new Principal() {
                    @Override
                    public String getName() {
                        return userId; // 用户ID作为Principal的名称
                    }
                };
                attributes.put("user", userPrincipal); // 使用"user"作为键存储Principal实例
                return true; // 继续握手过程
            }
        }
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        return false; // 如果令牌无效或未提供，拒绝握手请求
    }

    private boolean validateToken(String token) {
        // 实现令牌验证逻辑
        return JwtUtil.validateTokenAndRetrieveSubject(token) != null;
    }
}
