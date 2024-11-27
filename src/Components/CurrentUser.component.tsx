import { useContext, useEffect } from "react";
import socket from "../Utils/socket";
import { DispatchContext, StatesContext } from "../Context/contextProvider";
import { useLocalStorage } from "../Utils/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { User } from "../Types/User";

export const CurrentUser = () => {
  const { currentUser } = useContext(StatesContext);
  const dispatch = useContext(DispatchContext);
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("currentUser", "");

  const onDelete = async () => {
    if (currentUser) {
      await socket.emit("deleteUser", currentUser.id);
      setUser("");
      dispatch({ type: "setCurrentUser", payload: null });
      navigate("/");
    }
  };

  useEffect(() => {
    if (user) {
      dispatch({ type: "setCurrentUser", payload: user });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("user", (data: User) => {
      dispatch({ type: "setCurrentUser", payload: data });
      setUser(data);
    });

    return () => {
      socket.off("user");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="level">
      <div className="level-left">
        <div className="level-item">
          <span className="icon is-small">
            <i className="fas fa-user"></i>
          </span>
          <span>{currentUser?.username} </span>
        </div>
      </div>
      <div className="level-right">
        <div className="level-item is-clickable" onClick={onDelete}>
          <span className="icon is-small">
            <i className="fas fa-square-minus"></i>
          </span>
          <span>Remove user</span>
        </div>
      </div>
    </div>
  );
};
