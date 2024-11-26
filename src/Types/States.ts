import { Message } from "./Message";
import { Room } from "./Room";
import { User } from "./User";

export type States = {
  messages: Message[];
  users: User[];
  rooms: Room[];
  currentUser: User | null;
  currentRoom: Room | null;
}
