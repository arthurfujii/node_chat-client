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
      await socket.emit("user", userRef.current.value.trim());
      navigate("rooms");
    }
  };

  const onDelete = async () => {
    if (currentUser) {
      await socket.emit("deleteUser", currentUser.id);
      setUser("");
      dispatch({ type: "setCurrentUser", payload: null });
      navigate("/")
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {currentUser ? (
        <div className="notification is-success">
          <p>Current user: {currentUser?.username}</p>
          <button className="delete" aria-label="delete" onClick={onDelete} />
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