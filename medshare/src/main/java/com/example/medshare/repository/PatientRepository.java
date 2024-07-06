package com.example.medshare.repository;

import com.example.medshare.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
//import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, String> {
    // 可以添加自定义的数据库访问方法
}
