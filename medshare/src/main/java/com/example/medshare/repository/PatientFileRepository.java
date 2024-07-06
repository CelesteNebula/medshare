package com.example.medshare.repository;

import com.example.medshare.model.PatientFile;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientFileRepository extends JpaRepository<PatientFile, Long> {
    // 可以添加更多自定义查询方法，但基本的CRUD已经足够
    
    //根据病人ID查找对应的文件
    List<PatientFile> findByPatientId(String patientId);
}
