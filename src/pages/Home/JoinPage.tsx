import React from "react";
import JoinForm from "../../containers/auth/JoinForm";
import AuthTemplate from "../../components/auth/AuthTemplate";
const JoinPage = () => {
  return (
    <AuthTemplate>
      <JoinForm />
    </AuthTemplate>
  );
};

export default JoinPage;
