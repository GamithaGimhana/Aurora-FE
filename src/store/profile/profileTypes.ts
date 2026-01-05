import type { Role } from "../auth/authTypes";

export interface ProfileUser {
  name: string;
  email: string;
  role: Role[];

  createdAt: string;
  updatedAt?: string;
}

export interface ProfileState {
  user: ProfileUser | null;
  loading: boolean;
  error: string | null;
}
