package com.example.medshare.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/signal")
                .setAllowedOrigins("http://localhost:8081/")
                //.setAllowedOrigins("http://10.102.226.45:8081/") // 确保这里的设置与前端应用的实际源匹配
                .addInterceptors(new AuthHandshakeInterceptor())
                .setHandshakeHandler(new CustomHandshakeHandler()) // 使用自定义HandshakeHandler
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableSimpleBroker("/topic", "/queue", "/user");
        // 以下行确保可以向特定用户发送消息
        registry.setUserDestinationPrefix("/user");
    }
}
