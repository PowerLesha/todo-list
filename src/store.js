import { configureStore } from "@reduxjs/toolkit";

import listReducer from "./features/listSlice/listSlice.js";

const store = configureStore({
  reducer: {
    lists: listReducer,
  },
});

export default store;
