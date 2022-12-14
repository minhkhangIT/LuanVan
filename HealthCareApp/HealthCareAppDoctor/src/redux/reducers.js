import actionTypes from './actionsTypes';

const initialState = {
    isLogin: false,
    infoUser: {}
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.UPDATE_LOGIN:
            return {
                ...state,
                isLogin: action.isLogin
            }
        case actionTypes.UPDATE_INFO_USER:
            return {
                ...state,
                infoUser: action.infoUser
            }
        default:
            return state
    }
}