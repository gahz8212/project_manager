import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../../modules/list";
import { RootState } from "../../modules";
import { relateItem ,getRelate,initializeForm} from "../../modules/item";
import RelationMain from "../../components/relation/RelationMain";
import { RelData } from "../../lib/api/item";
import Loading from "../../components/common/loading/Loading";
const RelationContainer = () => {
  const dispatch = useDispatch();
  const { list,loading,relate } = useSelector((state: RootState) => ({
    list: state.list.list,
    loading:state.list.loading,
    relate:state.item.relate
  }));
  const [open, setOpen] = useState(false);
const [Relate,setRelate]=useState({} as {upperId:number,lowerId:number}[]|null)
  const formOpen = () => {
    setOpen(!open);
  };
const makeRelation=(relItem:RelData)=>{
  dispatch(relateItem.request(relItem))
}
const getRelation=()=>{

  dispatch(initializeForm());
  dispatch(getRelate.request())
}
useEffect(() => {
  dispatch(getList.request());
  dispatch(getRelate.request())
  }, [dispatch]);

useEffect(()=>{
if(relate){
  setRelate(relate)
};
},[relate])
  return (
    <>
    {loading&&<Loading/>}
    <RelationMain list={list} open={open} formOpen={formOpen} makeRelation={makeRelation} getRelation={getRelation} relate={Relate}></RelationMain>
    </>
  );
};

export default RelationContainer;
