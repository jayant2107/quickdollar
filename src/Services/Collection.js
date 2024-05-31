import { postApi } from "./Interceptor";

const LOGIN_ADMIN = "login";

export const adminLogin = (payload) => postApi(LOGIN_ADMIN, payload);
