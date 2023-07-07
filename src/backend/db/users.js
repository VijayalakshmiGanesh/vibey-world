// import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "56a6ea0e-49ad-4f55-b64b-79abbd82dbb7",
    firstName: "Charles",
    lastName: "Leclerc",
    username: "charles_leclerc",
    password: "charlesleclerc123",
    bio: "Formula 1 driver @scuderiafferrari",
    url: "charles_leclerc@netlify.app",
    imageURL:
      "https://www.thefamouspeople.com/profiles/images/charles-leclerc-4.jpg",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [
      {
        firstName: "Daniel",
        lastName: "Ricciardo",
        username: "danielricciardo",
        _id: "a0176595-ba18-4ee1-8cd9-3a856e021796",
        imageURL: "",
      },
      {
        _id: "47b5c955-18a8-4a4e-b0a2-f3059e15a33e",
        firstName: "Lewis",
        lastName: "Hamilton",
        username: "lewisHamilton",
        imageURL:
          "https://grmdaily.com/wp-content/uploads/2020/11/lewis-hamilton-knighthood.jpg",
      },
    ],
  },
  {
    _id: "a0176595-ba18-4ee1-8cd9-3a856e021796",
    firstName: "Daniel",
    lastName: "Ricciardo",
    username: "danielricciardo",
    password: "daniel123",
    url: "Dhttps://enchante.co/",
    imageURL: "",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [
      {
        firstName: "Charles",
        lastName: "Leclerc",
        username: "charles_leclerc",
        _id: "56a6ea0e-49ad-4f55-b64b-79abbd82dbb7",
        imageURL: "",
      },
    ],
    following: [
      {
        _id: "8fcd2eef-62c1-4fcb-b81f-9b3ce96d41d2",
        firstName: "Lando",
        lastName: "Norris",
        username: "landonorris",
        imageURL:
          "https://s.yimg.com/uu/api/res/1.2/3OoGW325nCOCFlVJt44pxQ--~B/aD0xODcwO3c9MzMyNDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/pa-sport.com/64a39f5241602ae3874fe371cc4f86d3",
      },
    ],
  },
  {
    _id: "8fcd2eef-62c1-4fcb-b81f-9b3ce96d41d2",
    firstName: "Lando",
    lastName: "Norris",
    username: "landonorris",
    password: "Lando123",
    bio: "Formula 1 @McLaren. Esports @Team_Quadrant",
    url: "https://landonorris.store/",
    imageURL:
      "https://s.yimg.com/uu/api/res/1.2/3OoGW325nCOCFlVJt44pxQ--~B/aD0xODcwO3c9MzMyNDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/pa-sport.com/64a39f5241602ae3874fe371cc4f86d3",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [
      {
        _id: "a0176595-ba18-4ee1-8cd9-3a856e021796",
        firstName: "Daniel",
        lastName: "Ricciardo",
        username: "danielricciardo",
        imageURL: "",
      },
      {
        _id: "d3af6e96-5352-4c25-918c-946ca485aa0b",
        firstName: "Sebastian",
        lastName: "Vettel",
        username: "sebastianvettel",
        imageURL:
          "https://d3cm515ijfiu6w.cloudfront.net/wp-content/uploads/2019/12/02125744/SebastianVettelPA2.jpg",
      },
      {
        _id: "47b5c955-18a8-4a4e-b0a2-f3059e15a33e",
        firstName: "Lewis",
        lastName: "Hamilton",
        username: "lewisHamilton",
        imageURL:
          "https://grmdaily.com/wp-content/uploads/2020/11/lewis-hamilton-knighthood.jpg",
      },
    ],
    following: [
      {
        _id: "d3af6e96-5352-4c25-918c-946ca485aa0b",
        firstName: "Sebastian",
        lastName: "Vettel",
        username: "sebastianvettel",
        imageURL:
          "https://d3cm515ijfiu6w.cloudfront.net/wp-content/uploads/2019/12/02125744/SebastianVettelPA2.jpg",
      },
    ],
  },
  {
    _id: "d3af6e96-5352-4c25-918c-946ca485aa0b",
    firstName: "Sebastian",
    lastName: "Vettel",
    username: "sebastianvettel",
    password: "sebastian123",
    bio: "Four time F1 World Champion",
    url: "Sebastian@Sebastian.com",
    imageURL:
      "https://d3cm515ijfiu6w.cloudfront.net/wp-content/uploads/2019/12/02125744/SebastianVettelPA2.jpg",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [
      {
        _id: "8fcd2eef-62c1-4fcb-b81f-9b3ce96d41d2",
        firstName: "Lando",
        lastName: "Norris",
        username: "landonorris",

        imageURL:
          "https://s.yimg.com/uu/api/res/1.2/3OoGW325nCOCFlVJt44pxQ--~B/aD0xODcwO3c9MzMyNDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/pa-sport.com/64a39f5241602ae3874fe371cc4f86d3",
      },
      {
        _id: "47b5c955-18a8-4a4e-b0a2-f3059e15a33e",
        firstName: "Lewis",
        lastName: "Hamilton",
        username: "lewisHamilton",
        imageURL:
          "https://grmdaily.com/wp-content/uploads/2020/11/lewis-hamilton-knighthood.jpg",
      },
    ],
    following: [
      {
        _id: "8fcd2eef-62c1-4fcb-b81f-9b3ce96d41d2",
        firstName: "Lando",
        lastName: "Norris",
        username: "landonorris",
        imageURL:
          "https://s.yimg.com/uu/api/res/1.2/3OoGW325nCOCFlVJt44pxQ--~B/aD0xODcwO3c9MzMyNDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/pa-sport.com/64a39f5241602ae3874fe371cc4f86d3",
      },
    ],
  },
  {
    _id: "47b5c955-18a8-4a4e-b0a2-f3059e15a33e",
    firstName: "Lewis",
    lastName: "Hamilton",
    username: "lewisHamilton",
    password: "lewis123",
    bio: "Man on many missions",
    url: "",
    imageURL:
      "https://grmdaily.com/wp-content/uploads/2020/11/lewis-hamilton-knighthood.jpg",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [
      {
        firstName: "Charles",
        lastName: "Leclerc",
        username: "charles_leclerc",
        _id: "56a6ea0e-49ad-4f55-b64b-79abbd82dbb7",
        imageURL: "",
      },
    ],
    following: [
      {
        _id: "8fcd2eef-62c1-4fcb-b81f-9b3ce96d41d2",
        firstName: "Lando",
        lastName: "Norris",
        username: "landonorris",
        imageURL:
          "https://s.yimg.com/uu/api/res/1.2/3OoGW325nCOCFlVJt44pxQ--~B/aD0xODcwO3c9MzMyNDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/pa-sport.com/64a39f5241602ae3874fe371cc4f86d3",
      },
      {
        _id: "d3af6e96-5352-4c25-918c-946ca485aa0b",
        firstName: "Sebastian",
        lastName: "Vettel",
        username: "sebastianvettel",
        imageURL:
          "https://d3cm515ijfiu6w.cloudfront.net/wp-content/uploads/2019/12/02125744/SebastianVettelPA2.jpg",
      },
    ],
  },
];
