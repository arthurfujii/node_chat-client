import { Room } from "../Types/Room";

type Props = {
  onSubmitEditing: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: (roomId: number) => void;
  editRoomRef: React.Ref<HTMLInputElement>;
  room: Room;
};

export const RoomEditForm: React.FC<Props> = ({
  room,
  onSubmitEditing,
  onCancel,
  editRoomRef,
}) => {
  return (
    <div className="container">
      <form
        className="field has-addons"
        onSubmit={onSubmitEditing}
        onReset={() => onCancel(room.id)}
      >
        <div className="control has-icons-left">
          <input
            type="text"
            className="input"
            placeholder={`New name for: ${room.name}`}
            required
            ref={editRoomRef}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-pen-to-square" />
          </span>
        </div>
        <div className="control">
          <button className="button is-info">Ok</button>
        </div>
        <div className="control">
          <button className="button is-danger" type="reset">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
