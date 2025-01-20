import { Route, Routes } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import ErrorPage from "../pages/ErrorPage";
import HomePages from "../pages/HomePages";

export const FriendZyRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePages />} />
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
