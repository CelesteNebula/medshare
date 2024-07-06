package com.example.medshare.controller;

import com.example.medshare.model.PatientFile;
import com.example.medshare.repository.PatientFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class PatientFileController {

    @Autowired
    private PatientFileRepository patientFileRepository;

    @GetMapping("/api/patientFiles/{patientId}")
    public List<String> getPatientFiles(@PathVariable String patientId) {
        List<PatientFile> files = patientFileRepository.findByPatientId(patientId);
        return files.stream()
                .map(file -> String.format("data:%s;base64,%s", file.getMimeType(),
                        Base64.getEncoder().encodeToString(file.getFileData())))
                .collect(Collectors.toList());
    }
}
