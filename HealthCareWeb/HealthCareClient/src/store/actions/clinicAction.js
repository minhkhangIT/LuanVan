import actionTypes from './actionTypes';
import { getAllClinic, deleteClinicService, updateClinicService, createNewClinicService } from '../../services/userService';
import { toast } from 'react-toastify';

export const fetchListClinic = (by) => {
    return async (dispatch, getState) => {
        try {
            let resClinic = await getAllClinic(by);
            if (resClinic && resClinic.errCode === 0) {
                let data = {
                    resClinic: resClinic.data
                }
                dispatch(fetchListClinicSuccess(data));
            } else {
                dispatch(fetchListClinicFailed());
            }

        } catch (error) {
            dispatch(fetchListClinicFailed());

        }
    }
}

export const fetchListClinicSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
    data: data
})

export const fetchListClinicFailed = () => ({
    type: actionTypes.FETCH_ALL_CLINIC_FAILED
})


export const deleteClinic = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteClinicService(id);
            if (res && res.errCode === 0) {
                toast.success("Delete the Clinic success !");
                dispatch(deleteClinicSuccess());
                dispatch(fetchListClinic(''));
            } else {
                dispatch(deleteClinicFailed());
            }

        } catch (error) {
            toast.error("Delete the Clinic error !");
            dispatch(deleteClinicFailed());
            console.log(error);
        }
    }
}

export const deleteClinicSuccess = () => ({
    type: actionTypes.DELETE_CLINIC_SUCCESS
})

export const deleteClinicFailed = () => ({
    type: actionTypes.DELETE_CLINIC_FAILED
})

export const updateClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateClinicService(data);
            if (res && res.errCode === 0) {
                toast.success("Update the Clinic success !");
                dispatch(updateClinicSuccess(res));
                dispatch(fetchListClinic(''));
            } else {
                dispatch(updateClinicFailed());
            }

        } catch (error) {
            toast.error("Update the Clinic error !");
            dispatch(updateClinicFailed());
        }
    }
}

export const updateClinicSuccess = (data) => ({
    type: actionTypes.UPDATE_CLINIC_SUCCESS,
    data: data

})

export const updateClinicFailed = () => ({
    type: actionTypes.UPDATE_CLINIC_FAILED
})


export const createNewClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewClinicService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new clinic success !");
                dispatch(fetchListClinic(''));
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Create a new clinic error !");
        }
    }
}