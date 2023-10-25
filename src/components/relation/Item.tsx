import React,{useState} from "react";

import { useDrag } from "react-dnd";
import { COLUMN_NAMES } from "./constance";
import { ListData } from "../../lib/api/list";
type Props = {
  setItems: React.Dispatch<React.SetStateAction<ListData>>;
  currentColumn: string;
  markItems: any[];
  // family:{parent:(number|undefined)[],child:(number|undefined)[]}

  relate: {
    upperId: number;
    lowerId: number;
}[] | null
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
  relate
}) => {

  const setChangeColumn = (item: any, column: string) => {

setItems(prev=>prev.map(pre=>({...pre,column:item.itemInfo.id===pre.id?column:pre.column}))) 

  
  };
  const setParentColumn=(parent:number)=>{
    // setItems(prev=>prev.map(pre=>({...pre,column:pre.id===parent?'UPPER':pre.column})))
    console.log('p',parent)
  }
  const setChildColumn=(child:(number|undefined)[])=>{
    // setItems(prev=>prev.map(pre=>({...pre,column:pre.id===child?'LOWER':pre.column})))
    console.log('c',child)
  }
  const setResetColumn=()=>{
    setItems(prev=>prev.map(pre=>({...pre,column:'HEADER'})))
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    item: () => ({ itemInfo, currentColumn,relate }),

    end: (item, monitor) => {
      // const dropResult: { name: string,family:{parent:(number|undefined)[],child:(number|undefined)[]} } | null = monitor.getDropResult();
      const dropResult: { name: string,  relate: {
        upperId: number;
        lowerId: number;
    }[] | null}|null = monitor.getDropResult();
      // console.log(dropResult);
      if (dropResult) {
        const {name,relate} = dropResult;
 

        
        
        const { HEADER, UPPER, CURRENT, LOWER } = COLUMN_NAMES;
        switch (name) {
          case HEADER:
            setChangeColumn(item, HEADER);
            // setResetColumn();
            break;
          case UPPER:
            setChangeColumn(item, UPPER);
            break;
          case CURRENT:
            setChangeColumn(item, CURRENT);
         
              console.log(relate)
            
            // setParentColumn(parent)
            // setChildColumn(family.child)
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
