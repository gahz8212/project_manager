import React from "react";
import { Link } from "react-router-dom";

import "./header.scss";
type Props = {
  user: { id: number; name: string; rank: string } | null;
  onClick: (e: any) => void;
};
const Header: React.FC<Props> = ({ user, onClick }) => {
  return (
    <div className="headerWraper">
      <section>
        <article className="logo">
          <div>REACT</div>
        </article>
        <article className="auth">
          {user ? (
            <button className="btn" onClick={onClick}>
              LOGOUT
            </button>
          ) : (
            <Link to="/" className="btn login">
              LOGIN
            </Link>
          )}
        </article>
      </section>
    </div>
  );
};

export default Header;
