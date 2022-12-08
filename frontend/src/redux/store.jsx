import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import basketReducer from "./basketRedux";

export const store = configureStore({
    reducer: {
      user: userReducer,
      basket: basketReducer,
    },
  })
