import axios from "axios";
import store from "../Store/Store";

// const BaseUrl = process.env.REACT_APP_BASEURL;
const BaseUrl = process.env.REACT_APP_URL;
// const LiveUrl = "http://chayadapp-env.eba-kenpmbrm.us-east-1.elasticbeanstalk.com";

const EndPoint = BaseUrl;
const Api = axios.create({
  timeout: 1000000,
  baseURL: EndPoint,
});

Api.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
Api.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

Api.interceptors.request.use(
  (config) => {
    if (store.getState().Authlogin.data !== null) {
      const token = `B ${store.getState().Authlogin.data.token}`;
      // console.log(token, "uu");
      config.headers = {
        Authorization: token,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Add a response interceptor
Api.interceptors.response.use(
  (response) => {
    if (response.data.status === 401) {
      // store.dispatch(logout());
    } else {
      return response;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

//post Api
export const postApi = async (url, data) => {
  try {
    let result = await Api.post(url, data);
    if (result.status === 200) {
      if (result.data.status === 200) {
        return result.data;
      } else {
        return result.data.message;
      }
    }
  } catch (e) {
    if (e) {
      return e;
    }
  }
};

//delete Api
export const deleteApi = async (url,data) => {
  
  try {
    let result = await Api.delete(url, { params: data });
    if (result.status === 200) {
      if (result.data.status === 200) {
        return result.data;
      } else {
        return result.data.message;
      }
    }
  } catch (e) {
    if (e) {
      return e;
    }
  }
};

//get Api
export const getApi = async (url) => {
  try {
    let result = await Api.get(url);
    if (result.status === 200) {
      if (result.data.status === 200) {
        return result.data;
      } else {
        return result.data.message;
      }
    }
  } catch (e) {
    if (e) {
      return e;
    }
  }
};

//put Api
export const putApi = async (url, data) => {
  try {
    let result = await Api.put(url, data);
    if (result.status === 200) {
      if (result.data) {
        return { ...result.data, status: 200 };
      } else {
        return result.data.message;
      }
    }
  } catch (e) {
    if (e) {
      return e;
    }
  }
};

//patch Api
export const patchApi = async (url, data) => {
  try {
    let result = await Api.patch(url, data);
    if (result.status === 200) {
      return { ...result.data, status: 200 };
    } else {
      return result.data.message;
    }
  } catch (e) {
    if (e) {
      return e;
    }
  }
};