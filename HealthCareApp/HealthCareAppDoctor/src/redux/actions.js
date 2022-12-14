import actionTypes from './actionsTypes';


export const updateLogin = (data) => {
    return {
        type: actionTypes.UPDATE_LOGIN,
        isLogin: data
    }
}

export const updateUser = (data) => {
    return {
        type: actionTypes.UPDATE_INFO_USER,
        infoUser: data
    }
}