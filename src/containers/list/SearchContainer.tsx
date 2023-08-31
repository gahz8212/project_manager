import React, { useState, useEffect } from "react";
import SearchForm from "../../components/list/SearchForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { changeField, initializeForm } from "../../modules/list";
const SearchContainer = () => {
  const dispatch = useDispatch();

  const { search } = useSelector((state: RootState) => ({
    search: state.list.search,
  }));

  const [isAllCheck, setIsAllCheck] = useState(false);
  const [departs, setDeparts] = useState([] as string[]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    // dispatch(changeField({ name, value }));
    if (checked) {
      setDeparts((prev) => [...prev, value]);
    } else {
      setDeparts((prev) => prev.filter((p) => p !== value));
    }
  };
  const changeAllCheck = (checked: boolean) => {
    console.log(checked);
    setDeparts([]);
    if (checked) {
      setDeparts(["Off", "Dev", "Fac", "Pac"]);
      setIsAllCheck(true);
    } else {
      setDeparts([]);
      setIsAllCheck(false);
    }
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  useEffect(() => {
    dispatch(initializeForm());
  }, [dispatch]);

  useEffect(() => {
    if (departs.length >= 4) {
      setIsAllCheck(isAllCheck);
    }
  }, [departs, isAllCheck]);
  return (
    <SearchForm
      onChange={onChange}
      onSubmit={onSubmit}
      search={search}
      isAllCheck={isAllCheck}
      changeAllCheck={changeAllCheck}
    ></SearchForm>
  );
};

export default SearchContainer;
