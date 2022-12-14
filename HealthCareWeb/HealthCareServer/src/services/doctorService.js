import db from '../models/index';
require('dotenv').config();
import _, { reject } from 'lodash';
import emailService from '../services/emailService'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let getTopDoctorHome = (by) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                where: {
                    [Op.and]: [
                        { roleId: 'R2' }
                        ,
                        {
                            [Op.or]: [
                                { firstName: { [Op.like]: "%" + by + "%" } },
                                { lastName: { [Op.like]: "%" + by + "%" } }
                            ]
                        }
                    ]
                },
                order: [
                    [
                        'createdAt', 'DESC'
                    ]
                ],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                    {
                        model: db.Doctor_Infor, as: 'DoctorInfor',
                        include: [
                            {
                                model: db.Specialty, as: 'dataSpecialty',
                            },
                        ],
                    }
                ],

                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (error) {
            reject(error)
        }
    })
}

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                },
            })
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (error) {
            reject(error);
        }
    })
}

let saveInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.doctorId || !inputData.contentHTML
                || !inputData.contentMarkdown || !inputData.actions
                || !inputData.selectedPrice || !inputData.selectedPayment
                || !inputData.selectedProvince || !inputData.nameClinic
                || !inputData.addressClinic
                || !inputData.note
                || !inputData.specialtyId
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {
                //upsert markdown
                if (inputData.actions === "CREATE") {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId
                    })

                } else {
                    if (inputData.actions === "EDIT") {
                        let doctorMarkdown = await db.Markdown.findOne({
                            where: { doctorId: inputData.doctorId },
                            raw: false
                        })
                        if (doctorMarkdown) {
                            doctorMarkdown.contentHTML = inputData.contentHTML;
                            doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
                            doctorMarkdown.description = inputData.description;
                            await doctorMarkdown.save()
                        } else {
                            await db.Markdown.create({
                                contentHTML: inputData.contentHTML,
                                contentMarkdown: inputData.contentMarkdown,
                                description: inputData.description,
                                doctorId: inputData.doctorId
                            })
                        }
                    }
                }

                //upsert doctor infor
                let doctorInfor = await db.Doctor_Infor.findOne({
                    where: {
                        doctorId: inputData.doctorId,
                    },
                    raw: false
                })

                if (doctorInfor) {
                    //update
                    doctorInfor.doctorId = inputData.doctorId;
                    doctorInfor.priceId = inputData.selectedPrice;
                    doctorInfor.provinceId = inputData.selectedProvince;
                    doctorInfor.paymentId = inputData.selectedPayment;
                    doctorInfor.addressClinic = inputData.addressClinic;
                    doctorInfor.nameClinic = inputData.nameClinic;
                    doctorInfor.note = inputData.note;
                    doctorInfor.specialtyId = inputData.specialtyId;
                    doctorInfor.clinicId = inputData.clinicId;
                    await doctorInfor.save()
                } else {
                    //create
                    await db.Doctor_Infor.create({
                        doctorId: inputData.doctorId,
                        priceId: inputData.selectedPrice,
                        provinceId: inputData.selectedProvince,
                        paymentId: inputData.selectedPayment,
                        addressClinic: inputData.addressClinic,
                        nameClinic: inputData.nameClinic,
                        note: inputData.note,
                        specialtyId: inputData.specialtyId,
                        clinicId: inputData.clinicId
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save infor doctor success'
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getDetailDoctorById = (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idInput) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: idInput
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: [
                                'description',
                                'contentHTML',
                                'contentMarkdown'
                            ]
                        },
                        {
                            model: db.Allcode, as: 'positionData',
                            attributes: ['valueVi', 'valueEn']
                        },
                        {
                            model: db.Doctor_Infor, as: 'DoctorInfor',
                            include: [
                                {
                                    model: db.Allcode, as: 'priceTypeData',
                                    attributes: ['valueVi', 'valueEn']
                                },
                                {
                                    model: db.Allcode, as: 'provinceTypeData',
                                    attributes: ['valueVi', 'valueEn']
                                },
                                {
                                    model: db.Allcode, as: 'paymentTypeData',
                                    attributes: ['valueVi', 'valueEn']
                                },
                                {
                                    model: db.Specialty, as: 'dataSpecialty',
                                }
                            ],
                        }
                    ],
                    raw: false,
                    nest: true
                })

                if (data && data.image) {
                    data.image = Buffer.from(data.image, 'base64').toString('binary');
                }

                if (!data) {
                    data = {};
                }
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


let getDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: id
                    },
                    attributes: ['id', 'firstName', 'lastName', 'email', 'phoneNumber'],
                })
                if (!data) {
                    data = {};
                }
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


