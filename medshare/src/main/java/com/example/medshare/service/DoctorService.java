package com.example.medshare.service;

import com.example.medshare.dto.DoctorRegistrationDto;
import com.example.medshare.model.Doctor;
import com.example.medshare.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public DoctorService() {}

    public Doctor registerNewDoctor(DoctorRegistrationDto registrationDto) {
        Doctor doctor = new Doctor();
        doctor.setDoctorId(registrationDto.getDoctorId());
        doctor.setDoctorPassword(passwordEncoder.encode(registrationDto.getPassword()));
        //doctor.setDoctorPassword(registrationDto.getPassword());
        doctor.setDoctorName(registrationDto.getDoctorName());
        doctor.setDoctorGender(registrationDto.getDoctorGender());

        Doctor savedDoctor = doctorRepository.save(doctor); // 保存医生信息

        return savedDoctor; // 返回保存的医生信息
    }
}
