import specialtyService from "../services/specialtyService"
let createNewSpecialty = async (req, res) => {
    try {
        let response = await specialtyService.createNewSpecialty(req.body);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server !'
        })
    }
}

let getAllSpecialty = async (req, res) => {
    try {
        let response = await specialtyService.getAllSpecialty(req.query.by);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server !'
        })
    }
}

let getDetailSpecialtyById = async (req, res) => {
    try {
        let response = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server !'
        })
    }
}

let handleDeleteSpecialty = async (req, res) => {
    if (!req.body.id) {
        return ({
            errCode: 1,
            message: "Missing required parameters!"
        })
    }
    let message = await specialtyService.deleteSpecialty(req.body.id);
    return res.status(200).json(message);
}

let handleEditSpecialty = async (req, res) => {
    let data = req.body;
    let message = await specialtyService.updateSpecialty(data);
    return res.status(200).json(message);
}




module.exports = {
    createNewSpecialty: createNewSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,
    handleDeleteSpecialty: handleDeleteSpecialty,
    handleEditSpecialty: handleEditSpecialty
}