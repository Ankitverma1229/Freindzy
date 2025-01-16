import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileAvatar from "../../assets/profile-avatar.svg";
import { getAllUser } from "../../services/authServices";
import {
  getActiveRequests,
  getSuggestedFriends,
} from "../../services/friendServices";
import { RootState } from "../../store/Main";
import { FriendRequest, SuggestedFriend, UserType } from "../../types/Friends";
import ProfileCard from "../cards/ProfileCard";
import SuggestedFriends from "../cards/SuggestedFriends";
import Navbar from "./Navabar";
import PendingRequests from "./PendingRequests";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState<UserType[]>([]);
  const [suggestedFriends, setSuggestedFriends] = useState<SuggestedFriend[]>(
    []
  );
  const [searchResults, setSearchResults] = useState<UserType[]>([]);
  const [activeFriendRequests, setActiveFriendRequests] = useState<
    FriendRequest[]
  >([]);

  const { userName, email, updateTrigger } = useSelector(
    (state: RootState) => state.user!
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [suggestedFriendsData, allUsersData] = await Promise.all([
          getSuggestedFriends(),
          getAllUser(),
        ]);

        setSuggestedFriends(suggestedFriendsData);
        setAllUsers(allUsersData);
      } catch (error) {
        console.error("Failed to fetch data", error); // Optional logging
      }
    };

    fetchData();
  }, [updateTrigger]);

  const fetchActiveRequests = async () => {
    const response = await getActiveRequests();
    setActiveFriendRequests(response);
  };

  useEffect(() => {
    fetchActiveRequests();
  }, [updateTrigger]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowerQuery = query.toLowerCase();
    setSearchResults(
      allUsers?.filter((user) =>
        user.userName.toLowerCase().includes(lowerQuery)
      )
    );
  };

  return (
    <div className="bg-gradient-to-b from-[#1d2327] to-[#131619] space-y-5">
      <Navbar />

      <div className="p-5 space-y-8">
        <div className="h-52 flex flex-col md:flex-row gap-5 p-6 bg-[#242b2f]  rounded-lg shadow-lg">
          <ProfileCard
            userName={userName}
            email={email}
            profilePic={ProfileAvatar}
          />
          {activeFriendRequests?.length > 0 && (
            <div className="flex-1 flex flex-col items-center overflow-hidden">
              <h2 className="text-xl font-semibold text-gray-300 sticky top-0 bg-[#242b2f] z-10 p-2 text-center">
                Pending Requests
              </h2>
              <div className="overflow-y-auto max-h-60 w-full mx-auto">
                <PendingRequests pendingRequests={activeFriendRequests} />
              </div>
            </div>
          )}
        </div>

        <div className="w-1/2">
          <input
            type="text"
            placeholder="Search for friends..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full p-3 border border-gray-700 rounded-lg bg-[#131619] text-gray-300 focus:outline-none focus:ring focus:ring-blue-600"
          />
        </div>

        {searchQuery && (
          <div className="bg-[#242b2f] p-4 border border-gray-600 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">
              {searchResults.length > 0
                ? "Search Results"
                : `No results found for "${searchQuery}"`}
            </h2>
            <div className="flex gap-4 overflow-x-auto">
              {searchResults.map((user) => (
                <ProfileCard
                  key={user.email}
                  userName={user.userName}
                  email={user.email}
                  profilePic={user.profilePic!}
                  showAddFriend
                />
              ))}
            </div>
          </div>
        )}

        <div className="bg-[#242b2f] p-4 border border-gray-600 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">
            Suggested Friends
          </h2>
          <SuggestedFriends friends={suggestedFriends} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
