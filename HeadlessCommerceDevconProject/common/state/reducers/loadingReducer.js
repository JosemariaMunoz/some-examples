import { CHANGE_LOADING } from "../actions/loadingActions";

const LoadingReducer = (state = { loading:  null}, action) => {
    switch (action.type) {
        case CHANGE_LOADING: return {loading: action.payload};
        default: return state;
    }
}

export default LoadingReducer;