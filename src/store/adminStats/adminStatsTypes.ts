export interface AdminStats {
  users: number;
  notes: number;
  quizzes: number;
  rooms: number;
}

export interface AdminStatsState {
  stats: AdminStats | null;
  loading: boolean;
  error: string | null;
}
