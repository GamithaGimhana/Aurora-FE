import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Header />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
