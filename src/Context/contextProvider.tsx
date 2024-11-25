/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer } from "react";
import { Message } from "../Types/Message";
import { Room } from "../Types/Room";
import { States } from "../Types/States";
import { User } from "../Types/User";

const initialStates = {
  messages: [],
  users: [],
  rooms: [],
  currentUser: {
    id: "",
    name: "",
    rommId: 0,
  },
  currentRoom: {
    id: 0,
    name: "",
  },
};

type Action =
  | { type: "setMessages"; payload: Message[] }
  | { type: "setUsers"; payload: User[] }
  | { type: "setRooms"; payload: Room[] }
  | { type: "setCurrentUser"; payload: User }
  | { type: "setCurrentRoom"; payload: Room };

type DispatchContextType = {
  (action: Action): void;
};

function reducer(states: States, action: Action) {
  switch (action.type) {
    case "setMessages":
      return { ...states, messages: action.payload };
    case "setUsers":
      return { ...states, users: action.payload };
    case "setRooms":
      return { ...states, rooms: action.payload };
    case "setCurrentUser":
      return { ...states, currentUser: action.payload };
    case "setCurrentRoom":
      return { ...states, currentRoom: action.payload };
    default:
      return states;
  }
}

export const StatesContext = createContext<States>(initialStates);
export const DispatchContext = createContext<DispatchContextType>(() => {});

type Props = {
  children: React.ReactNode;
};

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [states, dispatch] = useReducer(reducer, initialStates);

  return (
    <StatesContext.Provider value={states}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StatesContext.Provider>
  );
};
