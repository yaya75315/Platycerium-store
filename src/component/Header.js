import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import UserProfile from "component/UserProfile";
import Panel from "component/Panel";
import useRWD from "commons/useRWD";

const Header = ({ user, history }) => {
  let device = useRWD();
  const iconName = () => {
    if (device === "mobile") {
      return <p>蕨鹿逢生</p>;
    } else {
      return <p>Home</p>;
    }
  };

  const toProfile = () => {
    Panel.open({
      component: UserProfile,
      props: {
        user: user,
      },
      callback: (data) => {
        console.log(data);
        if (data === "Logout") {
          history.go(0);
        }
      },
    });
  };

  return (
    <div className="header">
      <div className="grid">
        <div className="start">
          <Link to="/">{iconName()}</Link>
        </div>
        <div className="end">
          {user.nickname ? (
            <span className="nickname" onClick={toProfile}>
              <i className="far fa-user"></i>
              {user.nickname}
            </span>
          ) : (
            <React.Fragment>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Header);
