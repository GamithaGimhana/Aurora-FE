import api from "./api";

export const getAvailableRooms = () => {
  return api.get("/rooms/available");
};

export const startQuiz = (roomId: string) => {
  return api.post(`/rooms/${roomId}/start`);
};
