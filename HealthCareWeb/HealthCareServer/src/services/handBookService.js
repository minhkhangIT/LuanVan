import db from '../models/index';

let createNewHandBook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.nameVi || !data.nameEn || !data.descriptionHTML || !data.descriptionMarkdown || !data.imageBase64) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                })
            } else {
                await db.HandBook.create({
                    nameVi: data.nameVi,
                    nameEn: data.nameEn,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    image: data.imageBase64
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

let getAllHandBook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.HandBook.findAll();
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

let getDetailHandBookById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter"
                })
            } else {
                let data = await db.HandBook.findOne({
                    where: {
                        id: id
                    }
                })

                if (data) {
                    resolve({
                        errCode: 0,
                        message: "Ok",
                        data: data
                    })
                } else {
                    resolve({
                        errCode: 1,
                        message: "Handbook isn't exit",
                        data: data
                    })
                }


            }
        } catch (error) {
            reject(error)
        }
    })
}


let deleteHandBook = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let handBook = await db.HandBook.findOne({
                where: { id: id }
            })
            if (!handBook) {
                resolve({
                    errCode: 2,
                    errMessage: "The handbook isn't exit"
                })
            }
            await db.HandBook.destroy({
                where: { id: id }
            })

            resolve({
                errCode: 0,
                message: "The handbook is deleted"
            })

        } catch (error) {
            reject(error)
        }

    })
}

let updateHandBook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.nameEn || !data.nameVi || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters"
                })
            }
            let handBook = await db.HandBook.findOne({
                where: { id: data.id },
                raw: false
            })

            if (handBook) {
                handBook.nameEn = data.nameEn;
                handBook.nameVi = data.nameVi;
                handBook.descriptionHTML = data.descriptionHTML;
                handBook.descriptionMarkdown = data.descriptionMarkdown;
                handBook.image = data.imageBase64
                await handBook.save({
                });
                resolve({
                    errCode: 0,
                    message: 'Update the HandBook succeed'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'HandBook not found!'
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewHandBook: createNewHandBook,
    getAllHandBook: getAllHandBook,
    getDetailHandBookById: getDetailHandBookById,
    deleteHandBook: deleteHandBook,
    updateHandBook: updateHandBook
}