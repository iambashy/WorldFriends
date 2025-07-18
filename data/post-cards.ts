export interface PostData {
  id: string;
  user: {
    id: string;
    name: string;
    profilePicture: string;
  };
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: string;
  isOwner: boolean;
}

export interface CommentData {
  id: string;
  user: {
    id: string;
    name: string;
    profilePicture: string;
  };
  content: string;
  createdAt: string;
  isOwner: boolean;
  reply?: {
    id: string;
    user: {
      id: string;
      name: string;
      profilePicture: string;
    };
    content: string;
    createdAt: string;
    isOwner: boolean;
  };
}

export interface LikeData {
  id: string;
  user: {
    id: string;
    name: string;
    profilePicture: string;
  };
  createdAt: string;
}

export const DUMMY_POSTS: PostData[] = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'Emma Johnson',
      profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    content: 'Just finished my morning workout! Feeling energized and ready to take on the day. There\'s nothing quite like starting your day with some physical activity to get your blood pumping and your mind sharp.',
    images: [
      'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    likes: 24,
    comments: 8,
    isLiked: false,
    isBookmarked: true,
    createdAt: '2024-01-15T08:30:00Z',
    isOwner: false,
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'Alex Chen',
      profilePicture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    content: 'Exploring the beautiful streets of Tokyo today! The culture here is absolutely fascinating.',
    images: [
      'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    likes: 156,
    comments: 23,
    isLiked: true,
    isBookmarked: false,
    createdAt: '2024-01-15T06:15:00Z',
    isOwner: false,
  },
  {
    id: '3',
    user: {
      id: 'user3',
      name: 'Sarah Williams',
      profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    content: 'Learning Spanish has been such an amazing journey! ¡Hola amigos! 🇪🇸',
    likes: 89,
    comments: 12,
    isLiked: false,
    isBookmarked: false,
    createdAt: '2024-01-15T04:45:00Z',
    isOwner: true,
  },
  {
    id: '4',
    user: {
      id: 'user4',
      name: 'Mohammed Hassan',
      profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    content: 'Sunset from my balcony tonight. Sometimes the simple moments are the most beautiful ones.',
    images: [
      'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    likes: 203,
    comments: 31,
    isLiked: true,
    isBookmarked: true,
    createdAt: '2024-01-14T19:20:00Z',
    isOwner: false,
  },
  {
    id: '5',
    user: {
      id: 'user5',
      name: 'Lisa Park',
      profilePicture: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    content: 'Cooking traditional Korean dishes with my grandmother today. Family recipes are the best! 👵🏻🍜',
    images: [
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    likes: 67,
    comments: 15,
    isLiked: false,
    isBookmarked: false,
    createdAt: '2024-01-14T16:30:00Z',
    isOwner: false,
  },
];

export const DUMMY_COMMENTS: CommentData[] = [
  {
    id: 'comment1',
    user: {
      id: 'user6',
      name: 'David Miller',
      profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    content: 'This looks absolutely amazing! I need to try this workout routine.',
    createdAt: '2024-01-15T09:15:00Z',
    isOwner: false,
    reply: {
      id: 'reply1',
      user: {
        id: 'user1',
        name: 'Emma Johnson',
        profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      content: 'Thank you! I can share the routine with you if you\'re interested.',
      createdAt: '2024-01-15T09:30:00Z',
      isOwner: true,
    },
  },
  {
    id: 'comment2',
    user: {
      id: 'user7',
      name: 'Maria Garcia',
      profilePicture: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    content: 'So inspiring! Keep up the great work 💪',
    createdAt: '2024-01-15T09:45:00Z',
    isOwner: false,
  },
];

export const DUMMY_LIKES: LikeData[] = [
  {
    id: 'like1',
    user: {
      id: 'user8',
      name: 'John Smith',
      profilePicture: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    createdAt: '2024-01-15T09:00:00Z',
  },
  {
    id: 'like2',
    user: {
      id: 'user9',
      name: 'Anna Wilson',
      profilePicture: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    createdAt: '2024-01-15T08:45:00Z',
  },
];