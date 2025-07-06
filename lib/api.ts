import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3000/api";

const nextServer = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export type NoteType = {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};

export type NoteListType = {
  notes: NoteType[];
  total: number;
};

export type CategoryType = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type NewNoteData = {
  title: string;
  content: string;
  categoryId: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export type User = {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LoginRequest = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

export const getNotes = async (categoryId?: string, title?: string) => {
  const { data } = await nextServer.get<NoteListType>("/notes", {
    params: { categoryId, title },
  });
  return data;
};

export const getSingleNote = async (id: string) => {
  const { data } = await nextServer.get<NoteType>(`/notes/${id}`);
  return data;
};

export const getCategories = async () => {
  const { data } = await nextServer.get<CategoryType[]>(`/categories`);
  return data;
};

export const createNote = async (data: NewNoteData) => {
  try {
    const res = await nextServer.post<NoteType>("/notes", data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/auth/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};
