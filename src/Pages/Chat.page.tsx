import { MessageForm } from "../Components/MessageForm.component";
import { MessageList } from "../Components/MessageList.component";
import "../Styles/Chat.style.scss";
export const ChatPage = () => {
  return (
    <>
      <div className="block chat">
        <div className="fixed-grid has-10-cols">
          <div className="grid">
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
