import { AuthProvider } from "./contexts/authContext";
import Router from "./routes";

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
