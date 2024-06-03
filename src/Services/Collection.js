import { deleteApi, getApi, patchApi, postApi, putApi } from "./Interceptor";

const LOGIN_ADMIN = "login";
const FORGOT_PASSWORD = "forgotPassword";
const CHANGE_PASSWORD = "change_password";
const ADD_ADMIN_USER = "addManagerUser";
const Get_All_USER = "getAllUsers";
const Get_Front_Page = "frontpage";
const Edit_All_User = "editUsers";
const SEND_USER_MESSAGE = "sendUserMessgae";
const Get_All_Abused_USER = "abusedusers";
const SEND_MESSAGE = "sendMessage";
const ADD_FRONT_PAGE = "addFrontPageOffer";
const Get_Completed_Offer = "getCompletedOffers"
const Delete_User="deleteUser"

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

export const EditAllUser = (payload) => patchApi(Edit_All_User, payload);

export const sendUserMessage = (payload) => postApi(SEND_USER_MESSAGE, payload);

export const addAdminUser = (payload) => postApi(ADD_ADMIN_USER, payload);

export const sendMessage = (payload) => postApi(SEND_MESSAGE, payload);

export const addFrontPage = (payload) => postApi(ADD_FRONT_PAGE, payload);


export const getFrontPage = async (page, limit) => {
  try {
    const queryParams = new URLSearchParams({ page, limit }).toString();
    const res = await getApi(`${Get_Front_Page}?${queryParams}`);
    return res;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const getCompletedoffers = async (page, limit) => {
  try {
    const queryParams = new URLSearchParams({ page, limit }).toString();
    const res = await getApi(`${Get_Completed_Offer}?${queryParams}`);
    return res;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const  deleteUser=(id)=> deleteApi(Delete_User,id);
