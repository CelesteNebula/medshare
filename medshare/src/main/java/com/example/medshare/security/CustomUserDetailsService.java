package com.example.medshare.security;

import com.example.medshare.repository.DoctorRepository;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CustomUserDetailsService implements UserDetailsService {

    private final DoctorRepository doctorRepository;

    //private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

    public CustomUserDetailsService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //ogger.info("userDetailsService was called");
        //logger.info("user name is {}",username);
        var doctor = doctorRepository.findByDoctorId(username)
                .orElseThrow(() -> new UsernameNotFoundException("Doctor not found: " + username));
        return User.withUsername(doctor.getDoctorId())
                .password(doctor.getDoctorPassword()) // 在这里不需要进行密码加密
                .roles("DOCTOR")
                .build();
    }
}

