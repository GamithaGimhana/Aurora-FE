import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import adminUsersReducer from "./adminUsers/adminUsersSlice";
import quizReducer from "./quiz/quizSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminUsers: adminUsersReducer,
    quiz: quizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
