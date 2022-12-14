import express from "express";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import handBookController from "../controllers/handBookController"
let router = express.Router();

let initWebRoutes = (app) => {

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.get('/api/get-all-users-by-name', userController.getAllUsersByName);
    router.put('/api/edit-user', userController.handleEditUser);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/allcode', userController.getAllCode);

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);
    router.get('/api/get-doctors-by-id', doctorController.getDoctorById);
    router.post('/api/save-infor-doctor', doctorController.saveInforDoctor);
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
    router.post('/api/create-schedule', doctorController.handleCreateSchedule);
    router.get('/api/get-doctor-have-schedule', doctorController.getDoctorHaveSchedule);
    router.get('/api/get-schedule-by-doctorId', doctorController.getScheduleByDoctorID);
    router.get('/api/get-schedule-by-date', doctorController.getScheduleByDate);
    router.delete('/api/delete-schedule', doctorController.deleteSchedule);
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);
    router.get('/api/get-list-patient-for-doctor', doctorController.getListPatientForDoctor);
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById);
    router.post('/api/send-remedy', doctorController.sendRemedy);
    router.get('/api/get-prescription-by-patient-account-id', doctorController.getPrescriptionByPatientAccountId);
    router.get('/api/get-patient-by-doctorId-and-status', doctorController.getListPatientByDoctorIdAndStatus);

    router.post('/api/create-new-patient-account', patientController.handleCreateNewPatientAccount);
    router.post('/api/patient-book-appointment', patientController.postBookAppointment);
    router.post('/api/patient-update-appointment', patientController.postUpdateAppointment);
    router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment);
    router.post('/api/cancel-book-appointment', patientController.postCancelBookAppointment);
    router.delete('/api/delete-booking', patientController.deleteBooking);
    router.get('/api/get-schedule-by-phone-patient', patientController.getScheduleByPhonePatient);
    router.get('/api/get-schedule-by-phone-patient-and-date', patientController.getScheduleByPhonePatientAndDate);
    router.get('/api/get-detail-appointment', patientController.getDetailAppointment);

    router.post('/api/create-new-specialty', specialtyController.createNewSpecialty);
    router.get('/api/get-all-specialty', specialtyController.getAllSpecialty);
    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById);
    router.delete('/api/delete-specialty', specialtyController.handleDeleteSpecialty);
    router.put('/api/edit-specialty', specialtyController.handleEditSpecialty);

    router.post('/api/create-new-clinic', clinicController.createNewClinic);
    router.get('/api/get-all-clinic', clinicController.getAllClinic);
    router.get('/api/get-detail-clinic-by-id', clinicController.getDetailClinicById);
    router.delete('/api/delete-clinic', clinicController.handleDeleteClinic);
    router.put('/api/edit-clinic', clinicController.handleEditClinic);

    router.post('/api/create-new-handbook', handBookController.createNewHandBook);
    router.get('/api/get-all-handbook', handBookController.getAllHandBook);
    router.delete('/api/delete-handbook', handBookController.handleDeleteHandBook);
    router.put('/api/edit-handbook', handBookController.handleEditHandBook);
    router.get('/api/get-detail-handbook-by-id', handBookController.getDetailHandBookById);
    return app.use("/", router);
}

module.exports = initWebRoutes;