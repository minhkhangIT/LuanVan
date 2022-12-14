import db from '../models/index';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let createNewClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.nameVi || !data.nameEn || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown || !data.address) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                })
            } else {
                await db.Clinic.create({
                    nameVi: data.nameVi,
                    nameEn: data.nameEn,
                    image: data.imageBase64,
                    address: data.address,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    message: "Ok"
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let getAllClinic = (by) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll({
                where: {
                    nameVi: { [Op.like]: "%" + by + "%" },
                },
            });
            resolve({
                errCode: 0,
                message: "Ok",
                data: data
            })
        } catch (error) {
            reject(error)
        }
    })
}

let getDetailClinicById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                })
            } else {
                let data = await db.Clinic.findOne({
                    where: {
                        id: id
                    }

                })

                if (data) {
                    let doctorClinic = []
                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: {
                            clinicId: id
                        },
                        attributes: ['doctorId', 'provinceId'],
                    })

                    data.doctorClinic = doctorClinic
                    resolve({
                        errCode: 0,
                        message: "Ok",
                        data: data
                    })
                } else {
                    resolve({
                        errCode: 1,
                        message: "The clinic isn't exit",
                        data: data
                    })
                }


            }

        } catch (error) {
            reject(error)
        }
    })
}


let deleteClinic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinic = await db.Clinic.findOne({
                where: { id: id }
            })
            if (!clinic) {
                resolve({
                    errCode: 2,
                    errMessage: "The clinic isn't exit"
                })
            }
            await db.Clinic.destroy({
                where: { id: id }
            })

            resolve({
                errCode: 0,
                message: "The clinic is deleted"
            })

        } catch (error) {
            reject(error)
        }

    })
}

let updateClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.nameEn || !data.nameVi || !data.descriptionHTML || !data.descriptionMarkdown || !data.address) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters"
                })
            }
            let clinic = await db.Clinic.findOne({
                where: { id: data.id },
                raw: false
            })

            if (clinic) {
                clinic.nameEn = data.nameEn;
                clinic.nameVi = data.nameVi;
                clinic.address = data.address;
                clinic.descriptionHTML = data.descriptionHTML;
                clinic.descriptionMarkdown = data.descriptionMarkdown;
                if (data.imageBase64) {
                    clinic.image = data.imageBase64;
                }
                await clinic.save({
                });
                resolve({
                    errCode: 0,
                    message: 'Update the clinic succeed'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'Clinic not found!'
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewClinic: createNewClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
    deleteClinic: deleteClinic,
    updateClinic: updateClinic
}