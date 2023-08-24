import React from "react";
import { ItemData } from "../../../lib/api/item";
import "./CheckBox.scss";
type Props = {
  isCheckAll: boolean;
  onSelect_check: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect_count: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeAllCheck: (checked: boolean) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  item: ItemData;
};
const Checkbox: React.FC<Props> = ({
  isCheckAll,
  onSelect_check,
  onSelect_count,
  changeAllCheck,
  onChange,
  item,
}) => {
  const checkConfirm = (item: ItemData, value: string) => {
    const { departs } = item;
    let result;
    for (let i = 0; i < departs.length; i++) {
      result = Object.values(departs[i]).includes(value);
      if (result) break;
    }
    return result;
  };
  return (
    <div className="wraper">
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

      <div className="departs">
        <div>
          <div>
            <input
              type="checkbox"
              id="Off"
              name="Off"
              value="Off"
              checked={checkConfirm(item, "Off")}
              onChange={onSelect_check}
            />
            <label htmlFor="Off">사무실</label>
            {checkConfirm(item, "Off") && (
              <input
                type="number"
                name="Off"
                id=""
                min={0}
                defaultValue={0}
                style={{ textAlign: "right", width: "20%" }}
                onChange={onSelect_count}
              />
            )}
          </div>
          <div>
            <input
              type="checkbox"
              id="Dev"
              name="Dev"
              value="Dev"
              checked={checkConfirm(item, "Dev")}
              onChange={onSelect_check}
            />
            <label htmlFor="Dev">개발실</label>
            {checkConfirm(item, "Dev") && (
              <input
                type="number"
                name="Dev"
                id=""
                min={0}
                defaultValue={0}
                style={{ textAlign: "right", width: "20%" }}
                onChange={onSelect_count}
              />
            )}
          </div>
          {/* </div>
        <div>
          <div>
            <input
              type="checkbox"
              id="Man"
              name="Man"
              value="Man"
              checked={checkConfirm(item, "Man")}
              onChange={onSelect_check}
            />
            <label htmlFor="Man">생산</label>
            {checkConfirm(item, "Man") && (
              <input
                type="number"
                name="Man"
                id=""
                min={0}
                defaultValue={0}
                style={{ textAlign: "right", width: "20%" }}
                onChange={onSelect_count}
              />
            )}
          </div>
          <div>
            <input
              type="checkbox"
              id="Pac"
              name="Pac"
              value="Pac"
              checked={checkConfirm(item, "Pac")}
              onChange={onSelect_check}
            />
            <label htmlFor="Pac">포장</label>
            {checkConfirm(item, "Pac") && (
              <input
                type="number"
                name="Pac"
                id=""
                min={0}
                defaultValue={0}
                style={{ textAlign: "right", width: "20%" }}
                onChange={onSelect_count}
              />
            )}
          </div>*/}
        </div>
      </div>
      <div>
        <label htmlFor="use">사용</label>
        <input
          type="radio"
          id="use"
          name="use"
          value="use"
          onChange={onChange}
          defaultChecked
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
