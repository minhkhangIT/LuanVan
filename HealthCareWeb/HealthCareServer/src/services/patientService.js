import { forEach, reject } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import db from '../models/index';
require('dotenv').config();
import emailService from './emailService'

let buildUrlEmailAccept = (doctorId, token) => {
    let result = '';
    result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result;
}

let buildUrlEmailCancel = (doctorId, token) => {
    let result = '';
    result = `${process.env.URL_REACT}/cancel-booking?token=${token}&doctorId=${doctorId}`
    return result;
}

let createPatientAccount = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.phoneNumber) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {
                await db.Patient_Account.findOrCreate({
                    where: {
                        phoneNumber: data.phoneNumber
                    },
                    defaults: {
                        phoneNumber: data.phoneNumber
                    }
                })
                resolve({
                    errCode: 0
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.patientAccountPhone || !data.email || !data.doctorId || !data.timeType || !data.date || !data.phoneNumber ||
                !data.fullName || !data.gender || !data.address) {
                resolve({
                    errCode: 1,
                    message: 'Missing parameter'
                })
            }
            else {
                let token = uuidv4();
                let patient = await db.Patient_Account.findOrCreate({
                    where: { phoneNumber: data.patientAccountPhone },
                    raw: false,
                    defaults: {
                        phoneNumber: data.patientAccountPhone,
                    }
                });
                if (!data.type) {
                    try {
                        await emailService.sendEmail({
                            receiverEmail: data.email,
                            patientName: data.fullName,
                            time: data.timeString,
                            doctorName: data.doctorName,
                            language: data.language,
                            redirectLinkAccept: buildUrlEmailAccept(data.doctorId, token),
                            redirectLinkCancel: buildUrlEmailCancel(data.doctorId, token)
                        });
                    } catch (error) {
                        resolve({
                            errCode: 1,
                            message: 'Email error !'
                        });
                    }
                }
                if (patient && patient[0]) {
                    await db.Booking.findOrCreate({
                        where: {
                            patientAccountId: patient[0].id,
                            phoneNumberPatient: data.phoneNumber,
                            statusId: ['S1', 'S2'],
                            timeType: data.timeType,
                            date: data.date
                        },
                        defaults: {
                            statusId: data.type && data.type === 'APP' ? 'S2' : 'S1',
                            doctorId: data.doctorId,
                            patientAccountId: patient[0].id,
                            emailPatient: data.email,
                            fullNamePatient: data.fullName,
                            addressPatient: data.address,
                            phoneNumberPatient: data.phoneNumber,
                            genderPatient: data.gender,
                            birthdayPatient: data.birthday,
                            date: data.date,
                            timeType: data.timeType,
                            token: token,
                            reason: data.reason,
                            price: data.price
                        }
                    })
                    resolve({
                        errCode: 0,
                        message: 'Make an appointment succeed'
                    });
                }
            }
        }
        catch (error) {
            reject(error);
        }
    })
}


let postUpdateAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.bookingID || !data.email || !data.doctorId || !data.timeType || !data.date || !data.phoneNumber ||
                !data.fullName || !data.gender || !data.address) {
                resolve({
                    errCode: 1,
                    message: 'Missing parameter'
                })
            } else {
                let booking = await db.Booking.findOne({
                    where: { id: data.bookingID },
                    raw: false
                })
                if (booking) {
                    booking.emailPatient = data.email;
                    booking.fullNamePatient = data.fullName;
                    booking.addressPatient = data.address;
                    booking.phoneNumberPatient = data.phoneNumber;
                    booking.genderPatient = data.gender;
                    booking.birthdayPatient = data.birthday;
                    booking.date = data.date;
                    booking.timeType = data.timeType;
                    booking.reason = data.reason;
                    booking.price = data.price;
                    await booking.save();
                    resolve({
                        errCode: 0,
                        message: 'Update appointment succeed'
                    });
                } else {
                    resolve({
                        errCode: 1,
                        message: 'Appointment not found!'
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    message: 'Missing parameter'
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S2';
                    await appointment.save();
                    resolve({
                        errCode: 0,
                        message: 'Update the appointment succeed !'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        message: 'Appointment is activated or exists !'
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

let postCancelBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    message: 'Missing parameter'
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S4';
                    await appointment.save();
                    resolve({
                        errCode: 0,
                        message: 'Update the appointment succeed !'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        message: 'Appointment is activated or exists !'
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

let deleteBooking = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let booking = await db.Booking.findOne({
                where: { id: id }
            })
            if (!booking) {
                resolve({
                    errCode: 2,
                    errMessage: "The booking isn't exit"
                })
            }
            await db.Booking.destroy({
                where: { id: id }
            })

            resolve({
                errCode: 0,
                message: "The booking is deleted"
            })

        } catch (error) {
            reject(error)
        }

    })
}

let getScheduleByPhonePatient = (phone) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!phone) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters"
                })
            } else {
                let patient = await db.Patient_Account.findOne({
                    where: {
                        phoneNumber: phone
                    },
                    attributes: ['id'],
                })
                let data = []
                if (patient) {
                    data = await db.Booking.findAll({
                        where: {
                            statusId: 'S2',
                            patientAccountId: patient.id,
                        },
                        order: [
                            ['id', 'DESC']
                        ],
                        include: [
                            { model: db.Allcode, as: 'timeTypeDataBooking', attributes: ['valueEn', 'valueVi'] },
                            {
                                model: db.Allcode, as: 'genderDataPatient',
                                attributes: ['valueVi', 'valueEn']
                            },
                            {
                                model: db.User, as: 'DoctorDataBooking',
                                attributes: ['firstName', 'lastName', 'phoneNumber'],
                                include: [
                                    {
                                        model: db.Allcode, as: 'positionData',
                                        attributes: ['valueVi', 'valueEn']
                                    },

                                    {
                                        model: db.Doctor_Infor, as: 'DoctorInfor',
                                        attributes: ['doctorId', 'addressClinic', 'nameClinic'],
                                        include: [
                                            {
                                                model: db.Allcode, as: 'priceTypeData',
                                                attributes: ['valueVi', 'valueEn']
                                            },
                                            {
                                                model: db.Specialty, as: 'dataSpecialty',
                                                attributes: ['nameVi']
                                            }
                                        ],

                                    },
                                ]
                            }
                        ],
                        raw: true,
                        nest: true
                    })
                }
                let dataResolve = data
                if (dataResolve && dataResolve.length > 0) {
                    for (let i = 0; i < dataResolve.length; i++) {
                        let checkTime = await db.Schedule.findOne({
                            where: {
                                doctorId: data[i].doctorId,
                                date: data[i].date,
                                timeType: data[i].timeType
                            },
                        })
                        dataResolve[i].checkTime = checkTime
                    }
                }
                resolve({
                    errCode: 0,
                    data: dataResolve
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let getScheduleByPhonePatientAndDate = (phone, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!phone) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters"
                })
            } else {
                let patient = await db.Patient_Account.findOne({
                    where: {
                        phoneNumber: phone
                    },
                    attributes: ['id'],
                })
                let data = {}
                if (patient) {
                    data = await db.Booking.findAll({
                        where: {
                            statusId: 'S2',
                            patientAccountId: patient.id,
                            date: date
                        },
                        order: [
                            ['id', 'DESC']
                        ],
                        include: [
                            { model: db.Allcode, as: 'timeTypeDataBooking', attributes: ['valueEn', 'valueVi'] },
                            {
                                model: db.Allcode, as: 'genderDataPatient',
                                attributes: ['valueVi', 'valueEn']
                            },
                            {
                                model: db.User, as: 'DoctorDataBooking',
                                attributes: ['firstName', 'lastName', 'phoneNumber'],
                                include: [
                                    {
                                        model: db.Allcode, as: 'positionData',
                                        attributes: ['valueVi', 'valueEn']
                                    },

                                    {
                                        model: db.Doctor_Infor, as: 'DoctorInfor',
                                        attributes: ['doctorId', 'addressClinic', 'nameClinic'],
                                        include: [
                                            {
                                                model: db.Allcode, as: 'priceTypeData',
                                                attributes: ['valueVi', 'valueEn']
                                            },
                                            {
                                                model: db.Specialty, as: 'dataSpecialty',
                                                attributes: ['nameVi']
                                            }
                                        ],

                                    },
                                ]
                            }
                        ],
                        raw: true,
                        nest: true
                    })
                }

                let dataResolve = data
                if (dataResolve && dataResolve.length > 0) {
                    for (let i = 0; i < dataResolve.length; i++) {
                        let checkTime = await db.Schedule.findOne({
                            where: {
                                doctorId: data[i].doctorId,
                                date: data[i].date,
                                timeType: data[i].timeType
                            },
                        })
                        dataResolve[i].checkTime = checkTime
                    }
                }
                resolve({
                    errCode: 0,
                    data: dataResolve
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}


let getDetailAppointment = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters"
                })
            } else {
                let data = await db.Booking.findOne({
                    where: {
                        id: id
                    },
                    include: [
                        { model: db.Allcode, as: 'timeTypeDataBooking', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.Allcode, as: 'genderDataPatient',
                            attributes: ['valueVi', 'valueEn']
                        },
                        {
                            model: db.User, as: 'DoctorDataBooking',
                            attributes: ['firstName', 'lastName', 'phoneNumber'],
                            include: [
                                {
                                    model: db.Allcode, as: 'positionData',
                                    attributes: ['valueVi', 'valueEn']
                                },

                                {
                                    model: db.Doctor_Infor, as: 'DoctorInfor',
                                    attributes: ['doctorId', 'addressClinic', 'nameClinic'],
                                    include: [
                                        {
                                            model: db.Allcode, as: 'priceTypeData',
                                            attributes: ['valueVi', 'valueEn']
                                        },
                                        {
                                            model: db.Specialty, as: 'dataSpecialty',
                                            attributes: ['nameVi']
                                        }
                                    ],

                                },
                            ]
                        }
                    ],
                    raw: false,
                    nest: true
                })
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment,
    postCancelBookAppointment: postCancelBookAppointment,
    deleteBooking: deleteBooking,
    getScheduleByPhonePatient: getScheduleByPhonePatient,
    getScheduleByPhonePatientAndDate: getScheduleByPhonePatientAndDate,
    getDetailAppointment: getDetailAppointment,
    postUpdateAppointment: postUpdateAppointment,
    createPatientAccount: createPatientAccount
}