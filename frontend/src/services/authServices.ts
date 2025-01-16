import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { clearUserDetails, setUserDetails } from "../store/Userslice";
import { Dispatch } from "@reduxjs/toolkit";
import { UserType } from "../types/Friends";

const BackendURL = import.meta.env.VITE_BACKEND_BASE_URL;

export const sendRegistrationDetails = async (
  formData: UserType,
  navigate: NavigateFunction
) => {
  try {
    const response = await axios.post(`${BackendURL}/auth/register`, formData, {
      withCredentials: true,
    });
    if (response) {
      toast.success(response.data.message);
      navigate("/v1/home");
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
    const response = await axios.post(`${BackendURL}/auth/login`, formData, {
      withCredentials: true,
    });
    if (response) {
      toast.success(response.data.message);
      navigate("/v1/home");

      return response.data;
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
    throw new Error(
      error.response?.data?.message || "Error in registration try again"
    );
  }
};

export const logoutUser = async (
  dispatch: Dispatch,
  navigate: NavigateFunction
) => {
  try {
    const response = await axios.post(`${BackendURL}/auth/logout`, {
      withCredentials: true,
    });
    if (response) {
      toast.success(response.data.message);
      dispatch(clearUserDetails());
      navigate("/v1");

      return response.data;
    }
  } catch (error: any) {
    throw new Error(error || "Error in registration try again");
  }
};

export const verifyUser = async (
  dispatch: Dispatch,
  navigate: NavigateFunction
) => {
  try {
    const response = await axios.get(`${BackendURL}/auth/user-details`, {
      withCredentials: true,
    });
    if (response) {
      dispatch(setUserDetails(response.data.userDetails));
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
    navigate("/v1");

    throw new Error(
      error.response?.data?.message || "Error in registration try again"
    );
  }
};

export const getAllUser = async () => {
  try {
    const response = await axios.get(`${BackendURL}/auth/all-user`, {
      withCredentials: true,
    });
    if (response) {
      return response.data?.allUsers;
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error in registration try again"
    );
  }
};
