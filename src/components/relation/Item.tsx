import React from "react";
import { useDrag } from "react-dnd";
import { COLUMN_NAMES } from "./constance";
import { ListData } from "../../lib/api/list";
type Props = {
  setItems: React.Dispatch<React.SetStateAction<ListData>>;
  currentColumn: string;
  itemInfo: {
    id: number;
    category: string;
    name: string;
    description: string;
    column: string;
    unit: string;
    price: number;
    departs: string;
    count: number;
    use: boolean;
    Images:
      | {
          url: string;
        }[]
      | null;
  };
};
const Item: React.FC<Props> = ({ itemInfo, setItems, currentColumn }) => {
  const setChangeColumn = (item: any, column: string) => {
    setItems((prev) =>
      prev.map((pre) => ({
        ...pre,
        column: item.itemInfo.name === pre.name ? column : pre.column,
      }))
    );
  };
  // console.log(itemInfo);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    item: () => ({ itemInfo, currentColumn }),

    end: (item, monitor) => {
      const dropResult: { name: string } | null = monitor.getDropResult();
      // console.log(dropResult);
      if (dropResult) {
        const { name } = dropResult;

        const { HEADER, UPPER, CURRENT, LOWER } = COLUMN_NAMES;
        switch (name) {
          case HEADER:
            setChangeColumn(item, HEADER);
            break;
          case UPPER:
            setChangeColumn(item, UPPER);
            break;
          case CURRENT:
            setChangeColumn(item, CURRENT);
            break;
          case LOWER:
            setChangeColumn(item, LOWER);
            break;
          default:
            break;
        }
      }
    },
  }));
  return (
    <div ref={drag}>
      <div className="rel_item">
        <div className="item_info">
          <div className="category">{itemInfo.category}</div>
          <div className="name">{itemInfo.name}</div>

          <div className="price">
            {itemInfo.unit}
            {itemInfo.price}
          </div>
          <div className="departs">{itemInfo.departs}</div>
        </div>
        <div className="item_image">
          {itemInfo.Images && <img src={itemInfo?.Images[0]?.url} alt="" />}
        </div>
      </div>
    </div>
  );
};

export default Item;
