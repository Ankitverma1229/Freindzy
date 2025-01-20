import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { clearUserDetails, setUserDetails } from "../store/Userslice";
import { Dispatch } from "@reduxjs/toolkit";
import { UserType } from "../types/Friends";

const BackendURL = import.meta.env.VITE_BACKEND_BASE_URL;

const getToken = () => {
  return sessionStorage.getItem("token");
};

export const sendRegistrationDetails = async (
  formData: UserType,
  navigate: NavigateFunction
) => {
  try {
    const response = await axios.post(`${BackendURL}/auth/register`, formData);
    if (response) {
      toast.success(response.data.message);
      sessionStorage.setItem("token", response.data.token);

      navigate("/home");
      return response.data;
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
    throw new Error(
      error.response?.data?.message || "Error in registration try again"
    );
  }
};

export const sendLoginDetails = async (
  formData: UserType,
  navigate: NavigateFunction
) => {
  try {
    console.log(formData);
    const response = await axios.post(`${BackendURL}/auth/login`, formData);
    if (response) {
      toast.success(response.data.message);

      // Store the token in sessionStorage
      sessionStorage.setItem("token", response.data.token);
      navigate("/home");

      return response.data;
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
    throw new Error(
      error.response?.data?.message || "Error in login, please try again"
    );
  }
};

export const logoutUser = async (
  dispatch: Dispatch,
  navigate: NavigateFunction
) => {
  try {
    const response = await axios.post(
      `${BackendURL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    if (response) {
      toast.success(response.data.message);

      // Clear token from sessionStorage
      sessionStorage.removeItem("token");
      dispatch(clearUserDetails());
      navigate("/");

      return response.data;
    }
  } catch (error: any) {
    throw new Error(error || "Error in logout, try again");
  }
};

export const verifyUser = async (
  dispatch: Dispatch,
  navigate: NavigateFunction
) => {
  try {
    const response = await axios.get(`${BackendURL}/auth/user-details`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (response) {
      dispatch(setUserDetails(response.data.userDetails));
    }
  } catch (error: any) {
    navigate("/");

    throw new Error(
      error.response?.data?.message || "Error fetching user details"
    );
  }
};

export const getAllUser = async () => {
  try {
    const response = await axios.get(`${BackendURL}/auth/all-user`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (response) {
      return response.data?.allUsers;
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error fetching users, try again"
    );
  }
};
