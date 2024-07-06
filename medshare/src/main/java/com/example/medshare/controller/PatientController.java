package com.example.medshare.controller;

import com.example.medshare.model.Patient;
import com.example.medshare.service.PatientService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {
    private static final Logger logger = LoggerFactory.getLogger(PatientController.class);

    @Autowired
    private PatientService patientService;

    @PostMapping
    public Patient addPatient(@RequestBody Patient patient, @RequestParam String doctorId) {
        return patientService.savePatient(patient, doctorId);
    }

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    // 更多控制器方法
    @GetMapping("/by-doctor/{doctorId}")
    public List<Patient> getPatientsByDoctorId(@PathVariable String doctorId) {
        return patientService.findPatientsByDoctorDoctorId(doctorId);
    }

    @PutMapping
    public Patient updatePatient(@RequestBody Patient patient, @RequestParam String doctorId) {
        // 直接使用请求体中的Patient对象和查询参数中的doctorId调用服务层方法
        logger.info("doctorID is {}", doctorId);
        return patientService.updatePatient(patient, doctorId);
    }

    @DeleteMapping("/{patientId}")
    public void deletePatient(@PathVariable String patientId, @RequestParam String doctorId) {
        patientService.deletePatient(patientId, doctorId);
    }

}
