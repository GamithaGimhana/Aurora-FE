import api from "./api";
export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface NotesResponse {
  data: Note[];
  totalPages: number;
  totalCount: number;
  page: number;
}

export const getMyNotes = async (page: number = 1, limit: number = 6): Promise<NotesResponse> => {
  const res = await api.get(`/notes/me?page=${page}&limit=${limit}`);
  return res.data;
};

export const createNote = async (data: {
  title: string;
  content: string;
}) => {
  const res = await api.post("/notes/create", data);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await api.delete(`/notes/delete/${id}`);
  return res.data;
};

export const getNoteById = async (id: string): Promise<Note> => {
  const res = await api.get(`/notes/${id}`);
  return res.data.data;
};