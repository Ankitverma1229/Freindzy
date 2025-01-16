import axios from "axios";
import { toast } from "react-toastify";
// import { NavigateFunction } from "react-router-dom";

const BackendURL = import.meta.env.VITE_BACKEND_BASE_URL;

export const getAllFriends = async () => {
  try {
    const response = await axios.get(`${BackendURL}/friend/all-friend`, {
      withCredentials: true,
    });
    if (response) {
      return response.data.friends;
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error in registration try again"
    );
  }
};

export const getActiveRequests = async () => {
  try {
    const response = await axios.get(`${BackendURL}/friend/active-request`, {
      withCredentials: true,
    });
    if (response) {
      return response.data.acitveRequests;
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error in registration try again"
    );
  }
};

export const getSuggestedFriends = async () => {
  try {
    const response = await axios.get(`${BackendURL}/friend/suggested-friends`, {
      withCredentials: true,
    });
    if (response) {
      return response.data?.suggestedFriends;
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message! || "Error in registration try again"
    );
  }
};

export const sendFriendRequest = async (email: string) => {
  try {
    const response = await axios.post(
      `${BackendURL}/friend/send-request`,
      { requestedUserEmail: email },
      {
        withCredentials: true,
      }
    );
    if (response) {
      toast.success(response.data?.message);
      return;
    }
  } catch (error: any) {
    toast.warning(error.response?.data?.message);
    return;
  }
};

export const acceptFriendRequest = async (userId: string) => {
  try {
    const response = await axios.post(
      `${BackendURL}/friend/accept-request`,
      { requestedUserId: userId },
      {
        withCredentials: true,
      }
    );
    if (response) {
      toast.success(response.data?.message);
      return;
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message! || "Error in registration try again"
    );
  }
};

export const cancelFriendRequest = async (email: string) => {
  try {
    const response = await axios.delete(`${BackendURL}/friend/cancel-request`, {
      data: { requestFriendEmail: email },
      withCredentials: true,
    });
    if (response) {
      toast.success(response.data?.message);
      return;
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Error in canceling the friend request, try again."
    );
  }
};
