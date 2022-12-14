import db from '../models/index';
import bcrypt from 'bcryptjs';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {

                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true
                });

                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'ok';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong password`;
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exits`;
            }
            resolve(userData);
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email },
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Allcode, as: 'positionData',
                            attributes: ['valueVi', 'valueEn']
                        },
                        {
                            model: db.Allcode, as: 'genderData',
                            attributes: ['valueVi', 'valueEn']
                        },
                    ],
                    raw: false,
                    nest: true
                });
            }
            if (userId && userId !== "ALL") {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    },
                })
            }
            resolve(users);

        } catch (error) {
            reject(error);
        }
    })
}

let getAllUsersByName = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                    where: {
                        [Op.and]: [
                            {
                                [Op.or]: [
                                    { firstName: { [Op.like]: "%" + name + "%" } },
                                    { lastName: { [Op.like]: "%" + name + "%" } }
                                ]
                            }
                        ]
                    },
                    order: [
                        [
                            'id', 'DESC'
                        ]
                    ],
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Allcode, as: 'positionData',
                            attributes: ['valueVi', 'valueEn']
                        },
                        {
                            model: db.Allcode, as: 'genderData',
                            attributes: ['valueVi', 'valueEn']
                        },
                    ],
                    raw: false,
                    nest: true
                });
            resolve(users);

        } catch (error) {
            reject(error);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email already exists'
                })
            }
            else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phoneNumber,
                    gender: data.gender,
                    image: data.avatar,
                    roleId: data.roleId,
                    positionId: data.positionId
                })
                resolve({
                    errCode: 0,
                    errMessage: "Create the user succeed"
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: "The user isn't exit"
                })
            }
            if (user && user.roleId !== 'R1') {
                await db.User.destroy({
                    where: { id: userId }
                })
                resolve({
                    errCode: 0,
                    message: "The user is deleted"
                })
            } else {
                resolve({
                    errCode: -1,
                    message: "The user is ADMIN"
                })
            }


        } catch (error) {
            reject(error)
        }

    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassWord = await bcrypt.hashSync(password, salt);
            resolve(hashPassWord)
        } catch (error) {
            reject(error);
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })

            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phonenumber = data.phoneNumber;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                if (data.avatar) {
                    user.image = data.avatar;
                }
                await user.save({
                });
                resolve({
                    errCode: 0,
                    message: 'Update the user succeed'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'User not found!'
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing requierd parameters !'
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });

                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    getAllCodeService: getAllCodeService,
    getAllUsersByName:getAllUsersByName
}