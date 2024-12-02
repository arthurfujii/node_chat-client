import { useEffect, useRef } from "react";
import socket from "../Utils/socket";
import { useContext } from "react";
import { DispatchContext, StatesContext } from "../Context/contextProvider";
import { User } from "../Types/User";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../Utils/useLocalStorage";
export const UserComponent = () => {
  const userRef: React.Ref<HTMLInputElement> = useRef(null);
  const dispatch = useContext(DispatchContext);
  const { currentUser } = useContext(StatesContext);
  const [user, setUser] = useLocalStorage("currentUser", "");
  const navigate = useNavigate();

  const onSubmitUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userRef.current) {
      await socket.emit("createUser", userRef.current.value.trim());
      navigate("rooms");
    }
  };

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
    <>
      {currentUser ? (
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
      ) : (
        <div className="container">
          <form className="field has-addons" onSubmit={onSubmitUser}>
            <div className="control has-icons-left">
              <input
                type="text"
                className="input"
                placeholder="Enter a username"
                required
                ref={userRef}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>
            </div>
            <div className="control">
              <button className="button is-info">Ok</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
