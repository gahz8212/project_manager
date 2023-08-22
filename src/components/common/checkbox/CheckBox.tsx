import React from "react";
import { ItemData } from "../../../lib/api/item";
type Props = {
  isCheckAll: boolean;
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeAllCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        value="All"
        onChange={changeAllCheck}
        checked={isCheckAll}
        // checked
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
        // checked={["Off", "Dev"].includes("Off")}
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
        // checked={["Off", "Dev"].includes("Dev")}
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
        // checked={["Off", "Dev"].includes("Man")}
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
        // checked={["Off", "Dev"].includes("Pac")}
      />
      <label htmlFor="Pac">포장</label>
      <div>
        <label htmlFor="use">사용</label>
        <input
          type="radio"
          id="use"
          name="use"
          value="true"
          onChange={onChange}
        />
        <label htmlFor="no-use">미사용</label>
        <input
          type="radio"
          id="no-use"
          name="use"
          value="false"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Checkbox;
