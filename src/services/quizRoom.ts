import api from "./api";

export const getAvailableRooms = () => {
  return api.get("/rooms/available");
};

export const joinRoom = (payload: { roomCode: string }) => {
  return api.post("/rooms/join", payload);
};

export const startQuiz = (roomId: string) => {
  return api.post(`/rooms/${roomId}/start`);
};

export const getRoomById = (roomId: string) => {
  return api.get(`/rooms/${roomId}`);
}