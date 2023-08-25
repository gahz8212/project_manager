import React, { useState, useEffect } from "react";
import Checkbox from "../../components/common/checkbox/CheckBox";
import { changeField } from "../../modules/item";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { initializeForm } from "../../modules/item";

const CheckboxContainer = () => {
  const [departs, setDeparts] = useState([
    { depart: "Off", count: 1 },
    { depart: "Dev", count: 0 },
    { depart: "Fac", count: 0 },
    { depart: "Pac", count: 0 },
  ] as {
    depart: string;
    count: number;
  }[]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const dispatch = useDispatch();
  const { item } = useSelector((state: RootState) => ({
    item: state.item.item,
  }));
  const changeAllCheck = (checked: boolean) => {
    setDeparts([]);
    if (checked) {
      setDeparts((prev) => [
        ...prev,
        ...[
          { depart: "Off", count: 1 },
          { depart: "Dev", count: 1 },
          { depart: "Fac", count: 1 },
          { depart: "Pac", count: 1 },
        ],
      ]);
      setIsCheckAll(true);
    } else {
      setDeparts([
        { depart: "Off", count: 0 },
        { depart: "Dev", count: 0 },
        { depart: "Fac", count: 0 },
        { depart: "Pac", count: 0 },
      ]);
      setIsCheckAll(false);
    }
  };
  const onSelect_check = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      const nextData = departs.map((depart) =>
        depart.depart === name
          ? { depart: depart.depart, count: (depart.count = 1) }
          : { depart: depart.depart, count: depart.count }
      );
      setDeparts(nextData);
    } else {
      const nextData = departs.map((depart) =>
        depart.depart === name
          ? { depart: depart.depart, count: (depart.count = 0) }
          : { depart: depart.depart, count: depart.count }
      );
      setDeparts(nextData);
    }
  };
  const onSelect_count = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nextData = departs.map((depart) =>
      depart.depart === name
        ? { depart: depart.depart, count: +value }
        : { depart: depart.depart, count: depart.count }
    );
    setDeparts(nextData);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    dispatch(changeField({ name, value: checked }));
  };
  useEffect(() => {
    dispatch(changeField({ name: "departs", value: departs }));
    let result = true;
    for (let i = 0; i < 4; i++) {
      console.log(departs[i]);
      result = departs[i].count > 0;
    }

    setIsCheckAll(result);
  }, [departs, dispatch]);

  useEffect(() => {
    dispatch(initializeForm());
  }, []);
  return (
    <Checkbox
      isCheckAll={isCheckAll}
      onSelect_check={onSelect_check}
      onSelect_count={onSelect_count}
      changeAllCheck={changeAllCheck}
      onChange={onChange}
      item={item}
    ></Checkbox>
  );
};

export default CheckboxContainer;
