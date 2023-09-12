import React from "react";
import "./AuthTemplate.scss";
type Props = {
  children: React.ReactNode;
};
const AuthTemplate: React.FC<Props> = ({ children }) => {
  return (
    <div className="authTemplateWrap">
      <div className="white-box">
        <div className="logo-area">
          <img src="/symbol.png" alt="" />
          <p>EUNKI</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthTemplate;
