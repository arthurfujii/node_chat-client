import { useContext } from "react";
import socket from "../Utils/socket";
import { MessageForm } from "../Components/MessageForm.component";
import { MessageList } from "../Components/MessageList.component";
import "../Styles/Chat.style.scss";
import { StatesContext } from "../Context/contextProvider";
import { useNavigate } from "react-router-dom";
export const ChatPage = () => {
  const { currentRoom, currentUser } = useContext(StatesContext);
  const navigate = useNavigate();

  const onLeave = () => {
    socket.emit("leaveRoom", currentUser);
    navigate("/rooms", { replace: true });
  };

  return (
    <>
      <div className="block chat">
        <div className="fixed-grid has-10-cols">
          <div className="grid">
            <div className="cell is-col-span-10">
              {currentRoom && (
                <>
                  {" "}
                  <div className="level">
                    <div className="level-left">
                      <div className="level-item is-clickable">
                        <span className="icon is-small">
                          <i className="fas fa-comment" aria-hidden="true"></i>
                        </span>
                        <span>{currentRoom.name}</span>
                      </div>
                    </div>
                    <div className="level-right">
                      <div
                        className="level-item is-clickable"
                        onClick={onLeave}
                      >
                        <span className="icon is-small">
                          <i
                            className="fas fa-right-from-bracket"
                            aria-hidden="true"
                          ></i>
                        </span>
                        <span>Leave room</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="cell is-col-span-10 is-row-span-10">
              <div className="box msg-list">
                <MessageList />
              </div>
            </div>

            <div className="cell is-col-span-10 is-row-span-1">
              <div className="box msg-form">
                <MessageForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
