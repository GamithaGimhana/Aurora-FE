import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quiz/quizSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
