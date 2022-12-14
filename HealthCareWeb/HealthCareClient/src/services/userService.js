import axios from "../axios"
const handleLoginAPI = (email, password) => {
    let a = axios.post('/api/login', { email, password });
    return a;
}

const getAllUsersService = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const getAllUsersByNameService = (name) => {
    return axios.get(`/api/get-all-users-by-name?name=${name}`)
}


const createNewUserService = (dataUser) => {
    return axios.post(`/api/create-new-user`, dataUser)
}

const deleteUserService = (userId) => {
    return axios.delete(`/api/delete-user`,
        {
            data: {
                id: userId
            }
        });
}

const updateUserService = (user) => {
    return axios.put(`/api/edit-user`, user)
}

const getAllCodeService = (inputData) => {
    return axios.get(`/api/allcode?type=${inputData}`)
}

const getTopDoctorHomeService = (by) => {
    return axios.get(`/api/top-doctor-home?by=${by}`)
}

const getAllDoctorService = () => {
    return axios.get(`/api/get-all-doctors`)
}

const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctor`, data)
}

const getDetailInforDoctorService = (id) => {
    return axios.get(`api/get-detail-doctor-by-id?id=${id}`)
}

const saveScheduleDoctorService = (data) => {
    return axios.post(`/api/create-schedule`, data)
}

const getScheduleByDateService = (doctorId, date) => {
    return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInforDoctorByIdService = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorByIdService = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}
const postCancelBookAppointment = (data) => {
    return axios.post(`/api/cancel-book-appointment`, data)
}


const handleDeleteBooking = (id) => {
    return axios.delete(`/api/delete-booking`,
        {
            data: {
                id: id
            }
        });
}

const createNewSpecialtyServer = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}

const getAllSpecialty = (by) => {
    return axios.get(`/api/get-all-specialty?by=${by}`)
}

const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const deleteSpecialtyService = (id) => {
    return axios.delete(`/api/delete-specialty`,
        {
            data: {
                id: id
            }
        });
}

const updateSpecialtyService = (data) => {
    return axios.put(`/api/edit-specialty`, data)
}

const createNewClinicService = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}

const getAllClinic = (by) => {
    return axios.get(`/api/get-all-clinic?by=${by}`)
}

const getDetailClinicById = (id) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${id}`)
}

const deleteClinicService = (id) => {
    return axios.delete(`/api/delete-clinic`,
        {
            data: {
                id: id
            }
        });
}

const updateClinicService = (data) => {
    return axios.put(`/api/edit-clinic`, data)
}


const getDoctorHaveScheduleService = (date) => {
    return axios.get(`/api/get-doctor-have-schedule?date=${date}`)
}

const handleDeleteSchedule = (id, date) => {
    return axios.delete(`/api/delete-schedule`,
        {
            data: {
                id: id,
                date: date
            }
        });
}

const getDoctorById = (id) => {
    return axios.get(`api/get-doctors-by-id?id=${id}`)
}

const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}&status=${data.status}&search=${data.search}`)
}

const sendRemedyService = (data) => {
    return axios.post(`/api/send-remedy`, data)
}

const createNewHandBookService = (data) => {
    return axios.post(`/api/create-new-handbook`, data)
}

const getAllHandBook = () => {
    return axios.get(`/api/get-all-handbook`)
}

const deleteHandBookService = (id) => {
    return axios.delete(`/api/delete-handbook`,
        {
            data: {
                id: id
            }
        });
}

const updateHandBookService = (data) => {
    return axios.put(`/api/edit-handbook`, data)
}

const getDetailHandBookById = (id) => {
    return axios.get(`/api/get-detail-handbook-by-id?id=${id}`)
}

const getPrescriptionByPatientAccountId = (patientAccountId, doctorId) => {
    return axios.get(`/api/get-prescription-by-patient-account-id?patientAccountId=${patientAccountId}&doctorId=${doctorId}`)
}

export {
    handleLoginAPI,
    getAllUsersService,
    createNewUserService,
    deleteUserService,
    updateUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctorService,
    saveDetailDoctorService,
    getDetailInforDoctorService,
    saveScheduleDoctorService,
    getScheduleByDateService,
    getExtraInforDoctorByIdService,
    getProfileDoctorByIdService,
    postPatientBookAppointment,
    handleDeleteBooking,
    postVerifyBookAppointment,
    postCancelBookAppointment,
    createNewSpecialtyServer,
    getAllSpecialty,
    getDetailSpecialtyById,
    createNewClinicService,
    deleteSpecialtyService,
    updateSpecialtyService,
    getAllClinic,
    getDetailClinicById,
    deleteClinicService,
    updateClinicService,
    getDoctorHaveScheduleService,
    handleDeleteSchedule,
    getDoctorById,
    getAllPatientForDoctor,
    sendRemedyService,
    getAllHandBook,
    deleteHandBookService,
    updateHandBookService,
    createNewHandBookService,
    getDetailHandBookById,
    getPrescriptionByPatientAccountId,
    getAllUsersByNameService
}