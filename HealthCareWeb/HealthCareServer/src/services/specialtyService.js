import db from '../models/index';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let createNewSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.nameVi || !data.nameEn || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                })
            } else {
                await db.Specialty.create({
                    nameVi: data.nameVi,
                    nameEn: data.nameEn,
                    image: data.imageBase64,
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

let getAllSpecialty = (by) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll({
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

let getDetailSpecialtyById = (id, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !location) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                })
            } else {
                let data = await db.Specialty.findOne({
                    where: {
                        id: id
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown', 'image'],

                })

                if (data) {
                    let doctorSpecialty = []
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: id
                            },
                            attributes: ['doctorId', 'provinceId'],
                        })
                    } else {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: id,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId'],
                        })
                    }
                    data.doctorSpecialty = doctorSpecialty
                    resolve({
                        errCode: 0,
                        message: "Ok",
                        data: data
                    })
                } else {
                    resolve({
                        errCode: 1,
                        message: "The specialty isn't exit",
                    })
                }


            }

        } catch (error) {
            reject(error)
        }
    })
}

let deleteSpecialty = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialty = await db.Specialty.findOne({
                where: { id: id }
            })
            if (!specialty) {
                resolve({
                    errCode: 2,
                    errMessage: "The specialty isn't exit"
                })
            }
            await db.Specialty.destroy({
                where: { id: id }
            })

            resolve({
                errCode: 0,
                message: "The specialty is deleted"
            })

        } catch (error) {
            reject(error)
        }

    })
}

let updateSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.nameEn || !data.nameVi || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters"
                })
            }
            let specialty = await db.Specialty.findOne({
                where: { id: data.id },
                raw: false
            })

            if (specialty) {
                specialty.nameEn = data.nameEn;
                specialty.nameVi = data.nameVi;
                specialty.descriptionHTML = data.descriptionHTML;
                specialty.descriptionMarkdown = data.descriptionMarkdown;
                if (data.imageBase64) {
                    specialty.image = data.imageBase64;
                }
                await specialty.save({
                });
                resolve({
                    errCode: 0,
                    message: 'Update the specialty succeed'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'Specialty not found!'
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    createNewSpecialty: createNewSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,
    deleteSpecialty: deleteSpecialty,
    updateSpecialty: updateSpecialty

}