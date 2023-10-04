import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../../modules/list";
import { RootState } from "../../modules";
import { ListData } from "../../lib/api/list";
import RelationMain from "../../components/relation/RelationMain";
const RelationContainer = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => ({
    list: state.list.list,
  }));

  const mounted = useRef(true);
  useEffect(() => {
    if (mounted.current) {
      dispatch(getList.request());
      mounted.current = false;
    }
  }, [dispatch]);

  const newItems = list.map((item) => ({ ...item, ...{ column: "HEADER" } }));

  return <RelationMain list={newItems}></RelationMain>;
};

export default RelationContainer;
