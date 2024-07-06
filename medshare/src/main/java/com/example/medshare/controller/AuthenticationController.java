package com.example.medshare.controller;

import com.example.medshare.dto.LoginDto;
import com.example.medshare.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public String login(@RequestBody LoginDto loginDto) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                loginDto.getUsername(), loginDto.getPassword());
        Authentication authentication = authenticationManager.authenticate(authToken); // 进行身份认证
        if(authentication.isAuthenticated()) {
            String token = JwtUtil.generateToken(loginDto.getUsername()); // 生成JWT
            return "Bearer " + token; // 返回JWT
        }
        throw new RuntimeException("Authentication Failed"); // 或者返回更具体的错误信息
    }
}
