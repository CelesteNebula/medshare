package com.example.medshare.config;

import com.example.medshare.security.JwtTokenFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf->csrf.disable()) // 禁用CSRF保护
            .addFilterBefore(new JwtTokenFilter(), UsernamePasswordAuthenticationFilter.class) // 在用户名密码认证之前添加JWT认证过滤器
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/login", "/register","/signal/**").permitAll() // 允许所有用户访问/login
                .anyRequest().authenticated() // 所有请求都需要认证
            );
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

}