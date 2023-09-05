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
  const departCounts = item.departs.map((item) => item.count);

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
      <label htmlFor="All">전체</label>

      <div className="departs">
        <div className="left">
          <div className="office">
            <input
              type="checkbox"
              id="Off"
              name="Off"
              checked={departCounts[0] > 0}
              onChange={onSelect_check}
            />
            <label htmlFor="Off">사무실</label>
            {departCounts[0] > 0 && (
              <input
                type="number"
                name="Off"
                id=""
                min={0}
                value={departCounts[0]}
                onChange={onSelect_count}
              />
            )}
          </div>
          <div className="development">
            <input
              type="checkbox"
              id="Dev"
              name="Dev"
              checked={departCounts[1] > 0}
              onChange={onSelect_check}
            />
            <label htmlFor="Dev">개발실</label>
            {departCounts[1] > 0 && (
              <input
                type="number"
                name="Dev"
                id=""
                min={0}
                value={departCounts[1]}
                onChange={onSelect_count}
              />
            )}
          </div>
        </div>
        <div className="right">
          <div className="factory">
            <input
              type="checkbox"
              id="Fac"
              name="Fac"
              checked={departCounts[2] > 0}
              onChange={onSelect_check}
            />
            <label htmlFor="Fac">생산</label>
            {departCounts[2] > 0 && (
              <input
                type="number"
                name="Fac"
                id=""
                min={0}
                value={departCounts[2]}
                onChange={onSelect_count}
              />
            )}
          </div>
          <div className="package">
            <input
              type="checkbox"
              id="Pac"
              name="Pac"
              checked={departCounts[3] > 0}
              onChange={onSelect_check}
            />
            <label htmlFor="Pac">포장</label>
            {departCounts[3] > 0 && (
              <input
                type="number"
                name="Pac"
                id=""
                min={0}
                value={departCounts[3]}
                onChange={onSelect_count}
              />
            )}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="use">사용</label>
        <input
          type="radio"
          id="use"
          name="use"
          value="true"
          // checked={item.use === false}
          onChange={onChange}
          defaultChecked
        />
        <label htmlFor="no-use">미사용</label>
        <input
          type="radio"
          id="no-use"
          name="use"
          value="false"
          // checked={item.use === true}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Checkbox;
