import actionTypes from '../actions/actionTypes';

const initialState = {
    listClinic: [],
    update: {}
}

const clinicReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
            state.listClinic = action.data.resClinic;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_CLINIC_FAILED:
            state.listClinic = [];
            return {
                ...state,
            }

        case actionTypes.UPDATE_CLINIC_SUCCESS:
            state.update = action.data;
            return {
                ...state,
            }


        default:
            return state;
    }
}

export default clinicReducer;



