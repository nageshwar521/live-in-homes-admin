import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: true
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    toggleSidebar: (state, { payload }: PayloadAction<any>) => {
      state.isSidebarOpen = payload;
    },
  },
});

export const {
  toggleSidebar
} = commonSlice.actions;
