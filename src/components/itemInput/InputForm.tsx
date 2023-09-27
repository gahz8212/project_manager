import React from "react";
import { ItemData } from "../../lib/api/item";
// import Loading from "../common/loading/Loading";
import CheckboxContainer from "../../containers/checkbox/CheckboxContainer";

type Props = {
  loading: boolean;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  onImageInsert: (e: any) => void;
  onImageRemove: (url: string) => void;

  item: ItemData;
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  error: string;
  open: boolean;
  isCheckAll: boolean;
  setIsCheckAll: (check: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

const InputForm: React.FC<Props> = ({
  // loading,
  onChange,
  onImageInsert,
  onImageRemove,
  item,
  onSubmit,
  error,
  open,
  isCheckAll,
  setIsCheckAll,
  inputRef,
}) => {
  // console.log(open);
  return (
    <div className={`inputForm ${open ? "open" : ""}`}>
      <form className="form" onSubmit={onSubmit}>
        <div className="container">
          <div className="left">
            <div className="name">
              <select
                name="category"
                id="category"
                onChange={onChange}
                value="소프트웨어"
              >
                <option value="">분류선택</option>
                <option value="소프트웨어">소프트웨어</option>
                <option value="하드웨어">하드웨어</option>
              </select>
              <input
                type="text"
                placeholder="Input name"
                name="name"
                onChange={onChange}
                value={item.name}
              />
              <div>
                <textarea
                  placeholder="Input description"
                  cols={50}
                  rows={6}
                  name="description"
                  onChange={onChange}
                  value={item.description}
                />
              </div>
            </div>
            <div className="price">
              <select name="unit" value={item.unit} onChange={onChange}>
                <option value="">unit</option>
                <option value="$">$</option>
                <option value="￦">￦</option>
                <option value="￥">￥</option>
              </select>
              <input
                type="number"
                step="0.001"
                min="0"
                placeholder="Input price"
                name="price"
                onChange={onChange}
                value={item.price}
              />
            </div>
            <div className="category">
              <CheckboxContainer
                isCheckAll={isCheckAll}
                setIsCheckAll={setIsCheckAll}
              />
            </div>
          </div>

          <div className="images">
            <label htmlFor="file">이미지 선택</label>
            <input
              type="file"
              id="file"
              multiple
              accept="image/*"
              onChange={onImageInsert}
              ref={inputRef}
            />
            <div className="imageFrame">
              {item &&
                item.images &&
                item.images.map((image) => (
                  <img
                    key={image.url}
                    src={`${image.url}`}
                    alt={image.url}
                    width="120px"
                    onDoubleClick={() => onImageRemove(image.url)}
                  ></img>
                ))}
            </div>
          </div>
        </div>
        <div className="btn">
          <button type="submit">입력</button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
