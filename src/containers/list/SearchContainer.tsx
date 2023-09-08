import React, { useState, useEffect } from "react";
import SearchForm from "../../components/list/SearchForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { changeField, initializeForm, searchList } from "../../modules/list";
const SearchContainer = () => {
  const dispatch = useDispatch();

  const { search } = useSelector((state: RootState) => ({
    search: state.list.search,
  }));

  const [isAllCheck, setIsAllCheck] = useState(true);
  const [departList, setDeparts] = useState([
    "Off",
    "Dev",
    "Fac",
    "Pac",
  ] as string[]);
  const [searchText, setSearchText] = useState("품명");

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
    // console.log(checked);
    setDeparts([]);
    if (checked) {
      setDeparts(["Off", "Dev", "Fac", "Pac"]);
      setIsAllCheck(true);
    } else {
      // setDeparts([]);
      setIsAllCheck(false);
    }
  };
  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log(name, value);
    dispatch(changeField({ option: "search", name, value: value === "true" }));
  };
  const onChoice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSearchText(value);
  };
  const onInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log(name, value);
    dispatch(changeField({ option: "search", name, value }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(search);
    dispatch(searchList.request(search));
  };

  useEffect(() => {
    dispatch(initializeForm());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      changeField({ option: "search", name: "departs", value: departList })
    );
    // console.log(departList);
    if (departList.length >= 4) {
      setIsAllCheck(true);
    } else {
      setIsAllCheck(false);
    }
  }, [departList, dispatch]);
  return (
    <SearchForm
      onChange={onChange}
      onSubmit={onSubmit}
      search={search}
      isAllCheck={isAllCheck}
      changeAllCheck={changeAllCheck}
      departs={departList}
      onSelect={onSelect}
      onInputName={onInputName}
      onChoice={onChoice}
    ></SearchForm>
  );
};

export default SearchContainer;
