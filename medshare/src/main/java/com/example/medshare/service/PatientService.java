package com.example.medshare.service;

import com.example.medshare.model.Patient;
import java.util.List;

public interface PatientService {
    Patient savePatient(Patient patient);
    Patient savePatient(Patient patient, String doctorId);
    List<Patient> getAllPatients();
    // 更多服务方法
    List<Patient> findPatientsByDoctorDoctorId(String doctorId);
    void deletePatient(String patientId, String doctorId);
    Patient updatePatient(Patient patient, String doctorId);

}
