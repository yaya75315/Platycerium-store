import React from "react";

const UserProfile = (props) => {
  const logout = () => {
    global.auth.logout();
    props.close("Logout");
  };

  return (
    <div className="user-profile">
      <p className="title has-text-centered">個人資料</p>
      <fieldset disabled>
        <div className="field">
          <div className="control">
            <label className="label">暱稱</label>
            <input
              type="text"
              className="input"
              defaultValue={props.user.nickname}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">電子信箱</label>
            <input
              type="text"
              className="input"
              defaultValue={props.user.email}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">帳戶類別</label>
            <input
              type="text"
              className="input"
              defaultValue={props.user.type === 1 ? "管理者" : "一般用戶"}
            />
          </div>
        </div>
      </fieldset>
      <br />
      <br />
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <button className="button is-danger" type="button" onClick={logout}>
            登出
          </button>
        </div>
        <button className="button" type="button" onClick={() => props.close()}>
          取消
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
