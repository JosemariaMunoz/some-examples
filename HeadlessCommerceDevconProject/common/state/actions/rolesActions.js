export const CHANGE_ROLES = 'CHANGE_ROLES';
export const changeRoles = (roles) => ({type: CHANGE_ROLES, payload: roles});

export const DELETE_ROLES = 'DELETE_ROLES';
export const deleteRoles = () => ({type: DELETE_ROLES});