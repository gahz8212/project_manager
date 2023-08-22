import React, { useState, useEffect } from "react";
import Checkbox from "../../components/common/checkbox/CheckBox";
import { changeField } from "../../modules/item";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
const CheckboxContainer = () => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  // const [isCheckingBox, setIsCheckingBox] = useState(false);
  const [departs, setDeparts] = useState([] as string[]);
  const dispatch = useDispatch();
  const { item } = useSelector((state: RootState) => ({
    item: state.item.item,
  }));
  const changeAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsCheckAll(checked);
    console.log(checked);
  };
  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setDeparts((prev) => [...prev, value]);
    } else {
      setDeparts((prev) => prev.filter((p) => p !== value));
    }
    // console.log(departs.length);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(changeField({ name, value }));
  };
  useEffect(() => {
    dispatch(changeField({ name: "departs", value: departs }));
    setIsCheckAll(departs.length === 4);
  }, [departs, dispatch]);
  return (
    <Checkbox
      isCheckAll={isCheckAll}
      onSelect={onSelect}
      changeAllCheck={changeAllCheck}
      onChange={onChange}
      item={item}
    ></Checkbox>
  );
};

export default CheckboxContainer;
