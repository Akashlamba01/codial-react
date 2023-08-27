import { useContext, useState, useEffect } from "react";
import jwt from "jwt-decode";

import { AuthContext } from "../providers/AuthProvider";
import {
  login as userLogin,
  register,
  editProfile,
  userProfileInfo,
  fetchFriends,
  getUserById,
} from "../api";
import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
} from "../utils";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN);

      if (userToken) {
        const user = jwt(userToken);

        setUser({
          ...user,
        });
      }

      setLoading(false);
    };

    getUser();
  }, []);

  const login = async (email, password) => {
    const response = await userLogin(email, password);

    console.log(response);

    if (response.success) {
      setUser(response.data);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN,
        response.data.access_token ? response.data.access_token : null
      );

      // setUser()

      return {
        success: true,
      };
    } else {
      return {
        message: response.message,
        success: false,
      };
    }
  };

  const editUser = async (email, username, password, confirmPassword) => {
    const response = await editProfile(
      email,
      username,
      password,
      confirmPassword
    );

    // console.log(response);
    console.log(response);
    if (response.success) {
      setUser(response.data);
      console.log(response);

      setItemInLocalStorage("access_token", response.data.access_token);
      return {
        data: response.data,
        success: true,
      };
    } else {
      return {
        message: response.message,
        success: false,
      };
    }
  };

  const signup = async (username, email, password, confirmPassword) => {
    const response = await register(username, email, password, confirmPassword);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const userInfo = async (userId) => {
    const response = await userProfileInfo(userId);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage("access_token");
  };

  const updateUserFriends = (addFriend, friend) => {
    if (addFriend) {
      setUser({
        ...user,
        friends: [...user.friends, friend],
      });
      return;
    }
  };

  return {
    user,
    login,
    logout,
    loading,
    signup,
    editUser,
    userInfo,
    updateUserFriends,
  };
};
