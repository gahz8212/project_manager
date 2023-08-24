import React, { useState, useEffect } from "react";
import Checkbox from "../../components/common/checkbox/CheckBox";
import { changeField } from "../../modules/item";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { initializeForm } from "../../modules/item";
import { ItemData } from "../../lib/api/item";

const CheckboxContainer = () => {
  const [departs, setDeparts] = useState([{ depart: "Off", count: 1 }] as {
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
          { depart: "Off", count: 0 },
          { depart: "Dev", count: 0 },
          { depart: "Man", count: 0 },
          { depart: "Pac", count: 0 },
        ],
      ]);
      setIsCheckAll(true);
    } else {
      setIsCheckAll(false);
    }
  };
  const onSelect_check = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    // console.log(name, checked);
    if (checked) {
      setDeparts((prev) => [...prev, { depart: name, count: 0 }]);
    } else {
      setDeparts((prev) => prev.filter((p) => p.depart !== name));
    }
  };
  const onSelect_count = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const {name, value, checked } = e.target;
    const { name, value } = e.target;
    console.log(departs);

    // if (checked) {
    //   console.log(checked);
    setDeparts((prev) =>
      prev.filter((p) => (p.depart === name ? (p.count = +value) : p.count))
    );
    // } else {
    //   console.log(checked);
    //   // setDeparts((prev) => prev.filter((p) => p !== value));
    // }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log(value);
    dispatch(changeField({ name, value }));
  };
  useEffect(() => {
    // console.log(depart);
    dispatch(changeField({ name: "departs", value: departs }));
    setIsCheckAll(departs.length === 4);
  }, [departs, dispatch]);
  const makeDeparts = (item: ItemData) => {
    const result = item.departs.map((item) => {
      const { depart } = item;
      return depart;
    });
    return result;
  };
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
