import React, { useState, useEffect } from "react";
import Checkbox from "../../components/common/checkbox/CheckBox";
import { changeField } from "../../modules/item";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
// import { initializeForm } from "../../modules/item";
// type Props = {
//   departsment: { depart: string; count: number }[];
// };
const CheckboxContainer = () => {
  const dispatch = useDispatch();
  const { item } = useSelector((state: RootState) => ({
    item: state.item.item,
  }));
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [departs, setDeparts] = useState(item.departs);

  const changeAllCheck = (checked: boolean) => {
    setDeparts([]);
    if (checked) {
      setDeparts([
        { depart: "Off", count: 1 },
        { depart: "Dev", count: 1 },
        { depart: "Fac", count: 1 },
        { depart: "Pac", count: 1 },
      ]);
      setIsCheckAll(true);
    } else {
      setDeparts([
        { depart: "Off", count: 1 },
        { depart: "Dev", count: 0 },
        { depart: "Fac", count: 0 },
        { depart: "Pac", count: 0 },
      ]);
      setIsCheckAll(false);
    }
  };
  const onSelect_check = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setDeparts(item.departs);

    if (checked) {
      setDeparts((prev) =>
        prev.map((depart) =>
          depart.depart === name ? { ...depart, count: 1 } : depart
        )
      );
    } else {
      setDeparts((prev) =>
        prev.map((depart) =>
          depart.depart === name ? { ...depart, count: 0 } : depart
        )
      );
    }
  };
  const onSelect_count = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeparts((prev) =>
      prev.map((depart) =>
        depart.depart === name
          ? { depart: depart.depart, count: +value }
          : { depart: depart.depart, count: depart.count }
      )
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value === "true") {
      dispatch(changeField({ name, value: true }));
    } else {
      dispatch(changeField({ name, value: false }));
    }
  };

  useEffect(() => {
    dispatch(changeField({ name: "departs", value: departs }));

    let result = true;
    for (let i = 0; i < 4; i++) {
      result = departs[i].count > 0;
      if (result === false) {
        break;
      }
    }
    setIsCheckAll(result);
  }, [departs, dispatch]);

  // useEffect(() => {
  //   dispatch(initializeForm());
  //   return () => {
  //     setIsCheckAll(false);
  //   };
  // }, []);
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
