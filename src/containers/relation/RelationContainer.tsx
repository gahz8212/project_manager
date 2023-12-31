import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../../modules/list";
import { RootState } from "../../modules";
import { ListData } from "../../lib/api/list";
import { relateItem, getRelate, initializeForm } from "../../modules/item";
import RelationMain from "../../components/relation/RelationMain";
import { RelData } from "../../lib/api/item";
import Loading from "../../components/common/loading/Loading";
const RelationContainer = () => {
  const dispatch = useDispatch();
  const { list, loading, relate } = useSelector((state: RootState) => ({
    list: state.list.list,
    loading: state.list.loading,
    relate: state.item.relate,
  }));
  const [open, setOpen] = useState(false);
  const [items, setList] = useState(list as ListData);

  const formOpen = () => {
    setOpen(!open);
  };
  const makeRelation = (relItem: RelData) => {
    dispatch(relateItem.request(relItem));
  };

  useEffect(() => {
    dispatch(initializeForm())
    dispatch(getList.request());
    dispatch(getRelate.request());
  }, [dispatch]);

 
  useEffect(() => {
    if (list) {
      setList(list);
    }

  }, [list]);

  return (
    <>
      {loading && <Loading />}
      <RelationMain
        list={items}
        setList={setList}
        open={open}
        formOpen={formOpen}
        makeRelation={makeRelation}
        relate={relate}
      
       
      ></RelationMain>
    </>
  );
};

export default RelationContainer;
