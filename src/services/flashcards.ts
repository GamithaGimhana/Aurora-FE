import api from "./api";

export const createFlashcard = async (data: {
  front: string;
  back: string;
  topic: string;
}) => {
  // map UI -> backend field names
  const payload = {
    question: data.front,
    answer: data.back,
    topic: data.topic,
  };

  const res = await api.post("/flashcards/create", payload);
  // backend returns { message, data: newFlashcard }
  return res.data; // keep full response so caller can inspect message/data
};

export const getMyFlashcards = async (topic?: string) => {
  const url = topic ? `/flashcards/me?topic=${encodeURIComponent(topic)}` : "/flashcards/me";
  const res = await api.get(url);
  return res.data;
};

export const deleteFlashcard = async (id: string) => {
  const res = await api.delete(`/flashcards/delete/${id}`);
  return res.data;
};
