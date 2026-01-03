import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import type { JSX } from "react";
import type { Role } from "../store/auth/authTypes";

export default function ProtectedRoute({
  children,
  roles,
}: {
  children: JSX.Element;
  roles?: Role[];
}) {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.some((role) => user.role.includes(role))) {
    return <Navigate to="/" replace />;
  }

  return children;
}
