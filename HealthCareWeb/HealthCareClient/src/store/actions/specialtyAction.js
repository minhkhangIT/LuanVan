import actionTypes from './actionTypes';
import { getAllSpecialty, deleteSpecialtyService, updateSpecialtyService, createNewSpecialtyServer } from '../../services/userService';
import { toast } from 'react-toastify';

export const fetchListSpecialty = (by) => {
    return async (dispatch, getState) => {
        try {

            let resSpecialty = await getAllSpecialty(by);
            if (resSpecialty && resSpecialty.errCode === 0) {
                let data = {
                    resSpecialty: resSpecialty.data
                }
                dispatch(fetchListSpecialtySuccess(data));
            } else {
                dispatch(fetchListSpecialtyFailed());
            }

        } catch (error) {
            dispatch(fetchListSpecialtyFailed());

        }
    }
}

export const fetchListSpecialtySuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
    data: data
})

export const fetchListSpecialtyFailed = () => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_FAILED
})


export const deleteSpecialty = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteSpecialtyService(id);
            if (res && res.errCode === 0) {
                toast.success("Delete the Specialty success !");
                dispatch(deleteSpecialtySuccess());
                dispatch(fetchListSpecialty(''));
            } else {
                dispatch(deleteSpecialtyFailed());
            }

        } catch (error) {
            toast.error("Delete the Specialty error !");
            dispatch(deleteSpecialtyFailed());
            console.log(error);
        }
    }
}

export const deleteSpecialtySuccess = () => ({
    type: actionTypes.DELETE_SPECIALTY_SUCCESS
})

export const deleteSpecialtyFailed = () => ({
    type: actionTypes.DELETE_SPECIALTY_FAILED
})

export const updateSpecialty = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateSpecialtyService(data);
            if (res && res.errCode === 0) {
                toast.success("Update the specialty success !");
                dispatch(updateSpecialtySuccess(res));
                dispatch(fetchListSpecialty(''));
            } else {
                dispatch(updateSpecialtyFailed());
            }

        } catch (error) {
            toast.error("Update the specialty error !");
            dispatch(updateSpecialtyFailed());
            console.log(error);
        }
    }
}

export const updateSpecialtySuccess = (data) => ({
    type: actionTypes.UPDATE_SPECIALTY_SUCCESS,
    data: data

})

export const updateSpecialtyFailed = () => ({
    type: actionTypes.UPDATE_SPECIALTY_FAILED
})


export const createNewSpecialty = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewSpecialtyServer(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new specialty success !");
                dispatch(fetchListSpecialty(''));
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Create a new specialty error !");
        }
    }
}