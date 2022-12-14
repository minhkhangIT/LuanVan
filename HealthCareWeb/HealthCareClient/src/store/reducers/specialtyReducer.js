import actionTypes from '../actions/actionTypes';

const initialState = {
    listSpecialty: [],
    update: {}
}

const specialtyReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
            state.listSpecialty = action.data.resSpecialty;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_SPECIALTY_FAILED:
            state.listSpecialty = [];
            return {
                ...state,
            }

        case actionTypes.UPDATE_SPECIALTY_SUCCESS:
            state.update = action.data;
            return {
                ...state,
            }


        default:
            return state;
    }
}

export default specialtyReducer;



