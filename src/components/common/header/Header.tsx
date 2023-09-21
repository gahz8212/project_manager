import React from "react";
import { Link } from "react-router-dom";

import "./header.scss";
type Props = {
  user: { id: number; name: string; rank: string } | null;
  onClick: (e: any) => void;
  userNames: { name: string; rank: string }[];
};
const Header: React.FC<Props> = ({ user, onClick, userNames }) => {
  return (
    <div className="headerWraper">
      <section>
        <article className="logo">
          <div>
            <img src="/logo.png" alt="logo" width="90%" />
          </div>
          {userNames && (
            <div className="connected-users">
              {userNames.map((username) => (
                <li key={username.name}>
                  {username.name} / {username.rank}
                </li>
              ))}
            </div>
          )}
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
