import axios from "axios";

import type { User } from "../types/user";

const API_URL = "https://randomuser.me/api";

export const fetchRandomUser = async (): Promise<User> => {
  const response = await axios.get(API_URL);

  // Destructure only required keys
  const {
    name: { first, last },
    email,
  } = response.data.results[0];

  const user: User = {
    fullName: `${first} ${last}`,
    email,
  };

  // Save to localStorage
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};
