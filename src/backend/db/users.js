import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    bio: "Helloooo World",
    url: "adarshbalika@netlify.app",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Viji",
    lastName: "Ganesh",
    username: "vijiganesh1",
    password: "viji123",
    bio: "Welcome to my World",
    url: "vijiprojects@netlify.app",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
