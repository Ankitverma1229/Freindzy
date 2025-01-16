import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import HomePages from "../pages/HomePages";
import ErrorPage from "../pages/ErrorPage";

export const FriendZyRoutes = () => {
  return (
    <Routes>
      <Route path="/v1/home" element={<HomePages />} />
      <Route path="/v1" element={<AuthPage />} />
      <Route path="/" element={<Navigate to="/v1" replace />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
