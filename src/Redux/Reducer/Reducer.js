
const iState = {
    employ: [],
    editData: {}
}

const Reducer = (state = iState, action) => {
    switch (action.type) {
        case 'ADD_EMPLOY':
            return {
                ...state,
                employ: action.payload
            }
        case 'EDIT_EMPLOY':
            return {
                ...state,
                editData: action.payload
            }
        default:
            return state
    }
}


export default Reducer