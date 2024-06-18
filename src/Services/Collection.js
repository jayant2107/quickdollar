import { deleteApi, getApi, patchApi, postApi, putApi } from "./Interceptor";

const LOGIN_ADMIN = "login";
const FORGOT_PASSWORD = "forgotPassword";
const CHANGE_PASSWORD = "change_password";
const Change_Admin_Pass = "changeAdminPassword";

const Get_Dashboard = "dashboard";
const Get_All_GeoCodes = "getAllGeoCodes";
const Chart_Data = "allOffersChart";

const Get_All_USER = "getAllUsers";
const Edit_All_User = "editUsers";
const Delete_User = "deleteUser";
const Active_User = "deactivateAndActivateUser";
const SEND_USER_MESSAGE = "sendUserMessgae";
const ADD_ADMIN_USER = "addManagerUser";
const Get_All_Abused_USER = "abusedusers";
const EXPORT_USER = "exportUsersToCSV";

const Get_All_Offers = "getAllOffers";
const ADD_OFFER = "addOffer";
const Get_Custom_Offer = "getCustomOffers";
const ActiveDeactive_All_Offers = "activateAndDeactivateAllOffers";
const Delete_Offer = "deleteOffer";
const Get_Completed_Offer = "getCompletedOffers";
const Delete_All_Offers = "deleteALLOffer";
const Edit_Offers = "editOffers";
const GET_ALL_DROPDOWN_USERS = "dropDownUsers";
const Get_User_And_Link = "getUserAndLink";

const Get_ALL_Gift_Card = "getAllGiftCards";
const Delete_AllGiftCard = "deleteGiftCard";
const Edit_Gift_Card = "editGiftCards";
const ADD_GIFT_CARD = "addGiftCard";
const Get_Delivered_Gift_Card = "getAllDeliveredGiftCards";
const REQUESTED_ALL_GIFT_CARD = "getAllRequestedGiftCards";
const Edit_Requested_Gift_Card = "editRequestedGiftCards";
const Delete_Reques_GiftCard = "deleteRequestedGiftCard";

const SEND_MESSAGE = "sendMessage";

const ADD_FRONT_PAGE = "addFrontPageOffer";
const Get_Front_Page = "frontpage";
const Delete_frontpage_Offer = "deleteFrontpageOffer";
const Edit_Frontpage_Offer = "editFrontPageOffer";

const Announcement = "sendNotification";

const PROMOTION_EMAIL = "promoEmail";

const SETTING = "settings";

/// auth ////
export const adminLogin = (payload) => postApi(LOGIN_ADMIN, payload);

export const forgotPassword = (payload) => postApi(FORGOT_PASSWORD, payload);

export const changePassword = (payload) => putApi(CHANGE_PASSWORD, payload);

export const changeAdminPass = (payload) => patchApi(Change_Admin_Pass, payload);

//// dashboard ////
export const getDashboard = () => getApi(Get_Dashboard);

export const getAllGeoCodes = () => getApi(Get_All_GeoCodes);

export const getChartData = (query) => getApi(`${Chart_Data}?${query}`);

//// users ////
export const getAllUser = (query) => getApi(`${Get_All_USER}?${query}`);

export const EditAllUser = (payload) => patchApi(Edit_All_User, payload);

export const deleteUser = (id) => deleteApi(Delete_User, id);

export const userActiveModal = (payload) => patchApi(Active_User, payload);

export const sendUserMessage = (payload) => postApi(SEND_USER_MESSAGE, payload);

export const addAdminUser = (payload) => postApi(ADD_ADMIN_USER, payload);

export const getAllAbusedUser = (query) => getApi(`${Get_All_Abused_USER}?${query}`);

export const getAllExportUser = () => getApi(EXPORT_USER);

//// offers ////
export const getAllOffers = (query) => getApi(`${Get_All_Offers}?${query}`);

export const addOffer = (payload) => postApi(ADD_OFFER, payload);

export const getViewCustomOffers = (query) => getApi(`${Get_Custom_Offer}?${query}`);

export const activateDeactivateAllOffers = (payload) => patchApi(ActiveDeactive_All_Offers, payload);

export const deleteOffers = (id) => deleteApi(Delete_Offer, id);

export const getCompletedoffers = (query) => getApi(`${Get_Completed_Offer}?${query}`);

export const deleteAllOffers = (id) => deleteApi(Delete_All_Offers, id)

export const editOffers = (payload) => patchApi(Edit_Offers, payload);

export const getAllDropdownUsers = (query) => getApi(`${GET_ALL_DROPDOWN_USERS}?${query}`);

export const getUserAndLink = (query) => getApi(`${Get_User_And_Link}?${query}`);

/// gift cards ////
export const getAllGiftCard = (query) => getApi(`${Get_ALL_Gift_Card}?${query}`);

export const deleteGiftCard = (id) => deleteApi(Delete_AllGiftCard, id);

export const editGiftCard = (payload) => patchApi(Edit_Gift_Card, payload);

export const addGiftCard = (payload) => postApi(ADD_GIFT_CARD, payload);

export const getDeliveredGiftCard = (query) => getApi(`${Get_Delivered_Gift_Card}?${query}`);

export const getRequestedGiftCard = (query) => getApi(`${REQUESTED_ALL_GIFT_CARD}?${query}`);

export const editRequestedGiftCard = (payload) => patchApi(Edit_Requested_Gift_Card, payload);

export const deleteRequestedGiftCard = (id) => deleteApi(Delete_Reques_GiftCard, id);

/// send message ///
export const sendMessage = (payload) => postApi(SEND_MESSAGE, payload);

//// frontpage  offers ////
export const addFrontPage = (payload) => postApi(ADD_FRONT_PAGE, payload);

export const getAllFrontPage = (query) => getApi(`${Get_Front_Page}?${query}`);

export const deleteFrontpageOffer = (id) => deleteApi(Delete_frontpage_Offer, id);

export const editFrontpageOffer = (payload) => patchApi(Edit_Frontpage_Offer, payload);

//// announcement ///
export const announcement = (payload) => postApi(Announcement, payload);

//// promotions ///
export const promotionEmail = (payload) => postApi(PROMOTION_EMAIL, payload);

//// settings //
export const addSetting = (payload) => patchApi(SETTING, payload);