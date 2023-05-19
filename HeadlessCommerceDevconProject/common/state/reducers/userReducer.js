import { CHANGE_USER, DELETE_USER} from "../actions/userActions";

const UserReducer = (state = { userName:  null}, action) => {
    switch (action.type) {
        case CHANGE_USER: return {userName: action.payload};
        case DELETE_USER: return {userName: null};
        default: return state;
    }
}

export default UserReducer;