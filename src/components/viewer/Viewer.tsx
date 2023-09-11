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
  onUpdate: (id: number) => void;
  onRemove: () => void;
  onImageUpdate: (e: any) => void;
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
}) => {
  if (!item) {
    return null;
  }

  return (
    <div className={`viewerBlock ${show ? "toRight" : ""}`}>
      {/* select와 checkbox의 초기화 정리하고 확인할 것 */}
      <div>
        <select name="category" onChange={onChange}>
          <option value="소프트웨어" selected={item.category === "소프트웨어"}>
            소프트웨어
          </option>
          <option value="하드웨어" selected={item.category === "하드웨어"}>
            하드웨어
          </option>
        </select>
      </div>
      <div>
        <input
          type="text"
          name="name"
          defaultValue={item.name}
          onChange={onChange}
        />
      </div>
      <div>
        <textarea
          defaultValue={item.description}
          onChange={onChange}
          name="description"
        ></textarea>
      </div>
      <div>
        <select name="unit" value={item.unit} onChange={onChange}>
          {/* <option value="">==unit==</option> */}
          <option value="$" selected={item.unit === "$"}>
            $
          </option>
          <option value="￦" selected={item.unit === "￦"}>
            ￦
          </option>
          <option value="￥" selected={item.unit === "￥"}>
            ￥
          </option>
        </select>

        <input
          type="number"
          min={0}
          name="price"
          value={item.price}
          onChange={onChange}
          step="0.001"
        ></input>
      </div>
      {/* <form> */}
      <div className="images">
        <label htmlFor="file">이미지 선택</label>
        <input
          type="file"
          id="file"
          multiple
          accept="image/*"
          onChange={onImageUpdate}
        />
      </div>
      {/* </form> */}
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
          onUpdate={() => onUpdate(id)}
          onDelete={onRemove}
        />
      </div>
    </div>
  );
};

export default Viewer;
