import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../../modules/list";
import { RootState } from "../../modules";

import RelationMain from "../../components/relation/RelationMain";
const RelationContainer = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => ({
    list: state.list.list,
  }));
  const [open, setOpen] = useState(false);

  const formOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    dispatch(getList.request());
  }, [dispatch]);

  return (
    <RelationMain list={list} open={open} formOpen={formOpen}></RelationMain>
  );
};

export default RelationContainer;
