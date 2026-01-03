import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import type { JSX } from "react";

export default function ProtectedRoute({
  children,
  roles,
}: {
  children: JSX.Element;
  roles?: string[];
}) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.some((r) => user.role.includes(r))) {
    return <Navigate to="/" replace />;
  }

  return children;
}
