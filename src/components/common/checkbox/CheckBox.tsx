import React from "react";
import { ItemData } from "../../../lib/api/item";
type Props = {
  isCheckAll: boolean;
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeAllCheck: (checked: boolean) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  item: ItemData;
};
const Checkbox: React.FC<Props> = ({
  isCheckAll,
  onSelect,
  changeAllCheck,
  onChange,
  item,
}) => {
  return (
    <div className="departs">
      <input
        type="checkbox"
        id="All"
        name="departs"
        onChange={() => {
          changeAllCheck(!isCheckAll);
        }}
        checked={isCheckAll}
      />
      <label htmlFor="Off">전체</label>

      <input
        type="checkbox"
        id="Off"
        name="departs"
        value="Off"
        onChange={onSelect}
        // checked={isCheckAll}
        // onChange={onSelect}
        // checked
        checked={item.departs.includes("Off")}
      />
      <label htmlFor="Off">사무실</label>
      <input
        type="checkbox"
        id="Dev"
        name="departs"
        value="Dev"
        onChange={onSelect}
        // checked={isCheckAll}
        // onChange={onSelect}
        // checked
        checked={item.departs.includes("Dev")}
      />
      <label htmlFor="Dev">개발실</label>
      <input
        type="checkbox"
        id="Man"
        name="departs"
        value="Man"
        onChange={onSelect}
        // checked={isCheckAll}
        // onChange={onSelect}
        // checked
        checked={item.departs.includes("Man")}
      />
      <label htmlFor="Man">생산</label>
      <input
        type="checkbox"
        id="Pac"
        name="departs"
        value="Pac"
        onChange={onSelect}
        // checked={isCheckAll}

        // onChange={onSelect}
        // checked
        checked={item.departs.includes("Pac")}
      />
      <label htmlFor="Pac">포장</label>
      <div>
        <label htmlFor="use">사용</label>
        <input
          type="radio"
          id="use"
          name="use"
          value="use"
          onChange={onChange}
          defaultChecked
          // checked
        />
        <label htmlFor="no-use">미사용</label>
        <input
          type="radio"
          id="no-use"
          name="use"
          value="not-use"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Checkbox;
