import React, { useContext, useRef } from "react";
import socket from "../Utils/socket";
import { StatesContext } from "../Context/contextProvider";

export const MessageForm = () => {
  const { currentUser } = useContext(StatesContext);
  const msgRef: React.Ref<HTMLInputElement> = useRef(null);
  const onSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (msgRef.current) {
      const data = {
        text: msgRef.current.value,
        user: currentUser,
      };

      await socket.emit("message", data);
      msgRef.current.value = "";
    }
  };

  return (
    <>
      <form className="field" onSubmit={onSendMessage}>
        <div className="fixed-grid has-8-cols">
          <div className="grid">
            <div className="cell is-col-span-7">
              <div className="control">
                <input
                  type="text"
                  className="input"
                  placeholder="Enter a message"
                  ref={msgRef}
                />
              </div>
            </div>
            <div className="cell is-col-span-1">
              <div className="control">
                <button className="button">Send</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
