import { createSlice } from "@reduxjs/toolkit";
import { AllUSers, LogineUser } from "./API";

const initialState = {
  emial: null,
  password: null,

  err: null,
};

export const loginSlice = createSlice({
  name: "logine",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(LogineUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(LogineUser.fulfilled, (state, action) => {
        state.loading = false;

        console.log(action.payload);
      })

      .addCase(LogineUser.rejected, (state) => {
        state.loading = false;
      });
  },
  reducers: {
    addUser: (state, action) => {
      AllUSers(action.payload);
    },
  },
});

export default loginSlice.reducer;
export const { addUser } = loginSlice.actions;
