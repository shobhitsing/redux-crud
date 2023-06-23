import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./usersSlice";
import fetchReducer from "./fetchSlice";
import updateReducer from "./updateSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    fetchData: fetchReducer,
    updateData: updateReducer,
  },
});
export default store;
