import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import HomePages from "../pages/HomePages";
import ErrorPage from "../pages/ErrorPage";

export const FriendZyRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePages />} />
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
