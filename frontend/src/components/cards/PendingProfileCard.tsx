import { CircleXIcon, UserPlusIcon } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  acceptFriendRequest,
  cancelFriendRequest,
} from "../../services/friendServices";
import { triggerUpdate } from "../../store/Userslice";
import { FriendRequest } from "../../types/Friends";

interface PendingProfileCardProps {
  request: FriendRequest;
}

const PendingProfileCard: React.FC<PendingProfileCardProps> = ({ request }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();

  const handleAccept = async () => {
    setIsProcessing(true);
    try {
      await acceptFriendRequest(request.userId);
      dispatch(triggerUpdate());
    } catch (error) {
      console.error("Error accepting request:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    setIsProcessing(true);
    try {
      await cancelFriendRequest(request.friendEmail);
      dispatch(triggerUpdate());
    } catch (error) {
      console.error("Error rejecting request:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-700 border border-gray-300 rounded-lg p-2 w-full md:w-60">
      <img
        src={request.profilePic}
        alt={request.name}
        className="w-8 h-8 rounded-full"
      />
      <h4 className="text-md font-semibold">{request.name}</h4>
      <div className="flex items-center gap-2">
        <button
          onClick={handleAccept}
          disabled={isProcessing || request.accepted}
          className="text-green-500"
        >
          <UserPlusIcon className="w-5 h-5" />
        </button>
        <button
          onClick={handleReject}
          disabled={isProcessing}
          className="text-red-500"
        >
          <CircleXIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PendingProfileCard;
