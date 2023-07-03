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
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    likes: {
      likeCount: 1,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: new Date("2023-06-30T13:05:00+05:30"),
    updatedAt: formatDate(),
    fullName: "Adarsh Balika",
    imgURL: "",
  },
  {
    _id: uuid(),
    comments: [],
    content: "How to make the worls a better place??????? ",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "vijiganesh1",
    createdAt: new Date("2023-05-23T16:27:37+05:30"),
    updatedAt: formatDate(),
    fullName: "Viji ganesh",
    imgURL: "",
  },
  {
    _id: uuid(),
    comments: [],
    content: `Go for a 15 minute walk every morning.

      No fancy morning routine—just go for a walk.
      
      The sunlight and movement, have a positive impact on your mood, circadian rhythm, metabolism, and digestion.
      `,
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "vijiganesh1",
    createdAt: formatDate(),
    fullName: "Viji ganesh",
    updatedAt: new Date("2023-06-12T14:27:37+05:30"),
    imgURL: "",
  },
  {
    _id: uuid(),
    comments: [],
    content:
      "2 week At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "vijiganesh1",
    createdAt: new Date("2023-06-13T16:27:37+05:30"),
    fullName: "Viji ganesh",
    updatedAt: new Date("2023-06-12T14:27:37+05:30"),
    imgURL: "",
  },
  {
    _id: uuid(),
    comments: [],
    content: "Feelin a lil luminous off late👑🌟",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "trishh",
    createdAt: new Date("2023-06-29T16:27:37+05:30"),
    updatedAt: formatDate(),
    fullName: "Trisha Krishnan",
    imgURL:
      "https://resize.indiatvnews.com/en/resize/newbucket/715_-/2019/05/54429359-807317259637211-9118395587161982653-n-1556953211.jpg",
  },
  {
    _id: uuid(),
    comments: [],
    content: "PS team💞🧿",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "trishh",
    createdAt: new Date("2023-06-28T14:27:37+05:30"),
    updatedAt: formatDate(),
    fullName: "Trisha Krishnan",
    imgURL:
      "https://st1.bollywoodlife.com/wp-content/uploads/2022/11/MicrosoftTeams-image-5066.jpg?impolicy=Medium_Widthonly&w=800",
  },
  {
    _id: uuid(),
    comments: [],
    content: "PS team💞🧿",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "karthiSiva",
    createdAt: new Date("2023-06-27T18:30:37+05:30"),
    updatedAt: formatDate(),
    fullName: "Karthi Sivakumar",
    imgURL:
      "https://st1.bollywoodlife.com/wp-content/uploads/2022/11/MicrosoftTeams-image-5066.jpg?impolicy=Medium_Widthonly&w=800",
  },
  {
    _id: uuid(),
    comments: [],
    content: "Bakthi mode ON",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "suryasiva",
    createdAt: new Date("2023-06-25T01:07:37+05:30"),
    updatedAt: formatDate(),
    fullName: "Surya Sivakumar",
    imgURL:
      "http://www.filmibeat.com/img/popcorn/fan_images/1121_20090724_14535300_Surya.jpg",
  },
  {
    _id: uuid(),
    comments: [],
    content: "Not a Play Boy",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "suryasiva",
    createdAt: new Date("2023-05-27T23:15:37+05:30"),
    updatedAt: formatDate(),
    fullName: "Surya Sivakumar",
    imgURL:
      "https://moviegalleri.net/wp-content/gallery/handsome-surya-at-duplicate-press-meet/surya_handsome_latest_photos_pictures_images_9065.jpg",
  },
  {
    _id: uuid(),
    comments: [],
    content: "TB - In the sets of Ayan",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "suryasiva",
    createdAt: new Date("2023-06-17T15:39:37+05:30"),
    updatedAt: formatDate(),
    fullName: "Surya Sivakumar",
    imgURL:
      "https://1.bp.blogspot.com/-JYHImc06rk4/T__X1W5KjGI/AAAAAAAAFXw/9dcEvCH4SDY/s1600/15.jpg",
  },
  {
    _id: uuid(),
    comments: [],
    content:
      "Keezhadi Museum is stunning! Its a must visit Centre to understand our Tamil legacy that spans 2600 years. Our history & its continuation is unique & it was a momentous visit for us to learn how our Tamilians had lived. Its a lesson for our future. Thanks to our Tamilnadu Government for setting up this Museum.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "suryasiva",
    createdAt: new Date("2023-06-28T15:39:37+05:30"),
    updatedAt: formatDate(),
    fullName: "Surya Sivakumar",
    imgURL: "",
  },
];
