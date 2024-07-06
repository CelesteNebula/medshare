// src/services/patientService.js
import API from './api';

const addPatient = (patientData, doctorId) => {
  // 将doctorId添加到请求体中，以便后端能够识别
  return API.post(`/patients?doctorId=${doctorId}`, patientData);
};

const updatePatient = (patientData, doctorId) => {
  // 注意这里不再需要将patientId嵌入到URL中
  console.log("Updating patient with doctorId:", doctorId);
  return API.put(`/patients?doctorId=${doctorId}`, patientData);
};

const getAllPatients = () => {
  return API.get('/patients');
};

const getPatientsByDoctorId = (doctorId) => {
  return API.get(`/patients/by-doctor/${doctorId}`);
};

const deletePatient = (patientId, doctorId) => {
  return API.delete(`/patients/${patientId}?doctorId=${doctorId}`);
};


export { addPatient, updatePatient, getAllPatients, getPatientsByDoctorId, deletePatient };
