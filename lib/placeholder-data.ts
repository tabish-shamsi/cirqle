import {
  Home,
  BookOpen,
  Video,
  User,
  Store,
  HelpCircle,
  PieChart,
  MessagesSquare,
  Settings,
  Mail,
  Hotel,
  LocateIcon,
  VideoIcon,
  Users,
  Activity,
} from "lucide-react";

export const NAV_LINKS = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Friends",
    path: "/friends",
    icon: Users,
  },
  {
    name: "Videos",
    path: "/videos",
    icon: Video,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    name: "Stories",
    path: "/stories",
    icon: Activity,
  },
];

export const ACCOUNT_PAGES = [
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    name: "Help",
    path: "#",
    icon: HelpCircle,
  },
  {
    name: "Analytics",
    path: "#",
    icon: PieChart,
  },
  {
    name: "Chat",
    path: "#",
    icon: MessagesSquare,
  },
];

export const MORE_PAGES = [
  {
    name: "Email Box",
    path: "#",
    icon: Mail,
  },
  {
    name: "Near Hotel",
    path: "#",
    icon: Hotel,
  },
  {
    name: "Latest Events",
    path: "#",
    icon: LocateIcon,
  },
  {
    name: "Live Stream",
    path: "#",
    icon: VideoIcon,
  },
];

export const PROFILE_NAV = [
  "About",
  "Membership",
  "Discussion",
  "Video",
  "Group",
  "Events",
  "Media",
];

export const FRIEND_TABS = [
  {
    label: "All Friends",
    href: "/friends",
  },
  {
    label: "Friend Requests",
    href: "/friends/requests",
  },
  {
    label: "Suggestions",
    href: "/friends/suggestions",
  },
];
