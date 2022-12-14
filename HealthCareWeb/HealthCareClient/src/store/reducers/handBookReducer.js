import actionTypes from '../actions/actionTypes';

const initialState = {
    listHandBook: [],
    update: {}
}

const handBookReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_HANDBOOK_SUCCESS:
            state.listHandBook = action.data.resHandBook;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_HANDBOOK_FAILED:
            state.listHandBook = [];
            return {
                ...state,
            }

        case actionTypes.UPDATE_HANDBOOK_SUCCESS:
            state.update = action.data;
            return {
                ...state,
            }


        default:
            return state;
    }
}

export default handBookReducer;



