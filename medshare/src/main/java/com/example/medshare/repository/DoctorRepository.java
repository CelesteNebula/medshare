package com.example.medshare.repository;

import com.example.medshare.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, String> {
    // 根据需要添加自定义查询方法
    Optional<Doctor> findByDoctorId(String doctorId);
}