let createSchedule = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorId || !data.date) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameter !"
                })
            } else {
                var emailCancel = []
                var timeArr = []
                var bookedList = await db.Booking.findAll({
                    where: {
                        doctorId: data.doctorId,
                        date:data.date
                    },
                    attributes: ['emailPatient',"timeType","fullNamePatient","date"],
                    include: [
                        { model: db.Allcode, as: 'timeTypeDataBooking', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.User, as: 'DoctorDataBooking', attributes: ['firstName', 'lastName', 'phoneNumber'],
                        },
                    ],
                    raw: true,
                    nest: true
                })
                data.arrSchedule.forEach(element => {
                    timeArr.push(element.timeType)
                });
                bookedList.forEach(booked => {
                    if(timeArr.indexOf(booked.timeType) == -1){
                        emailCancel.push(booked)
                    }
                });
                if(emailCancel.length > 0){
                    try {
                        await emailService.sendEmailCancel(emailCancel)
                    } catch (error) {
                    }
                }
                let schedule = data.arrSchedule;
                let res = await deleteSchedule(data.doctorId, data.date)
                if (res && res.errCode === 0) {
                    schedule.forEach(async element => {
                        await db.Schedule.create({
                            date: data.date,
                            doctorId: data.doctorId,
                            timeType: element.timeType
                        });
                    });

                    // }
                    resolve({
                        errCode: 0,
                        message: "OK"
                    })
                } else {
                    resolve({
                        errCode: -1,
                        message: "Error"
                    })
                }

            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllScheduleByDoctorId = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters"
                })
            } else {
                let data = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                    },
                    // group: ['date'],
                    order: [
                        ['timeType', 'ASC'],
                        ['date', "DESC"]
                    ],
                    include: [
                        {
                            model: db.Allcode,
                            as: 'timeTypeData',
                            attributes: ['valueVi', 'valueEn']
                        },
                    ],
                    raw: false,
                    nest: true
                })

                if (!data) {
                    data = [];
                }

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


let getScheduleByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters"
                })
            } else {
                let data = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date,
                    },
                    order: [
                        ['timeType', 'ASC']
                    ],
                    include: [
                        {
                            model: db.Allcode,
                            as: 'timeTypeData',
                            attributes: ['valueVi', 'valueEn']
                        },
                        {
                            model: db.User,
                            as: 'DoctorData',
                            attributes: ['firstName', 'lastName'],
                            include: [
                                {
                                    model: db.Doctor_Infor, as: 'DoctorInfor',
                                    attributes: ['priceId'],
                                    include: [
                                        {
                                            model: db.Allcode, as: 'priceTypeData',
                                            attributes: ['valueVi', 'valueEn']
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                    raw: false,
                    nest: true
                })

                if (!data) {
                    data = [];
                }

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


let getDoctorHaveSchedule = (date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!date) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters"
                })
            } else {
                let data = await db.Schedule.findAll({
                    where: {
                        date: date
                    },
                    attributes: ['doctorId'],
                    group: ['doctorId'],

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

let deleteSchedule = (id, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            let schedule = await db.Schedule.findAll({
                where: { doctorId: id, date: date }
            })
            if (!schedule) {
                resolve({
                    errCode: 2,
                    errMessage: "The schedule isn't exit"
                })
            }
            await db.Schedule.destroy({
                where: { doctorId: id, date: date }
            })

            resolve({
                errCode: 0,
                message: "The schedule is deleted"
            })

        } catch (error) {
            reject(error)
        }

    })
}

let getExtraInforDoctorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters"
                })
            } else {
                let data = await db.Doctor_Infor.findOne({
                    where: {
                        doctorId: doctorId
                    },
                    include: [
                        {
                            model: db.Allcode, as: 'priceTypeData',
                            attributes: ['valueVi', 'valueEn']
                        },
                        {
                            model: db.Allcode, as: 'provinceTypeData',
                            attributes: ['valueVi', 'valueEn']
                        },
                        {
                            model: db.Allcode, as: 'paymentTypeData',
                            attributes: ['valueVi', 'valueEn']
                        }
                    ],
                    raw: false,
                    nest: true
                })

                if (!data) {
                    data = [];
                }

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

let getProfileDoctorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters"
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: doctorId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: [
                                'description',
                                'contentHTML',
                                'contentMarkdown'
                            ]
                        },
                        {
                            model: db.Allcode, as: 'positionData',
                            attributes: ['valueVi', 'valueEn']
                        },
                        {
                            model: db.Doctor_Infor, as: 'DoctorInfor',
                            include: [
                                {
                                    model: db.Allcode, as: 'priceTypeData',
                                    attributes: ['valueVi', 'valueEn']
                                },
                                {
                                    model: db.Allcode, as: 'provinceTypeData',
                                    attributes: ['valueVi', 'valueEn']
                                },
                                {
                                    model: db.Allcode, as: 'paymentTypeData',
                                    attributes: ['valueVi', 'valueEn']
                                },
                                {
                                    model: db.Specialty, as: 'dataSpecialty',
                                }
                            ],
                        },
                    ],
                    
                    raw: false,
                    nest: true
                })
                if (data && data.image) {
                    data.image = Buffer.from(data.image, 'base64').toString('binary');
                }

                if (!data) {
                    data = [];
                }

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

