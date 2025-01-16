import { createSlice } from "@reduxjs/toolkit";

type UserType = {
  userName: string;
  email: string;
  id: string;
  profilePic: string;
  updateTrigger: number;
};

const initialState: UserType = {
  userName: "",
  email: "",
  id: "",
  profilePic: "",
  updateTrigger: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { email, userName, id, profilePic } = action.payload;
      state.email = email;
      state.userName = userName;
      state.id = id;
      state.profilePic = profilePic;
    },
    clearUserDetails: (state) => {
      state.email = "";
      state.userName = "";
      state.id = "";
      state.profilePic = "";
      state.updateTrigger = 0;
    },
    triggerUpdate: (state) => {
      state.updateTrigger += 1;
    },
  },
});

export const { setUserDetails, clearUserDetails, triggerUpdate } =
  userSlice.actions;

export default userSlice.reducer;
