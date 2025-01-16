// types/Friends.d.ts or define at the top of the file
export interface FriendDetailsType {
  friendId: {
    _id: string;
    userName: string;
    email: string;
    password: string;
    profilePic: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  friendName: string;
  _id: string;
}

// types.ts
export interface FriendRequest {
  userId: string;
  name: string;
  profilePic: string;
  friendEmail: string;
  accepted: boolean;
  _id: string;
}

export interface PendingRequestsResponse {
  success: boolean;
  acitveRequests: FriendRequest[];
}

export interface UserType {
  _id?: string;
  profilePic?: string;
  email: string;
  password: string;
  confirmPassword: string;
  userName: string;
}

export interface SuggestedFriend {
  friendId: string;
  friendName: string;
  friendEmail: string;
  profilePic: string;
  _id: string;
}
