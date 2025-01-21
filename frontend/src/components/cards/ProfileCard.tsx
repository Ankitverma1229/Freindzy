import { useState } from "react";
import { sendFriendRequest } from "../../services/friendServices";
import { triggerUpdate } from "../../store/Userslice";
import { useDispatch } from "react-redux";
import PageLoadingAnimation from "../animation/PageLoadingAnimation";

interface ProfileCardProps {
  userName: string;
  email: string;
  profilePic: string;
  showAddFriend?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  userName,
  email,
  profilePic,
  showAddFriend,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const sendRequest = async (email: string) => {
    try {
      setLoading(true);
      await sendFriendRequest(email);
      dispatch(triggerUpdate());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center w-full sm:w-56 p-3 border border-gray-700 rounded-md shadow-md bg-[#131619]">
      <div className="w-20 h-20 border-2 border-gray-600 rounded-full overflow-hidden mb-3">
        <img src={profilePic!} alt={userName} className="h-full w-full" />
      </div>

      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-300">{userName!}</h3>
        <p className="text-xs text-gray-500">{email!}</p>
      </div>

      {showAddFriend! && (
        <button
          className="mt-3 h-8 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => sendRequest(email)}
        >
          {loading ? <PageLoadingAnimation /> : "Add Friend"}
        </button>
      )}
    </div>
  );
};

export default ProfileCard;
