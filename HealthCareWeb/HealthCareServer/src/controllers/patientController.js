import { response } from "express";
import patientService from "../services/patientService";

let handleCreateNewPatientAccount = async (req, res) => {
    let message = await patientService.createPatientAccount(req.body);
    return res.status(200).json(message);
}

let postBookAppointment = async (req, res) => {

    try {
        let response = await patientService.postBookAppointment(req.body);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server !'
        })
    }
}

let postUpdateAppointment = async (req, res) => {
    try {
        let response = await patientService.postUpdateAppointment(req.body);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server !'
        })
    }
}



let postCancelBookAppointment = async (req, res) => {
    try {
        let response = await patientService.postCancelBookAppointment(req.body);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server !'
        })
    }
}

let postVerifyBookAppointment = async (req, res) => {
    try {
        let response = await patientService.postVerifyBookAppointment(req.body);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server !'
        })
    }
}

let deleteBooking = async (req, res) => {
    try {
        let response = await patientService.deleteBooking(req.body.id);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server !'
        })
    }
}

let getScheduleByPhonePatient = async (req, res) => {
    try {
        let response = await patientService.getScheduleByPhonePatient(req.query.phone);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCoce: -1,
            message: 'Error from server !'
        })
    }
}

let getScheduleByPhonePatientAndDate = async (req, res) => {
    try {
        let response = await patientService.getScheduleByPhonePatientAndDate(req.query.phone, req.query.date);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCoce: -1,
            message: 'Error from server !'
        })
    }
}

let getDetailAppointment = async (req, res) => {
    try {
        let response = await patientService.getDetailAppointment(req.query.id);
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
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment,
    postCancelBookAppointment: postCancelBookAppointment,
    deleteBooking: deleteBooking,
    getScheduleByPhonePatient: getScheduleByPhonePatient,
    getScheduleByPhonePatientAndDate: getScheduleByPhonePatientAndDate,
    postUpdateAppointment: postUpdateAppointment,
    handleCreateNewPatientAccount: handleCreateNewPatientAccount,
    getDetailAppointment: getDetailAppointment
}