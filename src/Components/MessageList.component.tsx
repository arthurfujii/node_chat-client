import { useContext, useEffect } from "react";
import "../Styles/MessageList.style.scss";
import { DispatchContext, StatesContext } from "../Context/contextProvider";
import socket from "../Utils/socket";
import { Message } from "../Types/Message";
import axios from "axios";
import cn from "classnames";

export const MessageList = () => {
  const { messages, currentUser } = useContext(StatesContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    axios.get("http://localhost:5000/messages").then((response) => {
      dispatch({ type: "setMessages", payload: response.data });
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    socket.on("message", (data: Message) => {
      const newMessages = [...messages, data];
      console.log(messages);
      dispatch({ type: "setMessages", payload: newMessages });
    });
    console.log(messages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="list">
        {messages.map((msg, i) => (
          <div
            className={cn("list-item box", {
              "has-text-right has-background-success-light":
                currentUser?.id === msg.user.id,
            })}
            key={i}
          >
            <div className="list-item-content">
              <div className="list-item-title">{msg.user.username}</div>
              <div className="list-item-description">{msg.text}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
