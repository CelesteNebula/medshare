package com.example.medshare.config;

import com.example.medshare.repository.DoctorRepository;
import com.example.medshare.security.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityBeansConfig {

    @Bean
    public UserDetailsService userDetailsService(DoctorRepository doctorRepository) {
        return new CustomUserDetailsService(doctorRepository);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        //return new BCryptPasswordEncoder();
        return new PasswordEncoder() {
            @Override
            public String encode(CharSequence rawPassword) {
                // 直接返回明文密码
                return rawPassword.toString();
            }

            @Override
            public boolean matches(CharSequence rawPassword, String encodedPassword) {
                // 比较明文密码和存储的密码
                return rawPassword.toString().equals(encodedPassword);
            }
        };
    }
}
