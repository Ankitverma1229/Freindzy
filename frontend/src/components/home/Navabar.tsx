import { Bell, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "../../services/authServices";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    toast.dismiss();
    logoutUser(dispatch, navigate);
  };

  const handleLogoutOption = () => {
    toast(
      <div className="flex flex-col items-center text-center sm:items-start sm:text-left space-y-4 w-full">
        <p className="text-sm sm:text-base">Are you sure you want to logout?</p>
        <div className="flex gap-2 justify-center sm:justify-start w-full">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm sm:text-base w-24 sm:w-auto"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm sm:text-base w-24 sm:w-auto"
          >
            No
          </button>
        </div>
      </div>,
      {
        closeOnClick: false,
        closeButton: false,
        autoClose: false,
      }
    );
  };

  return (
    <div className="flex items-center justify-between p-4 bg-[#242b2f] border-b border-gray-700 shadow-md">
      <div className="text-2xl font-bold text-gray-300">Dashboard</div>

      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-full bg-[#1d2327] hover:bg-[#131619] text-gray-300 focus:outline-none focus:ring focus:ring-blue-600"
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6" />
        </button>

        <button
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-400"
          aria-label="Logout"
          onClick={handleLogoutOption}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
