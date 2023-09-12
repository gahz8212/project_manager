import React from "react";
import { Link } from "react-router-dom";
import { authData } from "../../lib/api/auth";
import Loading from "../common/loading/Loading";
type Props = {
  type: string;
  loading: boolean;
  form: authData;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
};
const AuthForm: React.FC<Props> = ({
  type,
  loading,
  onChange,
  onSubmit,
  error,
}) => {
  const textMap: { [key: string]: string } = {
    login: "로그인",
    join: "회원가입",
  };
  const text = textMap[type];
  return (
    <form className="authFormWrap" onSubmit={onSubmit}>
      {/* <h4>{text}</h4> */}
      <input
        type="text"
        name="email"
        placeholder="Input email"
        autoComplete="off"
        onChange={onChange}
      />
      {text === "회원가입" && (
        <div className="join-only">
          <input
            type="text"
            name="name"
            placeholder="Input name"
            autoComplete="off"
            onChange={onChange}
          />
          <select
            className="level"
            name="rank"
            onChange={onChange}
            // id="title"
            // onChange={onChange}
            // value={form.title}
            required
          >
            <option value="">Rank</option>
            <option value="대표">대표</option>
            <option value="부장">부장</option>
            <option value="차장">차장</option>
            <option value="과장">과장</option>
            <option value="대리">대리</option>
            <option value="사원">사원</option>
          </select>
        </div>
      )}
      <input
        type="password"
        name="password"
        placeholder="Input password"
        autoComplete="off"
        onChange={onChange}
      />
      {error && <div>{error}</div>}
      <button type="submit">{text}</button>
      <footer>
        {text === "로그인" ? (
          <Link to="/join">회원가입</Link>
        ) : (
          <Link to="/">로그인</Link>
        )}
      </footer>
      {loading && <Loading />}
    </form>
  );
};

export default AuthForm;
