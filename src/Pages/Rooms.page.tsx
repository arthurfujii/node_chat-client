import { useContext, useEffect, useRef } from "react";
import axios from "axios";
import socket from "../Utils/socket";
import { DispatchContext, StatesContext } from "../Context/contextProvider";
import { Room } from "../Types/Room";
import { useNavigate } from "react-router-dom";

export const RoomsPage = () => {
  const roomRef: React.Ref<HTMLInputElement> = useRef(null);
  const { rooms, currentUser } = useContext(StatesContext);
  const dispatch = useContext(DispatchContext);
  const navigate = useNavigate();

  const onRoomSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (roomRef.current) {
      socket.emit("room", roomRef.current.value);
      roomRef.current.value = "";
    }
  };

  const onRoomJoin = (room: Room) => {
    const data = {
      room,
      user: currentUser,
    };

    socket.emit("joinRoom", data);
    dispatch({ type: "setCurrentRoom", payload: room });
    navigate(`${room.id}`);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/rooms").then((response) => {
      dispatch({ type: "setRooms", payload: response.data });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("rooms", (data: Room[]) => {
      dispatch({ type: "setRooms", payload: data });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="block">
        <div className="container">
          <form className="field has-addons" onSubmit={onRoomSubmit}>
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Enter a room"
                ref={roomRef}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-comments"></i>
              </span>
            </div>
            <div className="control">
              <button className="button is-warning" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="container">
        <div className="list">
          {rooms.map((room) => {
            return (
              <div key={room.id} className="list-item">
                <div className="list-item-content">
                  <div className="list-item-title">
                    Room:{" "}
                    <span className="is-size-5 has-text-primary">
                      {room.name}
                    </span>
                  </div>
                  <div className="list-item-description">
                    List item description
                  </div>
                </div>

                <div className="list-item-controls">
                  <div className="buttons is-right">
                    <button className="button" onClick={() => onRoomJoin(room)}>
                      <span className="icon is-small">
                        <i className="fas fa-right-to-bracket"></i>
                      </span>
                      <span>Join</span>
                    </button>

                    <button className="delete" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
