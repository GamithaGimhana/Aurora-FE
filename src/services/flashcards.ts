import api from "./api";

export const createFlashcard = async (data: {
  front: string;
  back: string;
  topic: string;
}) => {
  const payload = {
    question: data.front,
    answer: data.back,
    topic: data.topic,
  };

  const res = await api.post("/flashcards/create", payload);
  return res.data;
};

export const getMyFlashcards = async (params?: {
  page?: number;
  limit?: number;
  topic?: string;
}) => {
  const query = new URLSearchParams();

  if (params?.page) query.append("page", String(params.page));
  if (params?.limit) query.append("limit", String(params.limit));
  if (params?.topic) query.append("topic", params.topic);

  const res = await api.get(`/flashcards/me?${query.toString()}`);
  return res.data;
};

export const deleteFlashcard = async (id: string) => {
  const res = await api.delete(`/flashcards/delete/${id}`);
  return res.data;
};
