import React from "react";
import "./InputForm.scss";
import Loading from "../common/loading/Loading";
type Props = {
  loading: boolean;
};
const InputForm: React.FC<Props> = ({ loading }) => {
  return <div>{loading && <Loading />}</div>;
};

export default InputForm;
