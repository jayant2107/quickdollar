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
const Get_All_GeoCodes = "getAllGeoCodes";
const Get_Completed_Offer = "getCompletedOffers";
const Delete_User = "deleteUser";
const Get_Custom_Offer = "getCustomOffers";
const Get_All_Offers = "getAllOffers";
const ADD_OFFER = "addOffer";
const Active_User = "deactivateAndActivateUser";
const ActiveDeactive_All_Offers = "activateAndDeactivateAllOffers";
const Get_Dashboard = "dashboard";
const Delete_Offer = "deleteOffer";
const Announcement = "sendNotification";
const Get_Delivered_Gift_Card = "getAllDeliveredGiftCards";
const Get_ALL_Gift_Card = "getAllGiftCards";
const WEB_SETTING = "webSettings";
const ANDROID_SETTING = "androidSettings";
const IOS_SETTING = "iOSSettings";
const Chart_Data = "allOffersChart";

export const adminLogin = (payload) => postApi(LOGIN_ADMIN, payload);

export const forgotPassword = (payload) => postApi(FORGOT_PASSWORD, payload);

export const changePassword = (payload) => putApi(CHANGE_PASSWORD, payload);

export const getAllUser = async (query) =>
  await getApi(`${Get_All_USER}?${query}`);

export const getAllAbusedUser = async (query) =>
  await getApi(`${Get_All_Abused_USER}?${query}`);

export const EditAllUser = (payload) => patchApi(Edit_All_User, payload);

export const sendUserMessage = (payload) => postApi(SEND_USER_MESSAGE, payload);

export const addAdminUser = (payload) => postApi(ADD_ADMIN_USER, payload);

export const sendMessage = (payload) => postApi(SEND_MESSAGE, payload);

export const addFrontPage = (payload) => postApi(ADD_FRONT_PAGE, payload);

export const getAllGeoCodes = () => getApi(Get_All_GeoCodes);

export const getAllFrontPage = async (query) =>
  await getApi(`${Get_Front_Page}?${query}`);

export const getCompletedoffers = async (query) =>
  await getApi(`${Get_Completed_Offer}?${query}`);

export const deleteUser = async (id) => await deleteApi(Delete_User, id);

export const getViewCustomOffers = async (query) =>
  await getApi(`${Get_Custom_Offer}?${query}`);

export const getAllOffers = async (query) =>
  await getApi(`${Get_All_Offers}?${query}`);

export const addOffer = (payload) => postApi(ADD_OFFER, payload);

export const activateDeactivateAllOffers = async (payload) =>
  await patchApi(ActiveDeactive_All_Offers, payload);

export const userActiveModal = async (payload) =>
  await patchApi(Active_User, payload);

export const getDashboard = () => getApi(Get_Dashboard);

export const deleteOffers = (id) => deleteApi(Delete_Offer, id);

export const getDeliveredGiftCard = async (query) =>
  await getApi(`${Get_Delivered_Gift_Card}?${query}`);

export const getAllGiftCard = async (query) =>
  await getApi(`${Get_ALL_Gift_Card}?${query}`);

export const announcement = (payload) => announcement(Announcement, payload);

export const addWebSetting = (payload) => postApi(WEB_SETTING, payload);

export const addAndroidSetting = (payload) => postApi(ANDROID_SETTING, payload);

export const addIosSetting = (payload) => postApi(IOS_SETTING, payload);

export const getChartData = async (query) =>
  await getApi(`${Chart_Data}?${query}`);
