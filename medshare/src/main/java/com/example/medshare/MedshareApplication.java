package com.example.medshare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MedshareApplication {

    public static void main(String[] args) {
        SpringApplication.run(MedshareApplication.class, args);
    }
}
