package com.example.medshare.security;

//import com.auth0.jwt.JWT;
//import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.medshare.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

//import java.util.ArrayList;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

public class JwtTokenFilter extends GenericFilterBean {

    //private static final Logger logger = LoggerFactory.getLogger(JwtTokenFilter.class);

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain)
            throws IOException, ServletException {
        try {
            HttpServletRequest request = (HttpServletRequest) req;
            String token = request.getHeader("Authorization");
            //logger.info("JwtTokenFilter was called");
            //logger.info("token is {}",token);
            if (token != null && !token.isEmpty()) {
                //logger.info("token != null && !token.isEmpty");
                String user = JwtUtil.validateTokenAndRetrieveSubject(token.replace("Bearer ", ""));
                if (user != null) {
                    // Token is valid and not expired.
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user, null, null);
                    SecurityContextHolder.getContext().setAuthentication(auth);
                } else {
                    // Token validation failed.
                    SecurityContextHolder.clearContext();
                }
            }
            filterChain.doFilter(req, res);
        } catch (JWTVerificationException e) {
            HttpServletResponse response = (HttpServletResponse) res;
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized: Invalid or expired token.");
        }
    }
}