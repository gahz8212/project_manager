import React, { useEffect, useState, useRef } from "react";
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
  const [items, setItems] = useState(list as {}[]);
  const mounted = useRef(true);
  useEffect(() => {
    if (mounted.current) {
      dispatch(getList.request());
      mounted.current = false;
    }
  }, [dispatch]);

  useEffect(() => {
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, ...{ column: "HEADER" } }))
    );
  }, [list]);

  return <RelationMain list={items} setItems={setItems}></RelationMain>;
};

export default RelationContainer;
