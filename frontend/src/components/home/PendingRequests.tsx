import React from "react";
import { FriendRequest } from "../../types/Friends";
import PendingProfileCard from "../cards/PendingProfileCard";

interface PendingRequestsProps {
  pendingRequests: FriendRequest[];
}

const PendingRequests: React.FC<PendingRequestsProps> = ({
  pendingRequests,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 items-center w-full mx-auto">
      {pendingRequests?.map((request) => (
        <PendingProfileCard key={request._id} request={request} />
      ))}
    </div>
  );
};

export default PendingRequests;
