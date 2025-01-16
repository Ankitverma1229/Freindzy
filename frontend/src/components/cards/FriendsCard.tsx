import React from "react";
import { FriendDetailsType } from "../../types/Friends";

interface FriendsCardProps {
  FriendDetails: FriendDetailsType;
}

const FriendsCard: React.FC<FriendsCardProps> = ({ FriendDetails }) => {
  return (
    <div>
      <div className="flex gap-5 items-center py-2 w-full">
        <div className="h-10 w-10">
          <img
            src={FriendDetails?.friendId?.profilePic}
            alt={`${FriendDetails?.friendId?.userName}'s Pic`}
            className="w-full h-full object-cover align-middle rounded-full"
          />
        </div>
        <div className="border-t-[0.0001px] border-t-gray-600 py-3 w-[80%]">
          <p className="text-xl text-gray-300">
            {FriendDetails?.friendId?.userName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FriendsCard;
