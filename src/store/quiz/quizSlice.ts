import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { QuizState, Question } from "./quizTypes";

export const submitQuizAsync = createAsyncThunk(
  "quiz/submit",
  async (
    payload: {
      quizRoomId: string;
      answers: { questionId: string; selected: string }[];
    }
  ) => {
    const res = await api.post("/attempts/create", payload);
    return res.data;
  }
);

const initialState: QuizState = {
  roomId: null,
  quizTitle: "",
  questions: [],
  answers: {},
  endsAt: null,
  started: false,
  submitted: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    startQuiz: (
      state,
      action: PayloadAction<{
        roomId: string;
        quizTitle: string;
        questions: Question[];
        endsAt: string;
      }>
    ) => {
      state.roomId = action.payload.roomId;
      state.quizTitle = action.payload.quizTitle;
      state.questions = action.payload.questions;
      state.endsAt = action.payload.endsAt;
      state.started = true;
      state.submitted = false;
      state.answers = {};
    },

    setAnswer: (
      state,
      action: PayloadAction<{ questionId: string; selected: string }>
    ) => {
      state.answers[action.payload.questionId] = action.payload.selected;
    },

    resetQuiz: () => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(submitQuizAsync.fulfilled, (state) => {
      state.submitted = true;
    });
  },
});

export const { startQuiz, setAnswer, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
