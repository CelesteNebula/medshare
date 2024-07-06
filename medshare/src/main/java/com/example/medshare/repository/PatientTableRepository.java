package com.example.medshare.repository;

import com.example.medshare.model.PatientTable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PatientTableRepository extends JpaRepository<PatientTable, Long> {
    // 根据需要添加自定义查询方法
    List<PatientTable> findByDoctorDoctorId(String DoctorId);
    // 添加按医生ID和病人ID查询的方法
    List<PatientTable> findByDoctorDoctorIdAndPatientId(String DoctorId, String PatientId);
}
