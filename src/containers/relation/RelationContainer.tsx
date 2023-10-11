import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../../modules/list";
import { RootState } from "../../modules";
import { relateItem } from "../../modules/item";
import RelationMain from "../../components/relation/RelationMain";
import { RelData } from "../../lib/api/item";
const RelationContainer = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => ({
    list: state.list.list,
  }));
  const [open, setOpen] = useState(false);

  const formOpen = () => {
    setOpen(!open);
  };
const makeRelation=(relItem:RelData)=>{
  dispatch(relateItem.request(relItem))
}
  useEffect(() => {
    dispatch(getList.request());
  }, [dispatch]);

  return (
    <RelationMain list={list} open={open} formOpen={formOpen} makeRelation={makeRelation}></RelationMain>
  );
};

export default RelationContainer;
