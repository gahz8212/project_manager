import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList, removeItem } from "../../modules/list";
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
  const [open, setOpen] = useState(false);
  const formOpen = () => {
    setOpen(!open);
    console.log("open", open);
  };
  const onRead = (id: number) => {
    console.log(id);
  };
  const onUpdate = (id: number) => {
    console.log(id);
  };
  const onRemove = (id: number) => {
    console.log(id);
    dispatch(removeItem.request(id));
  };
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  useEffect(() => {
    dispatch(getList.request());
  }, [dispatch]);
  return (
    <ListComponents
      loading={loading}
      error={error}
      list={list}
      children={children}
      formOpen={formOpen}
      open={open}
      onRead={onRead}
      onUpdate={onUpdate}
      onRemove={onRemove}
    ></ListComponents>
  );
};

export default ListContainer;
