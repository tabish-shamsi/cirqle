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
    content: "Weekend memories ✨",
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
        type: "image",
        url: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=800",
      },
      {
        id: "m4",
        type: "image",
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
      },
    ],
    likes: 420,
    comments: 56,
    createdAt: new Date(Date.now() - 10 * 60 * 1000),
  },

  {
    id: "post_2",
    author: {
      name: "Michael Lee",
      username: "michaell",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    },
    content: "Morning hike views 🏞️",
    media: [
      {
        id: "m6",
        type: "image",
        url: "https://images.unsplash.com/photo-1519817650390-64a93db511e9?w=800",
      },
    ],
    likes: 210,
    comments: 30,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },

  {
    id: "post_3",
    author: {
      name: "Aisha Khan",
      username: "aishak",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
    },
    content: "Quick cooking reel 🍲",
    media: [
      {
        id: "v1",
        type: "video",
        url: "https://www.w3schools.com/html/movie.mp4",
      },
    ],
    likes: 134,
    comments: 18,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },

  {
    id: "post_4",
    author: {
      name: "Daniel Cruz",
      username: "danielc",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    },
    content: "Coffee first ☕",
    media: [
      {
        id: "m7",
        type: "image",
        url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800",
      },
    ],
    likes: 78,
    comments: 9,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },

  {
    id: "post_5",
    author: {
      name: "Alex Chen",
      username: "alexchen",
      avatar:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop",
    },
    content: "Sunset timelapse 🌇",
    media: [
      {
        id: "v2",
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
    likes: 190,
    comments: 24,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },

  {
    id: "post_6",
    author: {
      name: "Sarah Johnson",
      username: "sarahj",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    },
    content: "Reading by the window 📖",
    media: [
      {
        id: "m8",
        type: "image",
        url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",
      },
    ],
    likes: 102,
    comments: 14,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },

  {
    id: "post_7",
    author: {
      name: "Liam Brown",
      username: "liamb",
      avatar:
        "https://images.unsplash.com/photo-1502767089025-6572583495b0?w=200&h=200&fit=crop",
    },
    content: "City lights ✨",
    media: [
      {
        id: "m9",
        type: "image",
        url: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=800",
      },
    ],
    likes: 165,
    comments: 21,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },

  {
    id: "post_8",
    author: {
      name: "Nina Patel",
      username: "ninap",
      avatar:
        "https://images.unsplash.com/photo-1544725176-7c40e5a2c9f9?w=200&h=200&fit=crop",
    },
    content: "Studio setup tour 🎥",
    media: [
      {
        id: "v3",
        type: "video",
        url: "https://www.w3schools.com/html/movie.mp4",
      },
    ],
    likes: 220,
    comments: 33,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },

  {
    id: "post_9",
    author: {
      name: "Chris Evans",
      username: "chrise",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop",
    },
    content: "New desk setup 💻",
    media: [
      {
        id: "m10",
        type: "image",
        url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
      },
    ],
    likes: 88,
    comments: 11,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
  },

  {
    id: "post_10",
    author: {
      name: "Olivia Martinez",
      username: "oliviam",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    },
    content: "Beach walk 🌊",
    media: [
      {
        id: "m11",
        type: "image",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      },
    ],
    likes: 143,
    comments: 19,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },

  {
    id: "post_11",
    author: {
      name: "James Park",
      username: "jamesp",
      avatar:
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&h=200&fit=crop",
    },
    content: "Skate clip 🛹",
    media: [
      {
        id: "v4",
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
    likes: 260,
    comments: 40,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
  },

  {
    id: "post_12",
    author: {
      name: "Emily Zhao",
      username: "emilyz",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop",
    },
    content: "Plant corner 🌱",
    media: [
      {
        id: "m12",
        type: "image",
        url: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=800",
      },
    ],
    likes: 97,
    comments: 13,
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
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
      avatar:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&q=80",
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
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
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
      avatar:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=80",
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
];
