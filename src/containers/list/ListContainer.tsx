import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList, searchList } from "../../modules/list";
import ListComponents from "../../components/list/ListComponents";
import { RootState } from "../../modules";
type Props = {
  children: React.ReactNode;
};
const ListContainer: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, list, error } = useSelector((state: RootState) => ({
    loading: state.list.loading,
    list: state.list.list,
    error: state.list.error,
  }));
  useEffect(() => {
    dispatch(getList.request());
  }, [dispatch]);
  return (
    <ListComponents
      loading={loading}
      error={error}
      list={list}
      children={children}
    ></ListComponents>
  );
};

export default ListContainer;
