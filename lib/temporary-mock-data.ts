export const notifications = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/avatars/sarah.jpg",
    message: "liked your post",
  },
  {
    id: 2,
    name: "Michael Lee",
    avatar: "/avatars/michael.jpg",
    message: "commented on your photo",
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "/avatars/emma.jpg",
    message: "started following you",
  },
];

export const chats = [
  {
    id: 1,
    name: "Alex Morgan",
    avatar: "/avatars/alex.jpg",
    message: "Hey, are we still meeting later?",
    unread: true,
  },
  {
    id: 2,
    name: "Jessica Park",
    avatar: "/avatars/jessica.jpg",
    message: "I sent you the design files 👍",
    unread: false,
  },
  {
    id: 3,
    name: "Daniel Kim",
    avatar: "/avatars/daniel.jpg",
    message: "Let me know what you think",
    unread: true,
  },
];

export const user = {
  cover:
    "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1600&auto=format&fit=crop",
  avatar:
    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400&auto=format&fit=crop",
  name: "Alex Johnson",
  username: "alexjohnson",
  email: "alex.johnson@example.com",
};

export const profileAbout = {
  bio: "Frontend developer passionate about building intuitive, accessible user interfaces and modern web experiences.",
  current_city: "Berlin, Germany",
  hometown: "Lisbon, Portugal",
  profession: "Frontend Developer",
  birthday: "2007-09-28T12:00:00Z",
  joined: "2022-01-16T12:00:00Z",
};

export const friends = {
  total: 248,
  friends: [
    {
      id: "1",
      name: "Sarah Johnson",
      username: "sarahj",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    },
    {
      id: "2",
      name: "Michael Lee",
      username: "michaell",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    },
    {
      id: "3",
      name: "Aisha Khan",
      username: "aishak",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
    },
    {
      id: "4",
      name: "Daniel Cruz",
      username: "danielc",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    },
    {
      id: "5",
      name: "Emma Wilson",
      username: "emmaw",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    },
    {
      id: "6",
      name: "Alex Chen",
      username: "alexchen",
      avatar:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop",
    },
  ],
};

export const posts = [
  {
    id: "post_1",
    author: {
      name: "Emma Wilson",
      username: "emmaw",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    },
    content: "Weekend dump 🌊☀️",
    media: [
      {
        id: "m1",
        type: "image",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      },
      {
        id: "m2",
        type: "image",
        url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      },
      {
        id: "m3",
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
    likes: 324,
    comments: 41,
    createdAt: new Date(new Date().getTime() - 3 * 60 * 1000),
  },
  {
    id: "post_2",
    author: {
      name: "Michael Lee",
      username: "michaell",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    },
    content: "Check out this cool view from the hike 🏞️",
    media: [
      {
        id: "m4",
        type: "image",
        url: "https://images.unsplash.com/photo-1519817650390-64a93db511e9?w=800",
      },
      {
        id: "m5",
        type: "image",
        url: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=800",
      },
    ],
    likes: 210,
    comments: 30,
    createdAt: new Date(new Date().getTime() - 4 * 60 * 60 * 1000), // 4 hours ago,
  },
  {
    id: "post_3",
    author: {
      name: "Aisha Khan",
      username: "aishak",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
    },
    content: "Trying out a new recipe 🍲",
    media: [
      {
        id: "m6",
        type: "image",
        url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
      },
      {
        id: "m7",
        type: "video",
        url: "https://www.w3schools.com/html/movie.mp4",
      },
    ],
    likes: 95,
    comments: 12,
    createdAt: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: "post_4",
    author: {
      name: "Daniel Cruz",
      username: "danielc",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    },
    content: "Morning coffee vibes ☕",
    media: [
      {
        id: "m8",
        type: "image",
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
      },
    ],
    likes: 50,
    comments: 5,
    createdAt: new Date(new Date().getTime() - 3 * 7 * 24 * 60 * 60 * 1000), // 3 weeks ago
  },
  {
    id: "post_5",
    author: {
      name: "Emma Wilson",
      username: "emmaw",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    },
    media: [
      {
        id: "m9",
        type: "image",
        url: "https://images.unsplash.com/photo-1499696012240-60e8a3e5d244?w=800",
      },
    ],
    likes: 22,
    comments: 41,
    createdAt: "2022-09-30T12:00:00Z",
    message: "Updated cover photo",
  },
  {
    id: "post_6",
    author: {
      name: "Alex Chen",
      username: "alexchen",
      avatar:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop",
    },
    content: "Sunset time 🌇",
    media: [
      {
        id: "m10",
        type: "image",
        url: "https://images.unsplash.com/photo-1496588152823-e2f05c55b0f8?w=800",
      },
      {
        id: "m11",
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
    likes: 178,
    comments: 23,
    createdAt: "2024-09-29T19:30:00Z",
  },
  {
    id: "post_7",
    author: {
      name: "Sarah Johnson",
      username: "sarahj",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    },
    content: "Just finished a great book! 📚",
    media: [],
    likes: 80,
    comments: 10,
    createdAt: "2024-09-28T15:00:00Z",
  },
  {
    id: "post_8",
    author: {
      name: "Michael Lee",
      username: "michaell",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    },
    content: "Throwback to last summer 🏖️",
    media: [
      {
        id: "m12",
        type: "image",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      },
      {
        id: "m13",
        type: "image",
        url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      },
      {
        id: "m14",
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
    likes: 250,
    comments: 38,
    createdAt: "2024-09-27T11:45:00Z",
  },
];

export const friendRequests = [
  {
    id: "1",
    name: "Sarah Johnson",
    username: "sarahj",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    name: "Michael Lee",
    username: "michaell",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
  },
  {
    id: "3",
    name: "Aisha Khan",
    username: "aishak",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
  },
];

// lib/stories.ts
export const stories = [
  {
    id: "1",
    user: {
      id: "1",
      name: "Tabish",
      avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&q=80",
    },
    media: [
      {
        id: "m1",
        type: "image",
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
        duration: 5000,
      },
      {
        id: "m2",
        type: "image",
        url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
        duration: 5000,
      },
    ],
  },
  {
    id: "2",
    user: {
      id: "2",
      name: "Alex",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    },
    media: [
      {
        id: "m1",
        type: "image",
        url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
        duration: 5000,
      },
    ],
  },
  {
    id: "3",
    user: {
      id: "3",
      name: "Sarah",
      avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=80",
    },
    media: [
      {
        id: "m1",
        type: "image",
        url: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&q=80",
        duration: 5000,
      },
    ],
  },
  
]
