import { configureStore } from '@reduxjs/toolkit';
import LoadingReducer from './reducers/loadingReducer';
import LoginReducer from './reducers/loginReducer';
import RolesReducer from './reducers/rolesReducer';
import UserReducer from './reducers/userReducer';

const loadingStore = configureStore({reducer:LoadingReducer});
const loginStore = configureStore({reducer: LoginReducer});
const rolesStore = configureStore({reducer: RolesReducer});
const userStore = configureStore({reducer: UserReducer});

export { loadingStore, loginStore, rolesStore, userStore };