import { Fragment, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import socket from "../Utils/socket";
import { DispatchContext, StatesContext } from "../Context/contextProvider";
import { Room } from "../Types/Room";
import { useNavigate } from "react-router-dom";
import { User } from "../Types/User";
import { RoomComponent } from "../Components/Room.component";
import { RoomEditForm } from "../Components/RoomEditForm.component";

type editState = {
  roomId: null | number;
  status: boolean;
};
export const RoomsPage = () => {
  const roomRef: React.Ref<HTMLInputElement> = useRef(null);
  const editRoomRef: React.Ref<HTMLInputElement> = useRef(null);
  const { rooms, users, currentUser } = useContext(StatesContext);
  const dispatch = useContext(DispatchContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<editState>({
    roomId: null,
    status: false,
  });
  const [error, setError] = useState<string>("");

  const onRoomSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (roomRef.current) {
      socket.emit("createRoom", roomRef.current.value);
      roomRef.current.value = "";
    }
  };

  const onRoomJoin = (roomId: number) => {
    socket.emit("joinRoom", currentUser?.id, roomId);

    navigate(`${roomId}`);
  };

  const onToggleEdit = (roomId: number) => {
    setIsEditing({ roomId, status: true });
  };

  const onDelete = (roomId: number) => {
    socket.emit("deleteRoom", roomId);
    setIsEditing({ roomId, status: false });
  };

  const onSubmitEditing = (
    e: React.FormEvent<HTMLFormElement>,
    roomId: number,
  ) => {
    e.preventDefault();

    if (editRoomRef.current) {
      const data = {
        id: roomId,
        name: editRoomRef.current.value,
      };
      socket.emit("editRoom", data);
      setIsEditing({ roomId, status: false });
    }
  };

  const onCancel = (roomId: number) => {
    setIsEditing({ roomId, status: false });
  };

  useEffect(() => {
    axios.get("http://localhost:5000/rooms").then((response) => {
      dispatch({ type: "setRooms", payload: response.data });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("currentRoom", (data: Room) => {
      dispatch({ type: "setCurrentRoom", payload: data });
    });

    return () => {
      socket.off("currentRoom");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("rooms", (data: Room[]) => {
      console.log(data);
      dispatch({ type: "setRooms", payload: data });
    });

    return () => {
      socket.off("rooms");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("users", (data: User[]) => {
      dispatch({ type: "setUsers", payload: data });
    });

    return () => {
      socket.off("users");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("error", (data: string) => {
      setError(data);
      setTimeout(() => setError(""), 3000);
    });

    return () => {
      socket.off("error");
    };
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
        {error && <div className="notification is-danger">{error}</div>}
        <div className="list">
          {rooms.map((room) => {
            const usersList = users
              .filter((usr) => usr.currentRoomId === room.id)
              .map((item) => item.username);

            return (
              <Fragment key={room.id}>
                {isEditing.roomId === room.id && isEditing.status === true ? (
                  <RoomEditForm
                    onSubmitEditing={(e) => onSubmitEditing(e, room.id)}
                    editRoomRef={editRoomRef}
                    onCancel={() => onCancel(room.id)}
                    room={room}
                  />
                ) : (
                  <RoomComponent
                    usersList={usersList}
                    room={room}
                    onRoomJoin={onRoomJoin}
                    onToggleEdit={onToggleEdit}
                    onDelete={onDelete}
                  />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};
