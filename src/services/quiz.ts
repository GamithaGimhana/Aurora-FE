import api from "./api";

export const createQuiz = async (data: any) => {
  const res = await api.post("/quizzes/create", data);
  return res.data;
};

export const getMyQuizzes = async () => {
  const res = await api.get("/quizzes/me");
  return res.data;
};

export const deleteQuiz = async (id: string) => {
  const res = await api.delete(`/quizzes/delete/${id}`);
  return res.data;
};
