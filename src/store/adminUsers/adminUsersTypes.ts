import type { Role } from "../auth/authTypes";

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: Role[];
  isActive: boolean;
  createdAt: string;
}

export interface AdminUsersState {
  users: AdminUser[];
  loading: boolean;
  error: string | null;
}
