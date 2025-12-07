import api from "./api";

export const createNote = async (data: { title: string; content: string }) => {
  const res = await api.post("/notes/create", data);
  return res.data;
};

export const getMyNotes = async () => {
  const res = await api.get("/notes/me");
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};
