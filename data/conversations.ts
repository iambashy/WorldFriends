export interface ConversationData {
  id: string;
  user: {
    id: string;
    name: string;
    profilePicture: string;
  };
  lastMessage: {
    id: string;
    content: string;
    sentAt: string;
    isRead: boolean;
  };
  updatedAt: string;
}

export const DUMMY_CONVERSATIONS: ConversationData[] = [
  {
    id: 'conv-1',
    user: {
      id: 'user1',
      name: 'Emma Johnson',
      profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: {
      id: 'msg-1',
      content: 'Hey! How was your workout this morning? I saw your post and it looked amazing!',
      sentAt: '2024-01-15T10:30:00Z',
      isRead: false,
    },
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'conv-2',
    user: {
      id: 'user2',
      name: 'Alex Chen',
      profilePicture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: {
      id: 'msg-2',
      content: 'Thanks for the travel tips! Tokyo is incredible, you should definitely visit sometime.',
      sentAt: '2024-01-15T09:45:00Z',
      isRead: true,
    },
    updatedAt: '2024-01-15T09:45:00Z',
  },
  {
    id: 'conv-3',
    user: {
      id: 'user3',
      name: 'Sarah Williams',
      profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: {
      id: 'msg-3',
      content: '¡Hola! ¿Cómo estás? I\'m practicing my Spanish, how did I do?',
      sentAt: '2024-01-15T08:20:00Z',
      isRead: false,
    },
    updatedAt: '2024-01-15T08:20:00Z',
  },
  {
    id: 'conv-4',
    user: {
      id: 'user4',
      name: 'Mohammed Hassan',
      profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: {
      id: 'msg-4',
      content: 'The sunset photos turned out great! I\'ll send you the full album later.',
      sentAt: '2024-01-15T07:15:00Z',
      isRead: true,
    },
    updatedAt: '2024-01-15T07:15:00Z',
  },
  {
    id: 'conv-5',
    user: {
      id: 'user5',
      name: 'Lisa Park',
      profilePicture: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: {
      id: 'msg-5',
      content: 'My grandmother loved that you asked about the recipe! She wants to teach you next time.',
      sentAt: '2024-01-14T20:30:00Z',
      isRead: false,
    },
    updatedAt: '2024-01-14T20:30:00Z',
  },
  {
    id: 'conv-6',
    user: {
      id: 'user6',
      name: 'David Miller',
      profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: {
      id: 'msg-6',
      content: 'Perfect! Let\'s meet at the gym tomorrow at 7 AM for that workout session.',
      sentAt: '2024-01-14T18:45:00Z',
      isRead: true,
    },
    updatedAt: '2024-01-14T18:45:00Z',
  },
  {
    id: 'conv-7',
    user: {
      id: 'user7',
      name: 'Maria Garcia',
      profilePicture: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: {
      id: 'msg-7',
      content: 'Your motivation posts always inspire me to keep going! Thank you for sharing.',
      sentAt: '2024-01-14T16:20:00Z',
      isRead: false,
    },
    updatedAt: '2024-01-14T16:20:00Z',
  },
  {
    id: 'conv-8',
    user: {
      id: 'user8',
      name: 'John Smith',
      profilePicture: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: {
      id: 'msg-8',
      content: 'I tried that new restaurant you recommended. The food was absolutely delicious!',
      sentAt: '2024-01-14T14:10:00Z',
      isRead: true,
    },
    updatedAt: '2024-01-14T14:10:00Z',
  },
  {
    id: 'conv-9',
    user: {
      id: 'user9',
      name: 'Anna Wilson',
      profilePicture: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: {
      id: 'msg-9',
      content: 'Can you send me that book recommendation again? I forgot to write it down.',
      sentAt: '2024-01-14T12:30:00Z',
      isRead: false,
    },
    updatedAt: '2024-01-14T12:30:00Z',
  },
  {
    id: 'conv-10',
    user: {
      id: 'user10',
      name: 'Michael Brown',
      profilePicture: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: {
      id: 'msg-10',
      content: 'Great meeting you at the language exchange event! Let\'s practice German together.',
      sentAt: '2024-01-14T10:15:00Z',
      isRead: true,
    },
    updatedAt: '2024-01-14T10:15:00Z',
  },
  {
    id: 'conv-11',
    user: {
      id: 'user11',
      name: 'Sophie Laurent',
      profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: {
      id: 'msg-11',
      content: 'Bonjour! How is your French practice going? I have some great resources to share.',
      sentAt: '2024-01-13T19:45:00Z',
      isRead: false,
    },
    updatedAt: '2024-01-13T19:45:00Z',
  },
  {
    id: 'conv-12',
    user: {
      id: 'user12',
      name: 'Carlos Rodriguez',
      profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: {
      id: 'msg-12',
      content: 'The Spanish conversation group meets every Thursday. You should join us!',
      sentAt: '2024-01-13T17:20:00Z',
      isRead: true,
    },
    updatedAt: '2024-01-13T17:20:00Z',
  },
  {
    id: 'conv-13',
    user: {
      id: 'user13',
      name: 'Yuki Tanaka',
      profilePicture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: {
      id: 'msg-13',
      content: 'こんにちは！Japanese lesson was fun today. Same time next week?',
      sentAt: '2024-01-13T15:30:00Z',
      isRead: false,
    },
    updatedAt: '2024-01-13T15:30:00Z',
  },
  {
    id: 'conv-14',
    user: {
      id: 'user14',
      name: 'Elena Popov',
      profilePicture: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: {
      id: 'msg-14',
      content: 'Thank you for helping me with English pronunciation. You\'re a great teacher!',
      sentAt: '2024-01-13T13:10:00Z',
      isRead: true,
    },
    updatedAt: '2024-01-13T13:10:00Z',
  },
  {
    id: 'conv-15',
    user: {
      id: 'user15',
      name: 'Ahmed Al-Rashid',
      profilePicture: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: {
      id: 'msg-15',
      content: 'The cultural exchange event was amazing! Thanks for organizing it.',
      sentAt: '2024-01-13T11:45:00Z',
      isRead: false,
    },
    updatedAt: '2024-01-13T11:45:00Z',
  },
  {
    id: 'conv-16',
    user: {
      id: 'user16',
      name: 'Isabella Costa',
      profilePicture: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: {
      id: 'msg-16',
      content: 'Oi! Want to practice Portuguese together this weekend? I found a great café.',
      sentAt: '2024-01-12T20:30:00Z',
      isRead: true,
    },
    updatedAt: '2024-01-12T20:30:00Z',
  },
  {
    id: 'conv-17',
    user: {
      id: 'user17',
      name: 'Lars Andersen',
      profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: {
      id: 'msg-17',
      content: 'Your German is improving so fast! Keep up the excellent work.',
      sentAt: '2024-01-12T18:15:00Z',
      isRead: false,
    },
    updatedAt: '2024-01-12T18:15:00Z',
  },
  {
    id: 'conv-18',
    user: {
      id: 'user18',
      name: 'Priya Sharma',
      profilePicture: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: {
      id: 'msg-18',
      content: 'The cooking class was so much fun! Let\'s try making that curry recipe together.',
      sentAt: '2024-01-12T16:45:00Z',
      isRead: true,
    },
    updatedAt: '2024-01-12T16:45:00Z',
  },
  {
    id: 'conv-19',
    user: {
      id: 'user19',
      name: 'Marco Rossi',
      profilePicture: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: {
      id: 'msg-19',
      content: 'Ciao! The Italian conversation practice was great. Grazie mille!',
      sentAt: '2024-01-12T14:20:00Z',
      isRead: false,
    },
    updatedAt: '2024-01-12T14:20:00Z',
  },
  {
    id: 'conv-20',
    user: {
      id: 'user20',
      name: 'Mei Chen',
      profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    lastMessage: {
      id: 'msg-20',
      content: 'Your English is getting so much better! I\'m proud of your progress.',
      sentAt: '2024-01-12T12:30:00Z',
      isRead: true,
    },
    updatedAt: '2024-01-12T12:30:00Z',
  },
];