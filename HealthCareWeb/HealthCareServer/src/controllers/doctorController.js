import { response } from "express";
import doctorService from "../services/doctorService";

let getTopDoctorHome = async (req, res) => {
    try {
        let response = await doctorService.getTopDoctorHome(req.query.by);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server !'
        })
    }
}

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors);

    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server !'
        })
    }
}

let saveInforDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveInforDoctor(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server !'
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getDetailDoctorById(req.query.id)
        return res.status(200).json(infor)

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCoce: -1,
            message: 'Error from server !'
        })
    }
}

let handleCreateSchedule = async (req, res) => {
    try {
        let response = await doctorService.createSchedule(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCoce: -1,
            message: 'Error from server !'
        })
    }
}

let getDoctorHaveSchedule = async (req, res) => {
    try {
        let response = await doctorService.getDoctorHaveSchedule(req.query.date);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCoce: -1,
            message: 'Error from server !'
        })
    }
}

let getScheduleByDoctorID = async (req, res) => {
    try {
        let response = await doctorService.getAllScheduleByDoctorId(req.query.doctorId);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCoce: -1,
            message: 'Error from server !'
        })
    }
}


let getScheduleByDate = async (req, res) => {
    try {
        let response = await doctorService.getScheduleByDate(req.query.doctorId, req.query.date);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCoce: -1,
            message: 'Error from server !'
        })
    }
}

let deleteSchedule = async (req, res) => {
    if (!req.body.id || !req.body.date) {
        return ({
            errCode: 1,
            message: "Missing required parameters!"
        })
    }
    let message = await doctorService.deleteSchedule(req.body.id, req.body.date);
    return res.status(200).json(message);
}

let getExtraInforDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getExtraInforDoctorById(req.query.doctorId);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCoce: -1,
            message: 'Error from server !'
        })
    }
}

let getProfileDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getProfileDoctorById(req.query.doctorId);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCoce: -1,
            message: 'Error from server !'
        })
    }
}

let getDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getDoctorById(req.query.id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCoce: -1,
            message: 'Error from server !'
        })
    }
}

let getListPatientForDoctor = async (req, res) => {
    try {
        let response = await doctorService.getListPatientForDoctor(req.query.doctorId, req.query.date, req.query.status, req.query.search);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCoce: -1,
            message: 'Error from server !'
        })
    }
}

let sendRemedy = async (req, res) => {
    try {
        let response = await doctorService.sendRemedy(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCoce: -1,
            message: 'Error from server !'
        })
    }
}

let getPrescriptionByPatientAccountId = async (req, res) => {
    try {
        let response = await doctorService.getPrescriptionByPatientAccountId(req.query.patientAccountId, req.query.doctorId)
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCoce: -1,
            message: 'Error from server !'
        })
    }
}

let getListPatientByDoctorIdAndStatus = async (req, res) => {
    try {
        let response = await doctorService.getListPatientByDoctorIdAndStatus(req.query.doctorId, req.query.status, req.query.search)
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCoce: -1,
            message: 'Error from server !'
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveInforDoctor: saveInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    handleCreateSchedule: handleCreateSchedule,
    getDoctorHaveSchedule: getDoctorHaveSchedule,
    getScheduleByDate: getScheduleByDate,
    getScheduleByDoctorID: getScheduleByDoctorID,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getDoctorById: getDoctorById,
    getListPatientForDoctor: getListPatientForDoctor,
    deleteSchedule: deleteSchedule,
    sendRemedy: sendRemedy,
    getPrescriptionByPatientAccountId: getPrescriptionByPatientAccountId,
    getListPatientByDoctorIdAndStatus: getListPatientByDoctorIdAndStatus
}