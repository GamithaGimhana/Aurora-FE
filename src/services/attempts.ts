// fe/services/attempts.ts
import api from "./api";

export const startRoomAttempt = async (roomId: string) => {
  const res = await api.post(`/rooms/${roomId}/start`);
  return res.data; // { attempt, quiz, endsAt }
};

export const submitAttempt = async (attemptId: string, answers: { questionId: string; selected: string }[]) => {
  const res = await api.post(`/attempts/${attemptId}/submit`, { answers });
  return res.data;
};
