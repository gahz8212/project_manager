import React, { useEffect } from "react";
import AuthForm from "../../components/auth/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initializeForm, changeField, login } from "../../modules/auth";
import { check, getUsers } from "../../modules/user";
import { RootState } from "../../modules";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, loading, form, user, error, userList } = useSelector(
    (state: RootState) => ({
      auth: state.auth.auth,
      loading: state.auth.loading,
      form: state.auth.login,
      user: state.user.user,
      userList: state.user.userList,
      error: state.auth.error,
    })
  );
  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    dispatch(changeField({ form: "login", key: name, value }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login.request(form));

    setTimeout(() => {
      dispatch(getUsers.request());
    }, 1000);
  };
  useEffect(() => {
    if (auth === "login_ok") {
      dispatch(check.request());
    }
  }, [auth, dispatch]);
  useEffect(() => {
    if (user) {
      navigate("/main");
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        console.error("local storage is not working");
      }
    } else {
      navigate("/");
    }
  }, [dispatch, navigate, user]);
  // useEffect(() => {
  //   if (userList) {
  //     try {
  //       localStorage.setItem("userList", JSON.stringify(userList));
  //     } catch (e) {
  //       console.error("local storage is not working");
  //     }
  //   }
  // }, [userList]);
  useEffect(() => {
    return () => {
      dispatch(initializeForm("login"));
    };
  }, [dispatch]);
  return (
    <AuthForm
      type="login"
      loading={loading}
      form={form}
      error={error}
      onChange={onChange}
      onSubmit={onSubmit}
    ></AuthForm>
  );
};

export default LoginForm;
