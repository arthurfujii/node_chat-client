import { User } from "./User";

export type Message = {
  text: string;
  user: User;
  time: string;
};
