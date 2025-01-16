import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import FriendsCard from "../cards/FriendsCard";
import { FriendDetailsType } from "../../types/Friends";
import { getAllFriends } from "../../services/friendServices";
import { RootState } from "../../store/Main";
import { useSelector } from "react-redux";

const SideBar: React.FC = () => {
  const [friends, setFriends] = useState<FriendDetailsType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { updateTrigger } = useSelector((state: RootState) => state.user!);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await getAllFriends();
        setFriends(response || []);
      } catch (error) {
        console.log(error);
      }
    };

    getFriends();
  }, [updateTrigger]);

  const filteredFriends = friends.filter((friend) =>
    friend?.friendName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 space-y-8">
      <h2 className="text-2xl font-bold tracking-widest text-[#24AE7C] underline">
        Friends
      </h2>
      <div className="flex items-center gap-2 bg-gray-700 px-3 py-2 mt-1 rounded-md">
        <Search className="text-gray-400" strokeWidth={1} />
        <input
          type="text"
          name="search"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-white w-full border-0 focus:outline-none"
        />
      </div>
      <div>
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => (
            <FriendsCard FriendDetails={friend} key={friend._id} />
          ))
        ) : (
          <p className="text-gray-400">No friends found.</p>
        )}
      </div>
    </div>
  );
};

export default SideBar;
