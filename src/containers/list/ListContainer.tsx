import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getList,
  removeItem,
  readItem,
  initializeForm,
} from "../../modules/list";
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
  const [show, setShow] = useState(false);
  const [itemID, setItemId] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  const formOpen = () => {
    setOpen(!open);
  };

  const toggleModal = () => {
    setVisibleModal(!visibleModal);
  };
  const onRead = (id: number) => {
    if (!show) {
      setItemId(id);
      dispatch(readItem.request(id));
    }
    setShow(!show);
  };
  const onUpdate = (id: number) => {};
  const onRemove = () => {
    console.log("toggleModal 어딨어");
    toggleModal();
  };
  const onRemoveClick = (id: number) => {
    setShow(false);
    toggleModal();
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
      show={show}
      itemId={itemID}
      onRead={onRead}
      onUpdate={onUpdate}
      onRemove={onRemove}
      onRemoveClick={onRemoveClick}
      visibleModal={visibleModal}
      toggleModal={toggleModal}
    ></ListComponents>
  );
};

export default ListContainer;
