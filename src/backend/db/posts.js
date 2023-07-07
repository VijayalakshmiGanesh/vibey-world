import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    comments: [],
    content:
      "It feels good to be back in the podium. We'll work flat out to be back on the top step as soon as possible ",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "charles_leclerc",
    createdAt: new Date("2023-06-30T13:05:00+05:30"),
    updatedAt: formatDate(),
    fullName: "Charles Leclerc",
    imgURL: "",
  },
  {
    _id: uuid(),
    comments: [],
    content:
      "4th in yesterday's race. We are going in the right direction and the feeling with the car was better. Next stop is Austria",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "charles_leclerc",
    createdAt: new Date("2023-06-20T13:05:00+05:30"),
    updatedAt: formatDate(),
    fullName: "Charles Leclerc",
    imgURL: "https://pbs.twimg.com/media/FzAeQaMWABMHM3d?format=jpg&name=large",
  },
  {
    _id: uuid(),
    comments: [],
    content:
      "Better this week than next…   Unfortunate to miss the test, but I'm starting to feel better. I'll stay isolated and just focus on next weekend.     Big thanks to Lando & McLaren for the heavy lifting, I owe you some beers (milk for Lando). Appreciate the well wishes from everyone.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "danielricciardo",
    createdAt: new Date("2023-05-23T16:27:37+05:30"),
    updatedAt: formatDate(),
    fullName: "Daniel Ricciardo",
    imgURL: "",
  },
  {
    _id: uuid(),
    comments: [],
    content: `Apart from just getting beat 5-0 by Lando in table tennis, he's taught me so much this year, especially in high speed corners. Impressive.`,
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "danielricciardo",
    createdAt: formatDate(),
    fullName: "Daniel Ricciardo",
    updatedAt: new Date("2023-06-12T14:27:37+05:30"),
    imgURL: "https://pbs.twimg.com/media/E_9tAR1X0AE0mQM?format=jpg&name=large",
  },
  {
    _id: uuid(),
    comments: [],
    content:
      "Couldn't really sleep. Still floating 😌 for the overwhelming number of messages thank you. Did we win Monza @McLarenF1 ????????      ",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "danielricciardo",
    createdAt: new Date("2021-09-13T16:27:37+05:30"),
    fullName: "Daniel Ricciardo",
    updatedAt: new Date("2023-06-12T14:27:37+05:30"),
    imgURL: "https://pbs.twimg.com/media/E-lleWdXsAEmW29?format=jpg&name=large",
  },
  {
    _id: uuid(),
    comments: [],
    content:
      "Don't ever forget your power. Don't ever forget your purpose. Don't ever forget that I'm rooting for you.🌟",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "lewisHamilton",
    createdAt: new Date("2023-06-29T16:27:37+05:30"),
    updatedAt: formatDate(),
    fullName: "Lewis Hamilton",
    imgURL: "https://pbs.twimg.com/media/FfDUbAJXoAAPuJo?format=jpg&name=large",
  },
  {
    _id: uuid(),
    comments: [],
    content: "Roscoe says hi 💞",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "lewisHamilton",
    createdAt: new Date("2023-06-28T14:27:37+05:30"),
    updatedAt: formatDate(),
    fullName: "Lewis Hamilton",
    imgURL: "https://pbs.twimg.com/media/F0Q6rmUWIAIrHM_?format=jpg&name=large",
  },
  {
    _id: uuid(),
    comments: [],
    content:
      "The chequered flag is really just a wooden stick and a piece of fabric. It's a small thing, but it means so much when you cross the line at moments like that. It was unbelievable.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "sebastianvettel",
    createdAt: new Date("2023-06-27T18:30:37+05:30"),
    updatedAt: formatDate(),
    fullName: "Sebastian Vettel",
    imgURL:
      "https://images2.minutemediacdn.com/image/fetch/c_fill,g_auto,f_auto,h_1148,w_1600/https://beyondtheflag.com/wp-content/uploads/getty-images/2016/04/1176352302.jpeg",
  },
  {
    _id: uuid(),
    comments: [],
    content:
      "P5 and Driver of the Day! Thanks to you! 🤍 nice to be racing towards to top again! Next up Silverstone!! ",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "landonorris",
    createdAt: new Date("2023-06-25T01:07:37+05:30"),
    updatedAt: formatDate(),
    fullName: "Lando Norris",
    imgURL: "https://pbs.twimg.com/media/FyrOtcoWYAAMrEz?format=jpg&name=large",
  },
  {
    _id: uuid(),
    comments: [],
    content: "P. 3. BABY. LESSSGOOOOO",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "landonorris",
    createdAt: new Date("2023-05-27T23:15:37+05:30"),
    updatedAt: formatDate(),
    fullName: "Lando Norris",
    imgURL: "https://pbs.twimg.com/media/FxtsPa1WcAE19qS?format=jpg&name=large",
  },
  {
    _id: uuid(),
    comments: [],
    content: "points in the streeeets",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "landonorris",
    createdAt: new Date("2023-06-17T15:39:37+05:30"),
    updatedAt: formatDate(),
    fullName: "Lando Norris",
    imgURL: "https://pbs.twimg.com/media/FxPa2i-XgAAW8_i?format=jpg&name=large",
  },
  {
    _id: uuid(),
    comments: [],
    content: "Nothing better then a day with friends. ",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "landonorris",
    createdAt: new Date("2023-06-28T15:39:37+05:30"),
    updatedAt: formatDate(),
    fullName: "Lando Norris",
    imgURL: "",
  },
];
