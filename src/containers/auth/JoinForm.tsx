import React, { useEffect } from "react";
import AuthForm from "../../components/auth/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initializeForm, changeField, join } from "../../modules/auth";
import { RootState } from "../../modules";
const JoinForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, loading, form, error } = useSelector((state: RootState) => ({
    auth: state.auth.auth,
    loading: state.auth.loading,
    form: state.auth.join,
    error: state.auth.error,
  }));
  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    dispatch(changeField({ form: "join", key: name, value }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(form);
    dispatch(join.request(form));
  };
  useEffect(() => {
    if (auth === "join_ok") {
      navigate("/");
    }
  });
  useEffect(() => {
    return () => {
      dispatch(initializeForm("join"));
    };
  }, [dispatch]);
  return (
    <AuthForm
      type="join"
      loading={loading}
      form={form}
      error={error}
      onChange={onChange}
      onSubmit={onSubmit}
    ></AuthForm>
  );
};

export default JoinForm;
