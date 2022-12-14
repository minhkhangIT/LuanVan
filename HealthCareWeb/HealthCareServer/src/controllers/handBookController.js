import handBookService from '../services/handBookService'
let createNewHandBook = async (req, res) => {
    try {
        let response = await handBookService.createNewHandBook(req.body);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server !'
        })
    }
}

let getAllHandBook = async (req, res) => {
    try {
        let response = await handBookService.getAllHandBook();
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server !'
        })
    }
}

let getDetailHandBookById = async (req, res) => {
    try {
        let response = await handBookService.getDetailHandBookById(req.query.id);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server !'
        })
    }
}

let handleDeleteHandBook = async (req, res) => {
    if (!req.body.id) {
        return ({
            errCode: 1,
            message: "Missing required parameters!"
        })
    }
    let message = await handBookService.deleteHandBook(req.body.id);
    return res.status(200).json(message);
}

let handleEditHandBook = async (req, res) => {
    let data = req.body;
    let message = await handBookService.updateHandBook(data);
    return res.status(200).json(message);
}




module.exports = {
    createNewHandBook: createNewHandBook,
    getAllHandBook: getAllHandBook,
    getDetailHandBookById: getDetailHandBookById,
    handleDeleteHandBook: handleDeleteHandBook,
    handleEditHandBook: handleEditHandBook
}