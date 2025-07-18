export interface RequestData {
  id: string;
  user: {
    id: string;
    name: string;
    profilePicture: string;
  };
  gender: "male" | "female" | "other";
  age: number;
  countryCode: string;
  message: string;
  sentAt: string;
}

export const DUMMY_REQUESTS: RequestData[] = [
  {
    id: 'request-1',
    user: {
      id: 'req-user1',
      name: 'Marco Rossi',
      profilePicture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'male',
    age: 26,
    countryCode: 'IT',
    message: 'Hi! I saw your profile and would love to be friends. I\'m also learning Spanish and would love to practice together!',
    sentAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'request-2',
    user: {
      id: 'req-user2',
      name: 'Anna Kowalski',
      profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'female',
    age: 24,
    countryCode: 'PL',
    message: 'Hello! I noticed we both love reading and learning new languages. Would you like to be friends and maybe exchange book recommendations?',
    sentAt: '2024-01-15T08:45:00Z',
  },
  {
    id: 'request-3',
    user: {
      id: 'req-user3',
      name: 'Ahmed Al-Rashid',
      profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'male',
    age: 29,
    countryCode: 'AE',
    message: 'Greetings! I\'m interested in learning about different cultures and making international friends. Your profile seems really interesting!',
    sentAt: '2024-01-14T16:20:00Z',
  },
  {
    id: 'request-4',
    user: {
      id: 'req-user4',
      name: 'Priya Sharma',
      profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'female',
    age: 27,
    countryCode: 'IN',
    message: 'Hi there! I love your posts about cooking. I\'m also passionate about food and would love to share recipes and cooking tips!',
    sentAt: '2024-01-14T14:15:00Z',
  },
  {
    id: 'request-5',
    user: {
      id: 'req-user5',
      name: 'Lars Andersen',
      profilePicture: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'male',
    age: 25,
    countryCode: 'DK',
    message: 'Hey! I saw that you\'re learning German. I\'m a native speaker and would be happy to help you practice. Let\'s be friends!',
    sentAt: '2024-01-14T12:30:00Z',
  },
  {
    id: 'request-6',
    user: {
      id: 'req-user6',
      name: 'Elena Popov',
      profilePicture: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'female',
    age: 23,
    countryCode: 'RU',
    message: 'Hello! I\'m new to this app and looking for friends to practice English with. Would you like to be friends?',
    sentAt: '2024-01-13T19:45:00Z',
  },
  {
    id: 'request-7',
    user: {
      id: 'req-user7',
      name: 'Carlos Mendoza',
      profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'male',
    age: 28,
    countryCode: 'MX',
    message: 'Hola! I see you\'re learning Spanish. I\'d love to help you practice and learn about your culture too. Friends?',
    sentAt: '2024-01-13T15:20:00Z',
  },
  {
    id: 'request-8',
    user: {
      id: 'req-user8',
      name: 'Fatima Al-Zahra',
      profilePicture: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'female',
    age: 26,
    countryCode: 'MA',
    message: 'Hi! I love your travel photos. I\'m also passionate about exploring new places and cultures. Let\'s connect!',
    sentAt: '2024-01-13T11:10:00Z',
  },
  {
    id: 'request-9',
    user: {
      id: 'req-user9',
      name: 'Viktor Petrov',
      profilePicture: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'male',
    age: 30,
    countryCode: 'BG',
    message: 'Hello! I noticed we have similar interests in music and art. Would you like to be friends and share our favorite discoveries?',
    sentAt: '2024-01-12T20:35:00Z',
  },
  {
    id: 'request-10',
    user: {
      id: 'req-user10',
      name: 'Mei Chen',
      profilePicture: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    gender: 'female',
    age: 22,
    countryCode: 'CN',
    message: 'Hi! I\'m learning English and would love to practice with native speakers. Your posts are really inspiring!',
    sentAt: '2024-01-12T17:50:00Z',
  },
];
