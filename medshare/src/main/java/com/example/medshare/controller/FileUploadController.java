package com.example.medshare.controller;

import com.example.medshare.model.PatientFile;
import com.example.medshare.repository.PatientFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class FileUploadController {
    private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

    @Autowired
    private PatientFileRepository patientFileRepository;

    @PostMapping("/api/uploadFile")
    public String uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("patientId") String patientId) {
        try {
            PatientFile patientFile = new PatientFile();
            patientFile.setPatientId(patientId);
            patientFile.setFileName(file.getOriginalFilename());
            patientFile.setFileData(file.getBytes());
            patientFile.setMimeType(file.getContentType()); // 设置MIME类型
            
            logger.info("File Upload Controller is called!");
            logger.info("patientId is {}", patientId);
            logger.info("fileName is {}", file.getOriginalFilename());
            logger.info("MimeType is {}", file.getContentType());
            logger.info("File Upload Controller is ended!");

            patientFileRepository.save(patientFile);
            return "文件上传并保存成功";
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "文件上传失败", e);
        }
    }
}
