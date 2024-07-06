package com.example.medshare.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "patient")
public class Patient {
    @Id
    private String id;
    private String name;
    private int age;
    private String gender;
    private String doctor;
    private String disease;
    private LocalDateTime visitTime;
    private String phoneNumber;

    public Patient() {
    }

    // Getter and Setter
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    //public String getName() {
    //    return name;
    //}

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDoctor() {
        return doctor;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public String getDisease() {
        return disease;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public LocalDateTime getVisitTime() {
        return visitTime;
    }

    public void setVisitTime(LocalDateTime visitTime) {
        this.visitTime = visitTime;
    }

    //public String getPhoneNumber() {
    //    return phoneNumber;
    //}

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    // 新增脱敏姓名
    public String getName() {
        if (name != null && !name.isEmpty()) {
            return name.substring(0, 1) + "*".repeat(name.length() - 1);
        }
        return name;
    }

    // 新增脱敏手机号
    public String getPhoneNumber() {
        if (phoneNumber != null && phoneNumber.length() == 11) {
            return phoneNumber.substring(0, 3) + "*".repeat(4) + phoneNumber.substring(7);
        }
        return phoneNumber;
    }
}
