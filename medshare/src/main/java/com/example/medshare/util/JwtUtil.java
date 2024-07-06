package com.example.medshare.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JwtUtil {
    private static final String SECRET_KEY = "your_secret_key";
    private static final long EXPIRATION_TIME = 900_000; // 15 minutes
    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    public static String generateToken(String username) {
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(SECRET_KEY.getBytes()));
    }

    //public static String validateTokenAndRetrieveSubject(String token) {
        //return JWT.require(Algorithm.HMAC512(SECRET_KEY.getBytes()))
                //.build()
                //.verify(token)
                //.getSubject();
    //}
    public static String validateTokenAndRetrieveSubject(String token) {
        try {
            // 解析JWT令牌
            String subject = JWT.require(Algorithm.HMAC512(SECRET_KEY.getBytes()))
                    .build()
                    .verify(token)
                    .getSubject();
            //logger.info("Token verification successful, subject: {}", subject); // 新增日志记录
            return subject;
        } catch (Exception e) {
            logger.error("Token verification failed", e); // 修改日志记录，记录异常
            return null;
        }
    }
}
