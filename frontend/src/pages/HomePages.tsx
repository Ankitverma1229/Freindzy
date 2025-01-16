import { useEffect } from "react";
import Dashboard from "../components/home/Dashboard";
import SideBar from "../components/home/SideBar";
import { verifyUser } from "../services/authServices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/Main";
import { useNavigate } from "react-router-dom";

const HomePages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateTrigger } = useSelector((state: RootState) => state.user!);

  const getUserDetails = async () => {
    await verifyUser(dispatch, navigate);
  };

  useEffect(() => {
    getUserDetails();
  }, [updateTrigger]);

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar */}
        <div className="w-full md:w-[35%] h-full overflow-y-auto bg-[#1d2327]">
          <SideBar />
        </div>

        {/* Dashboard */}
        <div className="w-full md:w-[65%] h-full overflow-y-auto bg-[#131619]">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default HomePages;
