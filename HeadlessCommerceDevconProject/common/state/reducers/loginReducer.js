import { CHANGE_LOGIN } from "../actions/loginActions";

const LoginReducer = (state = { loggedIn:  null}, action) => {
    switch (action.type) {
        case CHANGE_LOGIN: return {loggedIn: action.payload};
        default: return state;
    }
}

export default LoginReducer;