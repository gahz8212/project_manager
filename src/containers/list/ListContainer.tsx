import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getList,
  removeItem,
  readItem,
  originFieldClean,
  updateItem,
} from "../../modules/list";
import ListComponents from "../../components/list/ListComponents";
import { ItemData_list } from "../../lib/api/list";
import { RootState } from "../../modules";
import { initializeForm } from "../../modules/item";
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
  const [item, setItem] = useState({} as ItemData_list);
  const [visibleModal, setVisibleModal] = useState(false);
  const mounted = useRef(true);

  const formOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (open) {
      if (mounted.current) {
        dispatch(initializeForm());
        mounted.current = false;
      }
    } else {
      mounted.current = true;
    }
  }, [open, dispatch]);
  const toggleModal = () => {
    setVisibleModal(!visibleModal);
  };
  const onRead = (id: number) => {
    setShow(!show);
    if (!show) {
      setItemId(id);
      dispatch(originFieldClean());
      dispatch(readItem.request(id));
    } else {
      // dispatch(originFieldClean());
      // setTimeout(() => {
      // }, 1000);
    }
  };

  const onUpdate = (item: ItemData_list) => {
    setItem(item);
    toggleModal();
  };
  const onUpdateClick = (item: ItemData_list) => {
    dispatch(updateItem.request(item));
  };

  const onRemove = () => {
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
      item={item}
      onRead={onRead}
      onUpdate={onUpdate}
      onUpdateClick={onUpdateClick}
      onRemove={onRemove}
      onRemoveClick={onRemoveClick}
      visibleModal={visibleModal}
      toggleModal={toggleModal}
    ></ListComponents>
  );
};

export default ListContainer;
