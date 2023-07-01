// import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "56a6ea0e-49ad-4f55-b64b-79abbd82dbb7",
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    bio: "Helloooo World",
    url: "adarshbalika@netlify.app",
    imageURL: "",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [
      {
        firstName: "Viji",
        lastName: "Ganesh",
        username: "vijiganesh1",
        _id: "a0176595-ba18-4ee1-8cd9-3a856e021796",
        imageURL: "",
      },
      {
        _id: "47b5c955-18a8-4a4e-b0a2-f3059e15a33e",
        firstName: "Trisha",
        lastName: "Krishnan",
        username: "trishh",
        imageURL:
          "http://1.bp.blogspot.com/_TyeoQB3iQc0/TJZUfS9P5jI/AAAAAAAAAMg/FQ2iej-Chbc/s1600/trisha_463.jpg",
      },
    ],
  },
  {
    _id: "a0176595-ba18-4ee1-8cd9-3a856e021796",
    firstName: "Viji",
    lastName: "Ganesh",
    username: "vijiganesh1",
    password: "viji123",
    bio: "Welcome to my World",
    url: "vijiprojects@netlify.app",
    imageURL: "",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [
      {
        firstName: "Adarsh",
        lastName: "Balika",
        username: "adarshbalika",
        _id: "56a6ea0e-49ad-4f55-b64b-79abbd82dbb7",
        imageURL: "",
      },
    ],
    following: [
      {
        _id: "8fcd2eef-62c1-4fcb-b81f-9b3ce96d41d2",
        firstName: "Surya",
        lastName: "Sivakumar",
        username: "suryasiva",
        imageURL: "https://wallpapercave.com/wp/wp5387292.jpg",
      },
    ],
  },
  {
    _id: "8fcd2eef-62c1-4fcb-b81f-9b3ce96d41d2",
    firstName: "Surya",
    lastName: "Sivakumar",
    username: "suryasiva",
    password: "surya123",
    bio: "Actor/director",
    url: "surya@surya.com",
    imageURL: "https://wallpapercave.com/wp/wp5387292.jpg",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [
      {
        _id: "a0176595-ba18-4ee1-8cd9-3a856e021796",
        firstName: "Viji",
        lastName: "Ganesh",
        username: "vijiganesh1",
        imageURL: "",
      },
      {
        _id: "d3af6e96-5352-4c25-918c-946ca485aa0b",
        firstName: "Karthi",
        lastName: "Sivakumar",
        username: "karthiSiva",
        imageURL:
          "https://www.cinejolly.com/wp-content/uploads/2017/03/Tamil-Hero-Karthi-Hot-And-Stylish-Photo-Shoot-Images-Gallery-18.jpg",
      },
      {
        _id: "47b5c955-18a8-4a4e-b0a2-f3059e15a33e",
        firstName: "Trisha",
        lastName: "Krishnan",
        username: "trishh",
        imageURL:
          "http://1.bp.blogspot.com/_TyeoQB3iQc0/TJZUfS9P5jI/AAAAAAAAAMg/FQ2iej-Chbc/s1600/trisha_463.jpg",
      },
    ],
    following: [
      {
        _id: "d3af6e96-5352-4c25-918c-946ca485aa0b",
        firstName: "Karthi",
        lastName: "Sivakumar",
        username: "karthiSiva",
        imageURL:
          "https://www.cinejolly.com/wp-content/uploads/2017/03/Tamil-Hero-Karthi-Hot-And-Stylish-Photo-Shoot-Images-Gallery-18.jpg",
      },
    ],
  },
  {
    _id: "d3af6e96-5352-4c25-918c-946ca485aa0b",
    firstName: "Karthi",
    lastName: "Sivakumar",
    username: "karthiSiva",
    password: "karthi123",
    bio: "Artist / Actor",
    url: "karthi@karthi.com",
    imageURL:
      "https://www.cinejolly.com/wp-content/uploads/2017/03/Tamil-Hero-Karthi-Hot-And-Stylish-Photo-Shoot-Images-Gallery-18.jpg",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [
      {
        _id: "8fcd2eef-62c1-4fcb-b81f-9b3ce96d41d2",
        firstName: "Surya",
        lastName: "Sivakumar",
        username: "suryasiva",

        imageURL: "https://wallpapercave.com/wp/wp5387292.jpg",
      },
      {
        _id: "47b5c955-18a8-4a4e-b0a2-f3059e15a33e",
        firstName: "Trisha",
        lastName: "Krishnan",
        username: "trishh",
        imageURL:
          "http://1.bp.blogspot.com/_TyeoQB3iQc0/TJZUfS9P5jI/AAAAAAAAAMg/FQ2iej-Chbc/s1600/trisha_463.jpg",
      },
    ],
    following: [
      {
        _id: "8fcd2eef-62c1-4fcb-b81f-9b3ce96d41d2",
        firstName: "Surya",
        lastName: "Sivakumar",
        username: "suryasiva",
        imageURL: "https://wallpapercave.com/wp/wp5387292.jpg",
      },
    ],
  },
  {
    _id: "47b5c955-18a8-4a4e-b0a2-f3059e15a33e",
    firstName: "Trisha",
    lastName: "Krishnan",
    username: "trishh",
    password: "trish123",
    bio: "The universe works fast when I am having fun",
    url: "https://twitter.com/trishtrashers",
    imageURL:
      "http://1.bp.blogspot.com/_TyeoQB3iQc0/TJZUfS9P5jI/AAAAAAAAAMg/FQ2iej-Chbc/s1600/trisha_463.jpg",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    followers: [
      {
        firstName: "Adarsh",
        lastName: "Balika",
        username: "adarshbalika",
        _id: "56a6ea0e-49ad-4f55-b64b-79abbd82dbb7",
        imageURL: "",
      },
    ],
    following: [
      {
        _id: "8fcd2eef-62c1-4fcb-b81f-9b3ce96d41d2",
        firstName: "Surya",
        lastName: "Sivakumar",
        username: "suryasiva",
        imageURL: "https://wallpapercave.com/wp/wp5387292.jpg",
      },
      {
        _id: "d3af6e96-5352-4c25-918c-946ca485aa0b",
        firstName: "Karthi",
        lastName: "Sivakumar",
        username: "karthiSiva",
        imageURL:
          "https://www.cinejolly.com/wp-content/uploads/2017/03/Tamil-Hero-Karthi-Hot-And-Stylish-Photo-Shoot-Images-Gallery-18.jpg",
      },
    ],
  },
];
