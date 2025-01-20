import axios from "axios";
import { toast } from "react-toastify";

const BackendURL = import.meta.env.VITE_BACKEND_BASE_URL;

// Function to get the token from sessionStorage (if stored there)
const getAuthToken = () => {
  return sessionStorage.getItem("token");
};

export const getAllFriends = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${BackendURL}/friend/all-friend`, {
      headers: {
        Authorization: `Bearer ${token}`, // Sending token in Authorization header
      },
    });
    if (response) {
      return response.data.friends;
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error in fetching friends list"
    );
  }
};

export const getActiveRequests = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${BackendURL}/friend/active-request`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response) {
      console.log(response);
      return response.data.acitveRequests;
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error in fetching active requests"
    );
  }
};

export const getSuggestedFriends = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${BackendURL}/friend/suggested-friends`, {
      headers: {
        Authorization: `Bearer ${token}`, // Sending token in Authorization header
      },
    });
    if (response) {
      return response.data?.suggestedFriends;
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message! || "Error in fetching suggested friends"
    );
  }
};

export const sendFriendRequest = async (email: string) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${BackendURL}/friend/send-request`,
      { requestedUserEmail: email },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Sending token in Authorization header
        },
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
    const token = getAuthToken();
    const response = await axios.post(
      `${BackendURL}/friend/accept-request`,
      { requestedUserId: userId },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Sending token in Authorization header
        },
      }
    );
    if (response) {
      toast.success(response.data?.message);
      return;
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message! || "Error in accepting friend request"
    );
  }
};

export const cancelFriendRequest = async (email: string) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${BackendURL}/friend/cancel-request`, {
      data: { requestFriendEmail: email },
      headers: {
        Authorization: `Bearer ${token}`, // Sending token in Authorization header
      },
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
