import clinicService from '../services/clinicService'
let createNewClinic = async (req, res) => {
    try {
        let response = await clinicService.createNewClinic(req.body);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server !'
        })
    }
}

let getAllClinic = async (req, res) => {
    try {
        let response = await clinicService.getAllClinic(req.query.by);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server !'
        })
    }
}

let getDetailClinicById = async (req, res) => {
    try {
        let response = await clinicService.getDetailClinicById(req.query.id);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server !'
        })
    }
}

let handleDeleteClinic = async (req, res) => {
    if (!req.body.id) {
        return ({
            errCode: 1,
            message: "Missing required parameters!"
        })
    }
    let message = await clinicService.deleteClinic(req.body.id);
    return res.status(200).json(message);
}

let handleEditClinic = async (req, res) => {
    let data = req.body;
    let message = await clinicService.updateClinic(data);
    return res.status(200).json(message);
}




module.exports = {
    createNewClinic: createNewClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
    handleDeleteClinic: handleDeleteClinic,
    handleEditClinic: handleEditClinic
}