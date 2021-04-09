import { Dispatch, SetStateAction } from "react";
import { message } from "antd";

export function onLogout(data: PropTypes) {
  //call this when logging out / when token gets expired
  localStorage.removeItem("user");
  const myObj = {
    isLoggedIn: false,
    token: "",
    email: "",
    id: 0,
    name: "",
    phoneNumber: "",
  };
  data.setUser(myObj);
}
export const EventsInCategory = [
  {
    id: 1659,
    name: "Demo heloo 11",
    date: "19 Mar 2021",
    time: "21:00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    coverimg:
      "http://1.bp.blogspot.com/-iiLwOaJYnu4/Uzi1HI83xVI/AAAAAAAADeI/Tr4vcoiGGDU/s1600/low_res_blue_animal-magic_detail_rabbit_large.jpg",
    isregopen: true,
  },
  {
    id: 16592,
    name: "Demo heloo 22",
    date: "19 Mar 2021",
    time: "21:00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    coverimg: "https://cdn.wallpapersafari.com/70/6/D20uZf.jpg",
    isregopen: true,
  },
  {
    id: 16259,
    name: "Demo heloo 33",
    date: "19 Mar 2021",
    time: "21:00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    coverimg:
      "https://wallup.net/wp-content/uploads/2018/10/07/55607-cats-animals-macro-low-resolution-pets-748x468.jpg",
    isregopen: true,
  },
];
export interface PropTypes {
  catLoading: boolean;
  userDetails: {
    id: number;
    email: string;
    name: string;
    phoneNumber: string;
    created_at: string;
    updated_at: string;
    ragamID: string;
    collegeName: string;
    gender: string;
    referralCode: string;
    eventDetails: {
      id: 0;
      event: 0;
      status: "";
      published_at: "";
      created_at: "";
      updated_at: "";
    }[];
  };
  categories: Cats[];
  user: {
    isLoggedIn: boolean;
    token: string;
    email: string;
    id: number;
    name: string;
    phoneNumber: string;
  };
  setUser: Dispatch<
    SetStateAction<{
      isLoggedIn: boolean;
      token: string;
      email: string;
      id: number;
      name: string;
      phoneNumber: string;
    }>
  >;
}
export interface Cats {
  id: number;
  name: string;
  slug: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  bgImage: null | {
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      thumbnail?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path: null;
        url: string;
      };
      medium?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path: null;
        url: string;
      };
      small?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path: null;
        url: string;
      };
      large?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path: null;
        url: string;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null;
    provider: string;
    provider_metadata: null;
    created_at: string;
    updated_at: string;
  };
  events: EventDetailsType[];
}
export interface EventDetailsType {
  id: number;
  name: string;
  submissionEndDate: string;
  submissionStartDate: string;
  description: string;
  maxFileSize: number;
  isTeamEvent: boolean;
  rules: string;
  isRegOpen: boolean;
  category: number;
  result: string;
  regStartDate: string;
  regEndDate: string;
  minTeamSize: number;
  maxTeamSize: number;
  metaTitles: string[];
  slug: string;
  isSubmissionEvent: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  contacts: {
    id: number;
    name: string;
    phoneNumber: string;
  }[];
  coverImage: null | {
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      thumbnail?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path: null;
        url: string;
      };
      medium?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path: null;
        url: string;
      };
      small?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path: null;
        url: string;
      };
      large?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path: null;
        url: string;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null;
    provider: string;
    provider_metadata: null;
    created_at: string;
    updated_at: string;
  };
  posterImage: {
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      thumbnail?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path: null;
        url: string;
      };
      medium?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path: null;
        url: string;
      };
      small?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path: null;
        url: string;
      };
      large?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path: null;
        url: string;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null;
    provider: string;
    provider_metadata: null;
    created_at: string;
    updated_at: string;
  }[];
}
export const backendURI = "https://api.ragam.live/";
export const EventById = {
  id: 1659,
  name: "Demo heloo 33",
  date: "19 Mar 2021",
  time: "21:00",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  coverimg: "image url here",
  isregopen: true,
  isteamevent: true,
  rules: [
    "lasddf adfsl k fasdjsjdn ",
    "kudghfuahef asiduyhywsd bkhsd ",
    "ailfheifh askdhqwid iwjsd qsdf",
  ],
  about:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  contact: [
    {
      contactname: "Name",
      phone: "123456",
    },
    {
      contactname: "Name2",
      phone: "12345456",
    },
  ],
  isavailresult: true,
  result: {},
};
export const EventCategories = [
  {
    id: "123",
    title: "Music",
    bgImg:
      "http://1.bp.blogspot.com/-iiLwOaJYnu4/Uzi1HI83xVI/AAAAAAAADeI/Tr4vcoiGGDU/s1600/low_res_blue_animal-magic_detail_rabbit_large.jpg", //rabbit
  },
  {
    id: "113",
    title: "Dance",
    bgImg: "https://cdn.wallpapersafari.com/70/6/D20uZf.jpg", //koala
  },
  {
    id: "103",
    title: "Miscillaneous",
    bgImg:
      "https://wallup.net/wp-content/uploads/2018/10/07/55607-cats-animals-macro-low-resolution-pets-748x468.jpg", //cat
  },
  {
    id: "133",
    title: "Management",
    bgImg:
      "https://preview.redd.it/qlvn9bckttk61.jpg?width=960&crop=smart&auto=webp&s=6806211c7edf3b8cd250d90270bc95caa249dc08", //bird
  },
];

export const UserProfile = {
  id: 2663,
  name: "egehhrhr ehhehe",
  college: "hrhrhnb hdd",
  phone: "7377383838",
  registeredEvents: [
    {
      id: 1659,
      isteamevent: true,
      status: "withheld",
      team: {
        members: [
          {
            id: "34432",
            name: "ndkjldkc",
          },
        ],
        leader: {
          id: "55465",
          name: "kjeldfkmaw",
        },
      },
    },
  ],
};
export interface RegEventDetail {
  id: number;
  event: number;
  status: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  submissions: SubMissionType[];
  metaValues: string[];
  teamMembers: {
    id: number;
    email?: string;
    name: string | null;
    phoneNumber?: null;
    created_at?: string;
    updated_at?: string;
    ragamID: string;
    collegeName: string | null;
    gender?: null;
  }[];
}
interface SubMissionType {
  id: number;
  name: string;
  alternativeText: null;
  caption: null;
  width: null;
  height: null;
  formats: null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  created_at: string;
  updated_at: string;
  related?: {
    __contentType: string;
    id: number;
    event: number;
    status: string;
    published_at: string;
    created_at: string;
    updated_at: string;
    metaValues: null;
  }[];
}
