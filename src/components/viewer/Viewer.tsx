import React from "react";
import ButtonsComponents from "../common/ButtonsComponents";
import { ItemData } from "../../lib/api/list";
type Props = {
  show: boolean;
  id: number;
  onChange: (e: any) => void;
  onRead: (id: number) => void;
  onUpdate: (id: number) => void;
  onRemove: () => void;
  item: ItemData;
};
const Viewer: React.FC<Props> = ({
  show,
  id,
  item,
  onChange,
  onRead,
  onUpdate,
  onRemove,
}) => {
  if (!item) {
    return null;
  }

  return (
    <div className={`viewerBlock ${show ? "toRight" : ""}`}>
      <div>{item.category}</div>
      <div>{item.name}</div>
      <div>
        <textarea
          name="description"
          value={item.description}
          onChange={onChange}
        ></textarea>
      </div>
      <div>
        {item.unit}
        {item.price}
      </div>
      <div className="image-area">
        <div className="images">
          {item.Images?.map((image) => (
            <div className="frame" key={image.url}>
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
