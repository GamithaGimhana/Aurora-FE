import { useEffect } from "react";
import Router from "./routes";
import { useAppDispatch } from "./store/hooks";
import { getMeThunk } from "./store/auth/authThunks";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getMeThunk());
    }
  }, [dispatch]);

  return <Router />;
}
