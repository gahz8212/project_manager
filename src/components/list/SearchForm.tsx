import React from "react";
import { SearchData } from "../../lib/api/list";
type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  search: SearchData;
  isAllCheck: boolean;
  changeAllCheck: (checked: boolean) => void;
};
const SearchForm: React.FC<Props> = ({
  onChange,
  onSubmit,
  search,
  isAllCheck,
  changeAllCheck,
}) => {
  // console.log(Array.isArray(search));
  // console.log(search);
  return (
    <form className="searchWrapper" onSubmit={onSubmit}>
      <div className="search">
        <div className="departSearch">
          <div>
            <label>
              전체
              <input
                type="checkbox"
                name="search_depart"
                checked={isAllCheck}
                onChange={() => {
                  changeAllCheck(!isAllCheck);
                }}
              />
            </label>
          </div>
          <label>
            사무실
            <input
              type="checkbox"
              name="search_depart"
              value="Off"
              onChange={onChange}
            />
          </label>
          <label>
            개발실
            <input
              type="checkbox"
              name="search_depart"
              value="Dev"
              onChange={onChange}
            />
          </label>
          <label>
            생산팀
            <input
              type="checkbox"
              name="search_depart"
              value="Fac"
              onChange={onChange}
            />
          </label>
          <label>
            포장팀
            <input
              type="checkbox"
              name="search_depart"
              value="Pac"
              onChange={onChange}
            />
          </label>
        </div>
        <div>
          <input type="text" name="search_text" id="" />
          <button>검색</button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
