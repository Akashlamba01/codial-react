import { API_URLS, getFormBody, LOCALSTORAGE_TOKEN_KEY } from "../utils";

const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem("access_token");

  const headers = {
    "content-type": "application/x-www-form-urlencoded",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = getFormBody(body);
  }

  try {
    const response = await fetch(url, config);
    console.log(response);
    const data = await response.json();
    console.log(data);

    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.error("error");
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPosts = (page = 1, limit = 5) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: "GET",
  });
};

export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: "POST",
    body: { email, password },
  });
};

export const register = async (username, email, password, confirmPassword) => {
  return customFetch(API_URLS.signup(), {
    method: "POST",
    body: { username, email, password, confirmPassword },
  });
};

export const editProfile = async (
  email,
  password,
  confirmPassword,
  username
) => {
  return customFetch(API_URLS.editUser(), {
    method: "POST",
    body: { email, password, confirmPassword, username },
  });
};

export const userProfileInfo = async (userId) => {
  return customFetch(API_URLS.userInfo(userId), {
    method: "GET",
  });
};

export const createFriend = async (userId) => {
  return customFetch(API_URLS.createFriendship(userId), {
    method: "POST",
  });
};

export const removeFriend = async (userId) => {
  return customFetch(API_URLS.removeFriendship(userId), {
    method: "POST",
  });
};

export const getFriends = async () => {
  return customFetch(API_URLS.getUser(), {
    method: "GET",
  });
};
