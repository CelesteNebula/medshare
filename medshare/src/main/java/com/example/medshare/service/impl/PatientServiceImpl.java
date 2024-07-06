package com.example.medshare.service.impl;

import com.example.medshare.model.Doctor;
import com.example.medshare.model.Patient;
import com.example.medshare.model.PatientFile;
import com.example.medshare.model.PatientTable;
import com.example.medshare.repository.PatientRepository;
import com.example.medshare.repository.PatientTableRepository;
import com.example.medshare.repository.DoctorRepository;
import com.example.medshare.repository.PatientFileRepository;
import com.example.medshare.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private PatientTableRepository patientTableRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private PatientFileRepository patientFileRepository;

    @Override
    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public Patient savePatient(Patient patient, String doctorId) {
        // 验证医生ID是否存在
        Optional<Doctor> doctorOptional = doctorRepository.findById(doctorId);
        if (!doctorOptional.isPresent()) {
            throw new RuntimeException("Doctor with id " + doctorId + " does not exist.");
        }

        // 检查病人信息是否已存在
        Patient savedPatient = patientRepository.findById(patient.getId())
                .orElseGet(() -> patientRepository.save(patient)); // 如果病人不存在，则保存新病人信息

        // 检查是否已存在对应的PatientTable记录
        List<PatientTable> existingPatientTable = patientTableRepository.findByDoctorDoctorIdAndPatientId(doctorId,
                patient.getId());
        if (existingPatientTable.isEmpty()) {
            // 如果不存在对应的PatientTable记录，创建新记录
            PatientTable patientTable = new PatientTable();
            patientTable.setDoctor(doctorOptional.get()); // 设置医生
            patientTable.setPatient(savedPatient); // 设置病人
            patientTableRepository.save(patientTable);
        }

        return savedPatient;
    }

    // 基本不用
    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // 实现更多服务方法
    @Override
    public List<Patient> findPatientsByDoctorDoctorId(String doctorId) {
        List<PatientTable> patientTables = patientTableRepository.findByDoctorDoctorId(doctorId);
        return patientTables.stream().map(PatientTable::getPatient).collect(Collectors.toList());
    }

    //
    @Override
    public void deletePatient(String patientId, String doctorId) {
        // 首先，删除与病人关联的所有PatientFile记录
        List<PatientFile> patientFiles = patientFileRepository.findByPatientId(patientId);
        if (!patientFiles.isEmpty()) {
            patientFileRepository.deleteAll(patientFiles);
        }

        // 然后，处理PatientTable记录
        List<PatientTable> patientTables = patientTableRepository.findByDoctorDoctorId(doctorId);
        patientTables.stream()
                .filter(pt -> pt.getPatient().getId().equals(patientId))
                .findFirst()
                .ifPresent(pt -> {
                    patientTableRepository.delete(pt);
                    patientRepository.deleteById(patientId);
                });
    }

    @Override
    public Patient updatePatient(Patient patient, String doctorId) {
        // 检查该病人是否属于该医生
        List<PatientTable> patientTables = patientTableRepository.findByDoctorDoctorId(doctorId);
        boolean exists = patientTables.stream().anyMatch(pt -> pt.getPatient().getId().equals(patient.getId()));
        if (!exists) {
            throw new RuntimeException("Patient does not belong to Doctor with id " + doctorId);
        }
        // 更新病人信息
        return patientRepository.save(patient);
    }

}