let getListPatientForDoctor = (doctorId, date, status, search) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !status) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters"
                })
            } else {
                let data = []
                let isWhere = {}
                if (doctorId === 'ALL') {
                    if (date) {
                        isWhere = {
                            statusId: status,
                            date: date,
                            phoneNumberPatient: { [Op.like]: search + "%" },
                        }
                    } else {
                        isWhere = {
                            statusId: status,
                            phoneNumberPatient: { [Op.like]: search + "%" },
                        }
                    }
                } else {
                    if (date) {
                        isWhere = {
                            statusId: status,
                            doctorId: doctorId,
                            date: date,
                            phoneNumberPatient: { [Op.like]: search + "%" },
                        }
                    } else {
                        isWhere = {
                            statusId: status,
                            doctorId: doctorId,
                            phoneNumberPatient: { [Op.like]: search + "%" },
                        }
                    }
                }

                data = await db.Booking.findAll({
                    where: isWhere,
                    include: [
                        { model: db.Allcode, as: 'genderDataPatient', attributes: ['valueVi', 'valueEn'] },
                        { model: db.Allcode, as: 'timeTypeDataBooking', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.User, as: 'DoctorDataBooking', attributes: ['firstName', 'lastName', 'phoneNumber'],
                            include: [
                                {
                                    model: db.Doctor_Infor, as: 'DoctorInfor',
                                },
                            ],
                        },
                    ],
                    raw: true,
                    nest: true

                })
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

let getListPatientByDoctorIdAndStatus = (doctorId, status, search) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !status) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameters"
                })
            } else {
                let data = []
                let isWhere
                if (search != "") {
                    isWhere = {
                        doctorId: doctorId,
                        statusId: status,
                        phoneNumberPatient: search
                    }
                } else {
                    isWhere = {
                        doctorId: doctorId,
                        statusId: status
                    }
                }

                data = await db.Booking.findAll({
                    where: isWhere,
                    group: ["patientAccountId"],
                    include: [
                        { model: db.Allcode, as: 'genderDataPatient', attributes: ['valueVi', 'valueEn'] },
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



let sendRemedy = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.diagnostic) {
                resolve({
                    errCode: 1,
                    message: "Missing required parameter !"
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        id: data.bookingId
                    },
                    raw: false
                })
                if (appointment) {
                    await db.Prescription.create({
                        bookingId: data.bookingId,
                        diagnostic: data.diagnostic,
                        advice: data.advice,
                        prescription: data.prescription,
                        dateReExamination: data.reExaminationDate
                    });
                    appointment.statusId = 'S3'
                    await appointment.save()
                    await emailService.sendAttachment(data)
                }
                resolve({
                    errCode: 0,
                    message: "Ok"
                })
            }
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

let getPrescriptionByPatientAccountId = (patientAccountId, doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!patientAccountId || !doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })
            } else {
                if (doctorId === "ALL") {
                    var isWhere = { patientAccountId: patientAccountId, statusId: "S3" }
                } else {
                    if (patientAccountId === "ALL") {
                        var isWhere = { doctorId: doctorId, statusId: "S3" }
                    } else {
                        var isWhere = { patientAccountId: patientAccountId, doctorId: doctorId }
                    }
                }
                let data = await db.Booking.findAll({
                    where: isWhere,
                    order: [
                        ['id', 'DESC']
                    ],
                    include: [
                        { model: db.Prescription },
                        {
                            model: db.Allcode, as: 'genderDataPatient', attributes: ['valueVi', 'valueEn'],
                        },
                        {
                            model: db.User, as: 'DoctorDataBooking',
                            attributes: ['firstName', 'lastName', 'phoneNumber'],
                            include: [
                                {
                                    model: db.Doctor_Infor, as: 'DoctorInfor',
                                    attributes: ['doctorId', 'addressClinic', 'nameClinic'],
                                    include: [
                                        {
                                            model: db.Specialty, as: 'dataSpecialty',
                                            attributes: ['nameVi']
                                        }
                                    ],

                                },
                                {
                                    model: db.Allcode, as: 'positionData',
                                    attributes: ['valueVi', 'valueEn']
                                },
                            ]
                        }
                    ],
                    raw: false,
                    nest: true
                })
                if (!data) {
                    data = {};
                }
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
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveInforDoctor: saveInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    createSchedule: createSchedule,
    getAllScheduleByDoctorId: getAllScheduleByDoctorId,
    getDoctorHaveSchedule: getDoctorHaveSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getDoctorById: getDoctorById,
    getListPatientForDoctor: getListPatientForDoctor,
    deleteSchedule: deleteSchedule,
    sendRemedy: sendRemedy,
    getPrescriptionByPatientAccountId: getPrescriptionByPatientAccountId,
    getListPatientByDoctorIdAndStatus: getListPatientByDoctorIdAndStatus
}