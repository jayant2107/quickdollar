import { getApi, postApi, putApi } from "./Interceptor";

const LOGIN_ADMIN = "login";
const FORGOT_PASSWORD = "forgotPassword";
const CHANGE_PASSWORD = "change_password";
const ADD_ADMIN_USER = "addManagerUser"
const Get_All_USER = "getAllUsers";
const Get_All_Abused_USER = "abusedusers";
const Get_All_GeoCodes = "getAllGeoCodes";
const Get_Dashboard = "dashboard"

export const adminLogin = (payload) => postApi(LOGIN_ADMIN, payload);

export const forgotPassword = (payload) => postApi(FORGOT_PASSWORD, payload);

export const changePassword = (payload) => putApi(CHANGE_PASSWORD, payload);

export const getAllUser = () => getApi(Get_All_USER);

export const getAllAbusedUser = () => getApi(Get_All_Abused_USER);

export const addAdminUser = (payload) => postApi(ADD_ADMIN_USER, payload);

export const getAllGeoCodes = () => getApi(Get_All_GeoCodes);

export const getDashboard = () => getApi(Get_Dashboard);
