import { getApi, postApi } from "./Interceptor";

const LOGIN_ADMIN = "login";
const ADD_ADMIN_USER = "addManagerUser"
const Get_All_USER = "getAllUsers";
const Get_All_Abused_USER = "abusedusers"

export const adminLogin = (payload) => postApi(LOGIN_ADMIN, payload);

export const getAllUser = () => getApi(Get_All_USER);
export const getAllAbusedUser = () => getApi(Get_All_Abused_USER);
export const addAdminUser = (payload) => postApi(ADD_ADMIN_USER, payload)