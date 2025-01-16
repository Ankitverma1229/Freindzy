import ProfileCard from "../cards/ProfileCard";

interface SuggestedFriendsProps {
  friends: {
    friendId: string;
    friendName: string;
    friendEmail: string;
    profilePic: string;
    _id: string;
  }[];
}

const SuggestedFriends: React.FC<SuggestedFriendsProps> = ({ friends }) => {
  return (
    <div>
      <div className="flex gap-4 overflow-x-auto">
        {friends.map((friend) => (
          <ProfileCard
            key={friend._id}
            userName={friend.friendName}
            email={friend.friendEmail}
            profilePic={friend.profilePic}
            showAddFriend
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedFriends;
