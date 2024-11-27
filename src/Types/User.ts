import { Room } from "./Room";

export type User = {
  id: string;
  username: string;
  currentRoom: Room;
};
