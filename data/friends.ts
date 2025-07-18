export interface FriendData {
  id: string;
  user: {
    id: string;
    name: string;
    profilePicture: string;
  };
  gender: "male" | "female" | "other";
  age: number;
  countryCode: string;
  friendsSince: string;
}

export const DUMMY_FRIENDS: FriendData[] = [
  {
    id: 'friend-1',
    user: {
      id: 'user1',
      name: 'Emma Johnson',
      profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'female',
    age: 22,
    countryCode: 'CA',
    friendsSince: '2024-01-10T08:30:00Z',
  },
  {
    id: 'friend-2',
    user: {
      id: 'user2',
      name: 'Ahmed Hassan',
      profilePicture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'male',
    age: 25,
    countryCode: 'EG',
    friendsSince: '2024-01-08T14:20:00Z',
  },
  {
    id: 'friend-3',
    user: {
      id: 'user3',
      name: 'Sofia Martinez',
      profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'female',
    age: 24,
    countryCode: 'ES',
    friendsSince: '2024-01-05T16:45:00Z',
  },
  {
    id: 'friend-4',
    user: {
      id: 'user4',
      name: 'Kenji Tanaka',
      profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'male',
    age: 28,
    countryCode: 'JP',
    friendsSince: '2024-01-03T10:15:00Z',
  },
  {
    id: 'friend-5',
    user: {
      id: 'user5',
      name: 'Isabella Costa',
      profilePicture: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'female',
    age: 23,
    countryCode: 'BR',
    friendsSince: '2024-01-01T12:30:00Z',
  },
  {
    id: 'friend-6',
    user: {
      id: 'user6',
      name: 'Liam Smith',
      profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'male',
    age: 27,
    countryCode: 'GB',
    friendsSince: '2023-12-28T09:45:00Z',
  },
  {
    id: 'friend-7',
    user: {
      id: 'user7',
      name: 'Chloe Brown',
      profilePicture: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'female',
    age: 26,
    countryCode: 'US',
    friendsSince: '2023-12-25T18:20:00Z',
  },
  {
    id: 'friend-8',
    user: {
      id: 'user8',
      name: 'Arjun Singh',
      profilePicture: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'male',
    age: 29,
    countryCode: 'IN',
    friendsSince: '2023-12-22T11:10:00Z',
  },
  {
    id: 'friend-9',
    user: {
      id: 'user9',
      name: 'Olivia White',
      profilePicture: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'female',
    age: 25,
    countryCode: 'AU',
    friendsSince: '2023-12-20T15:30:00Z',
  },
  {
    id: 'friend-10',
    user: {
      id: 'user10',
      name: 'Noah Taylor',
      profilePicture: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'male',
    age: 31,
    countryCode: 'CA',
    friendsSince: '2023-12-18T13:45:00Z',
  },
  {
    id: 'friend-11',
    user: {
      id: 'user11',
      name: 'Yuki Sato',
      profilePicture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'female',
    age: 24,
    countryCode: 'JP',
    friendsSince: '2023-12-15T08:20:00Z',
  },
  {
    id: 'friend-12',
    user: {
      id: 'user12',
      name: 'Carlos Rodriguez',
      profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'male',
    age: 30,
    countryCode: 'ES',
    friendsSince: '2023-12-12T16:55:00Z',
  },
  {
    id: 'friend-13',
    user: {
      id: 'user13',
      name: 'Lena Schmidt',
      profilePicture: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'female',
    age: 26,
    countryCode: 'DE',
    friendsSince: '2023-12-10T14:25:00Z',
  },
  {
    id: 'friend-14',
    user: {
      id: 'user14',
      name: 'Min-jun Kim',
      profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'male',
    age: 33,
    countryCode: 'KR',
    friendsSince: '2023-12-08T10:40:00Z',
  },
  {
    id: 'friend-15',
    user: {
      id: 'user15',
      name: 'Camila Silva',
      profilePicture: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'female',
    age: 21,
    countryCode: 'BR',
    friendsSince: '2023-12-05T17:15:00Z',
  },
];
