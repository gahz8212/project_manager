import React from "react";
import ButtonsComponents from "../common/ButtonsComponents";
import { ItemData_list } from "../../lib/api/list";
type Props = {
  show: boolean;
  id: number;
  item: ItemData_list;
  onImageRemove: (url: string) => void;
  onChange: (e: any) => void;
  onRead: (id: number) => void;
  onUpdate: (item: ItemData_list) => void;
  onRemove: () => void;
  onImageUpdate: (e: any) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};
const Viewer: React.FC<Props> = ({
  show,
  id,
  item,
  onChange,
  onImageRemove,
  onRead,
  onUpdate,
  onRemove,
  onImageUpdate,
  inputRef,
}) => {
  if (!item) {
    return null;
  }

  return (
    <div className={`viewerBlock ${show ? "toRight" : ""}`}>
      {/* select와 checkbox의 초기화 정리하고 확인할 것 */}
      <div>
        <select name="category" value={item.category} onChange={onChange}>
          <option value="소프트웨어">소프트웨어</option>
          <option value="하드웨어">하드웨어</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          name="name"
          defaultValue={item.name}
          value={item.name}
          onChange={onChange}
        />
      </div>
      <div>
        <textarea
          defaultValue={item.description}
          value={item.description}
          onChange={onChange}
          name="description"
          readOnly
        ></textarea>
      </div>
      <div>
        <select name="unit" value={item.unit} onChange={onChange}>
          {/* <option value="">==unit==</option> */}
          <option value="$">$</option>
          <option value="￦">￦</option>
          <option value="￥">￥</option>
        </select>

        <input
          type="number"
          min={0}
          name="price"
          value={item.price}
          defaultValue={item.price}
          onChange={onChange}
          step="0.001"
        ></input>
      </div>

      <div>
        <input
          name="count"
          type="number"
          defaultValue={item.count}
          value={item.count}
          onChange={onChange}
        />
        <select name="departs" value={item.departs} onChange={onChange}>
          <option value="Off">사무실</option>
          <option value="Dev">개발실</option>
          <option value="Fac">생산</option>
          <option value="Pac">포장</option>
        </select>
      </div>

      <div className="images">
        <label htmlFor="file">이미지 선택</label>
        <input
          type="file"
          id="file"
          multiple
          accept="image/*"
          onChange={onImageUpdate}
          ref={inputRef}
        />
      </div>

      <div className="image-area">
        <div className="images">
          {item.Images?.map((image) => (
            <div
              className="frame"
              key={image.url}
              onDoubleClick={() => {
                onImageRemove(image.url);
              }}
            >
              <img src={image.url} alt=""></img>
            </div>
          ))}
        </div>
      </div>

      <div className="buttons">
        <ButtonsComponents
          onRead={() => onRead(id)}
          onUpdate={() => onUpdate(item)}
          onDelete={onRemove}
        />
      </div>
    </div>
  );
};

export default Viewer;
