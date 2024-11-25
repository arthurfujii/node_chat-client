export const UsersPage = () => {
  return (
    <>
      <div className="container">
        <div className="box">
          <form className="field">
            <div className="control has-icons-left">
              <input
                type="text"
                className="input"
                placeholder="Enter a username"
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>
            </div>
            <button className="button" type="submit">
              Ok
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
