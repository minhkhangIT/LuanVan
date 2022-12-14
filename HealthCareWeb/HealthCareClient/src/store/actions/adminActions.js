import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsersService, deleteUserService, updateUserService, getTopDoctorHomeService, getAllDoctorService, saveDetailDoctorService, getAllSpecialty, getAllClinic } from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }

        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log(error);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchPositonStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }

        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log(error);
        }
    }
}


export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }

        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log(error);
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (userData) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(userData);
            if (res && res.errCode === 0) {
                toast.success("Create a new user successd !");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error(res.errMessage);
                dispatch(saveUserFailed());
            }

        } catch (error) {
            toast.error("Create a new user error !");
            dispatch(saveUserFailed());
            console.log(error);
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllUsersService("ALL");
            // let res1 = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));// in nguoc arr
            } else {
                dispatch(fetchAllUsersFailed());
            }

        } catch (error) {
            dispatch(fetchAllUsersFailed());
            console.log(error);
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete the user successd !");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error(res.message)
                dispatch(deleteUserFailed());
            }

        } catch (error) {
            toast.error("Delete the user error !");
            dispatch(deleteUserFailed());
            console.log(error);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})


export const updateAUser = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateUserService(user);
            console.log(res);
            if (res && res.errCode === 0) {
                toast.success("Update the user successd !");
                dispatch(updateUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(updateUserFailed());
            }

        } catch (error) {
            toast.error("Update the user error !");
            dispatch(updateUserFailed());
            console.log(error);
        }
    }
}

export const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS
})

export const updateUserFailed = () => ({
    type: actionTypes.UPDATE_USER_FAILED
})

export const fetchTopDoctor = (by) => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService(by);

            if (res && res.errCode === 0) {

                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })

            }
        } catch (error) {
            toast.error("Fetch top doctor failed !");
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED
            })
        }
    }
}

export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })

            }
        } catch (error) {
            toast.error("Fetch top doctor failed !");
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            console.log(res);

            if (res && res.errCode === 0) {
                toast.success("Save infor doctor success !");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })

            }

            if (res && res.errCode === 1) {
                toast.error(`Save information doctor failed . ${res.errMessage} !`);
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })

            }
        } catch (error) {
            toast.error("Save information doctor failed !");
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
        }
    }
}

export const fetchAllScheduleHours = (type) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS,
                    dataTime: res.data
                })
            }
        } catch (error) {
            toast.error("Fetch schedule failed !");
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILED
            })
        }
    }
}

export const fetchRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty('');
            let resClinic = await getAllClinic('');
            if (resPrice && resPrice.errCode === 0 && resPayment && resPayment.errCode === 0 && resProvince && resProvince.errCode === 0 && resSpecialty && resSpecialty.errCode === 0 && resClinic && resClinic.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequireDoctorInfoSuccess(data));
            } else {
                dispatch(fetchRequireDoctorInfoFailed());
            }

        } catch (error) {
            dispatch(fetchRequireDoctorInfoFailed());
            console.log(error);
        }
    }
}

export const fetchRequireDoctorInfoSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data: data
})

export const fetchRequireDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED
})

