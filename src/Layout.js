import React, { useMemo } from "react";
import Header from "component/Header";
import Footer from "component/Footer";

const Layout = (props) => {
  const user = useMemo(() => {
    return global.auth.getUser() || {};
  }, []);
  return (
    <div className="main">
      <Header user={user} />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
