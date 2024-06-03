import { getApi, postApi, putApi } from "./Interceptor";

const LOGIN_ADMIN = "login";
const FORGOT_PASSWORD = "forgotPassword";
const CHANGE_PASSWORD = "change_password";
const ADD_ADMIN_USER = "addManagerUser"
const Get_All_USER = "getAllUsers";
const Get_All_Abused_USER = "abusedusers"
const Get_Front_Page="frontpage"

export const adminLogin = (payload) => postApi(LOGIN_ADMIN, payload);

export const forgotPassword = (payload) => postApi(FORGOT_PASSWORD, payload);

export const changePassword = (payload) => putApi(CHANGE_PASSWORD, payload);

export const getAllUser = async (page, limit) => {
  try {
    const queryParams = new URLSearchParams({ page, limit }).toString();
    const res = await getApi(`${Get_All_USER}?${queryParams}`);
    return res;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const getAllAbusedUser = async (page, limit) => {
  try {
    const queryParams = new URLSearchParams({ page, limit }).toString();
    const res = await getApi(`${Get_All_Abused_USER}?${queryParams}`);
    return res;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const addAdminUser = (payload) => postApi(ADD_ADMIN_USER, payload)


export const getFrontPage = () => getApi(Get_Front_Page);