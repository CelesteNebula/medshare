package com.example.medshare.controller;

import com.example.medshare.dto.DoctorRegistrationDto;
import com.example.medshare.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public String registerDoctor(@RequestBody DoctorRegistrationDto registrationDto) {
        doctorService.registerNewDoctor(registrationDto);
        return "Doctor registered successfully";
    }
}
