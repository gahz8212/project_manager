import React from "react";
import { useDrag } from "react-dnd";
import { COLUMN_NAMES } from "./constance";
import { ListData } from "../../lib/api/list";
type Props = {
  setItems: React.Dispatch<React.SetStateAction<ListData>>;
  currentColumn: string;
  markItems: any[];
  // markItems2:any[]
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
const Item: React.FC<Props> = ({
  itemInfo,
  setItems,
  currentColumn,
  markItems,
}) => {
  const setChangeColumn = (item: any, column: string) => {
setItems(prev=>prev.map(pre=>({...pre,column:item.itemInfo.id===pre.id?column:pre.column}))) 

  
  };
  const setParentColumn=(item:any,parent:number)=>{
    setItems(prev=>prev.map(pre=>({...pre,column:pre.id===parent?'UPPER':pre.column})))
  }
  const setChildColumn=(item:any,child:number)=>{
    setItems(prev=>prev.map(pre=>({...pre,column:pre.id===child?'LOWER':pre.column})))
  }
  // console.log(itemInfo);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    item: () => ({ itemInfo, currentColumn }),

    end: (item, monitor) => {
      const dropResult: { name: string,parent:number,child:number } | null = monitor.getDropResult();
      // console.log(dropResult);
      if (dropResult) {
        const { name,parent ,child} = dropResult;

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
            setParentColumn(item,parent)
            setChildColumn(item,child)
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
      <div
        className={`rel_item ${
          markItems.includes(itemInfo.id) ? "orange" : ""
        } `}
      >
        <div className="item_info">
          <div className="id">
            <strong>{itemInfo.id}</strong>
          </div>
          <div className="category">{itemInfo.category}</div>
          <div className="name">{itemInfo.name}</div>

          <div className="price">
            {itemInfo.unit}
            {itemInfo.price}
          </div>
          {/* <div className="departs">{itemInfo.departs}</div> */}
        </div>
        <div className="item_image">
          {itemInfo.Images && <img src={itemInfo?.Images[0]?.url} alt="" />}
        </div>
      </div>
    </div>
  );
};

export default Item;
