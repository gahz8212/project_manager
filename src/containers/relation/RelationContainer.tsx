import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../../modules/list";
import { RootState } from "../../modules";
import { relateItem ,getRelate} from "../../modules/item";
import RelationMain from "../../components/relation/RelationMain";
import { RelData } from "../../lib/api/item";
import Loading from "../../components/common/loading/Loading";
const RelationContainer = () => {
  const dispatch = useDispatch();
  const { list,loading } = useSelector((state: RootState) => ({
    list: state.list.list,
    loading:state.list.loading
  }));
  const [open, setOpen] = useState(false);

  const formOpen = () => {
    setOpen(!open);
  };
const makeRelation=(relItem:RelData)=>{
  dispatch(relateItem.request(relItem))
}
const getRelation=(id:number)=>{

  dispatch(getRelate.request(id))
}
  useEffect(() => {
    dispatch(getList.request());
  }, [dispatch]);

  return (
    <>
    {loading&&<Loading/>}
    <RelationMain list={list} open={open} formOpen={formOpen} makeRelation={makeRelation} getRelation={getRelation}></RelationMain>
    </>
  );
};

export default RelationContainer;
