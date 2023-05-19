export const CHANGE_USER = 'CHANGE_USER';
export const changeUser = (name) => ({type: CHANGE_USER, payload: name});

export const DELETE_USER = 'DELETE_USER';
export const deleteUser = () => ({type: DELETE_USER});