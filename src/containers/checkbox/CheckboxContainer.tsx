import React, { useState, useEffect } from "react";
import Checkbox from "../../components/common/checkbox/CheckBox";
import { changeField } from "../../modules/item";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
const CheckboxContainer = () => {
  const [departs, setDeparts] = useState(["Off"] as string[]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const dispatch = useDispatch();
  const { item } = useSelector((state: RootState) => ({
    item: state.item.item,
  }));
  const changeAllCheck = (checked: boolean) => {
    setDeparts([]);
    if (checked) {
      setDeparts((prev) => [...prev, ...["Off", "Dev", "Man", "Pac"]]);
      setIsCheckAll(true);
    } else {
      setIsCheckAll(false);
    }
  };
  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setDeparts((prev) => [...prev, value]);
    } else {
      setDeparts((prev) => prev.filter((p) => p !== value));
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log(value);
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
