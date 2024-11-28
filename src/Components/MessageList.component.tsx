import { useContext, useEffect, useRef, useState } from "react";
import "../Styles/MessageList.style.scss";
import { StatesContext } from "../Context/contextProvider";
import socket from "../Utils/socket";
import { Message } from "../Types/Message";
import axios from "axios";
import cn from "classnames";

export const MessageList = () => {
  const { currentUser } = useContext(StatesContext);
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [msgs]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/messages/${currentUser?.currentRoom?.id}`)
      .then((response) => {
        setMsgs(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("message", (data: Message) => {
      setMsgs((prevMsgs) => [...prevMsgs, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <>
      {error && <div className="notification is-danger">{error}</div>}
      <div className="list vertically-scrollable">
        {msgs.map((msg, i) => (
          <div
            className={cn("list-item box", {
              "has-text-right has-background-success-light":
                currentUser?.id === msg.user.id,
              "has-text-grey-lighter": msg.user.id === "Admin",
            })}
            key={i}
          >
            <div className="list-item-content">
              {msg.user.username !== "Admin" && (
                <div className="list-item-title">{msg.user.username}</div>
              )}
              {currentUser?.id === msg.user.id ? (
                <div className="list-item-description">
                  <span className="is-pulled-right">{msg.text}</span>
                  <span className="is-pulled-left has-text-grey-light is-size-7 ">
                    ({msg.time})
                  </span>
                </div>
              ) : (
                <div className="list-item-description">
                  <span className="is-pulled-left">{msg.text}</span>
                  <span className="is-pulled-right has-text-grey-light is-size-7 ">
                    {msg.time}
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
