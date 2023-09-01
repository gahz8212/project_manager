import React from "react";
import { SearchData } from "../../lib/api/list";
type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  search: SearchData;
  isAllCheck: boolean;
  changeAllCheck: (checked: boolean) => void;
  departs: string[];
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChoice: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
const SearchForm: React.FC<Props> = ({
  onChange,
  onSubmit,
  search,
  isAllCheck,
  changeAllCheck,
  departs,
  onSelect,
  onInputName,
  onChoice,
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
              checked={departs.includes("Off")}
            />
          </label>
          <label>
            개발실
            <input
              type="checkbox"
              name="search_depart"
              value="Dev"
              onChange={onChange}
              checked={departs.includes("Dev")}
            />
          </label>
          <label>
            생산팀
            <input
              type="checkbox"
              name="search_depart"
              value="Fac"
              onChange={onChange}
              checked={departs.includes("Fac")}
            />
          </label>
          <label>
            포장팀
            <input
              type="checkbox"
              name="search_depart"
              value="Pac"
              onChange={onChange}
              checked={departs.includes("Pac")}
            />
          </label>
        </div>
        <div className="useSearch">
          <label>
            사용
            <input
              type="radio"
              name="use"
              value="true"
              onChange={onSelect}
              defaultChecked
            />
          </label>
          <label>
            미사용
            <input type="radio" name="use" value="false" onChange={onSelect} />
          </label>
        </div>
        <div>
          <select onChange={onChoice} defaultValue="name">
            검색옵션
            <option value="">검색옵션</option>
            <option value="category">분류</option>
            <option value="description">규격</option>
            <option value="name">품명</option>
          </select>
          <input
            type="text"
            name="name"
            placeholder="검색어를 입력 하세요"
            onChange={onInputName}
          />
          <button>검색</button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
