import api from "./api";

export const createNote = async (data: {
  title: string;
  content: string;
}) => {
  const res = await api.post("/notes/create", data);
  return res.data;
};

export const getMyNotes = async (page = 1, limit = 6) => {
  const res = await api.get(`/notes/me?page=${page}&limit=${limit}`);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await api.delete(`/notes/delete/${id}`);
  return res.data;
};
