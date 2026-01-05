import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import adminUsersReducer from "./adminUsers/adminUsersSlice";
import quizReducer from "./quiz/quizSlice";
import adminStatsReducer from "./adminStats/adminStatsSlice";
import profileReducer from "./profile/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminUsers: adminUsersReducer,
    quiz: quizReducer,
    adminStats: adminStatsReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
