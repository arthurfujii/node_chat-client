import { Room } from "../Types/Room";

type Props = {
  usersList: string[];
  room: Room;
  onRoomJoin: (roomId: number) => void;
  onToggleEdit: (roomId: number) => void;
  onDelete: (roomId: number) => void;
};

export const RoomComponent: React.FC<Props> = ({
  usersList,
  room,
  onRoomJoin,
  onToggleEdit,
  onDelete
}) => {
  return (
    <div className="list-item">
      <div className="list-item-content">
        <div className="list-item-title">
          Room: <span className="is-size-5 has-text-primary">{room.name}</span>
        </div>
        <div className="list-item-description">
          {usersList.length > 0
            ? `Users in room: ${usersList.join(", ")}`
            : "Empty room"}
        </div>
      </div>

      <div className="list-item-controls">
        <div className="buttons is-right">
          <button className="button" onClick={() => onRoomJoin(room.id)}>
            <span className="icon is-small">
              <i className="fas fa-right-to-bracket"></i>
            </span>
            <span>Join</span>
          </button>

          <button className="button" onClick={() => onToggleEdit(room.id)}>
            <span className="icon is-small">
              <i className="fas fa-pen-to-square"></i>
            </span>
            <span>Edit</span>
          </button>

          <button className="delete" onClick={() => onDelete(room.id)} />
        </div>
      </div>
    </div>
  );
};
