import { CHANGE_ROLES, DELETE_ROLES} from "../actions/rolesActions";

const RolesReducer = (state = { roles:  []}, action) => {
    switch (action.type) {
        case CHANGE_ROLES: return {roles: action.payload};
        case DELETE_ROLES: return {roles: []};
        default: return state;
    }
}

export default RolesReducer;