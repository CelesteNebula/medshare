package com.example.medshare.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "patient_table")
public class PatientTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 这里根据您的数据库类型选择合适的策略
    private Long id; // 注意：类型从 String 改为了 Long 或其他您选择的主键类型
    
    @ManyToOne
    @JoinColumn(name = "doctorId", referencedColumnName = "doctorId")
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "pid", referencedColumnName = "id")
    private Patient patient;

    public PatientTable() {}

    // Getter and Setter
    public Long getPatientTable() {
        return id;
    }

    public void setPatientTable(Long id) {
        this.id = id;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }
}
