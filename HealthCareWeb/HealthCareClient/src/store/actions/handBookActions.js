import actionTypes from './actionTypes';
import { getAllHandBook, deleteHandBookService, updateHandBookService, createNewHandBookService } from '../../services/userService';
import { toast } from 'react-toastify';

export const fetchListHandBook = () => {
    return async (dispatch, getState) => {
        try {

            let resHandBook = await getAllHandBook();
            if (resHandBook && resHandBook.errCode === 0) {
                let data = {
                    resHandBook: resHandBook.data
                }
                dispatch(fetchListHandBookSuccess(data));
            } else {
                dispatch(fetchListHandBookFailed());
            }

        } catch (error) {
            dispatch(fetchListHandBookFailed());

        }
    }
}

export const fetchListHandBookSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_HANDBOOK_SUCCESS,
    data: data
})

export const fetchListHandBookFailed = () => ({
    type: actionTypes.FETCH_ALL_HANDBOOK_FAILED
})


export const deleteHandBook = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteHandBookService(id);
            if (res && res.errCode === 0) {
                toast.success("Delete the handbook success !");
                dispatch(deleteHandBookSuccess());
                dispatch(fetchListHandBook());
            } else {
                dispatch(deleteHandBookFailed());
            }

        } catch (error) {
            toast.error("Delete the handbook error !");
            dispatch(deleteHandBookFailed());
            console.log(error);
        }
    }
}

export const deleteHandBookSuccess = () => ({
    type: actionTypes.DELETE_HANDBOOK_SUCCESS
})

export const deleteHandBookFailed = () => ({
    type: actionTypes.DELETE_HANDBOOK_FAILED
})

export const updateHandBook = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateHandBookService(data);
            if (res && res.errCode === 0) {
                toast.success("Update the handbook success !");
                dispatch(updateHandBookSuccess(res));
                dispatch(fetchListHandBook());
            } else {
                dispatch(updateHandbookFailed());
            }

        } catch (error) {
            toast.error("Update the handbook error !");
            dispatch(updateHandbookFailed());
        }
    }
}

export const updateHandBookSuccess = (data) => ({
    type: actionTypes.UPDATE_HANDBOOK_SUCCESS,
    data: data

})

export const updateHandbookFailed = () => ({
    type: actionTypes.UPDATE_HANDBOOK_FAILED
})


export const createNewHandBook = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewHandBookService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new handbook success !");
                dispatch(fetchListHandBook());
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Create a new handbook error !");
        }
    }
}