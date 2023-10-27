import React from "react";

import { useDrag } from "react-dnd";
import { COLUMN_NAMES } from "./constance";
import { ListData } from "../../lib/api/list";
type Props = {
  setItems: React.Dispatch<React.SetStateAction<ListData>>;
  currentColumn: string;
  markItems: any[];
currentsId:number[]
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
 currentsId,
  setItems,
  currentColumn,
  markItems,
  relate
}) => {

  const setChangeColumn = (item: any, column: string) => {

setItems(prev=>prev.map(pre=>({...pre,column:item.itemInfo.id===pre.id?column:pre.column}))) 
console.log('currentsId',currentsId)
  
  };
  const setFamilyItem=(family:{parents:(number|undefined)[],children:(number|undefined)[]})=>{
 

    setParentColumn(family.parents);
    setChildColumn(family.children);
  }
  const setParentColumn=(parents:(number|undefined)[])=>{

    console.log('p',parents)
    parents.map(parent=>setItems(prev=>prev.map(pre=>({...pre,column:pre.id===parent?'UPPER':pre.column}))))
  }
  const setChildColumn=(children:(number|undefined)[])=>{
    children.map(child=>setItems(prev=>prev.map(pre=>({...pre,column:pre.id===child?'LOWER':pre.column}))))
    console.log('c',children)
  }
  const setResetColumn=()=>{
    console.log(currentsId)
    setItems(prev=>prev.map(pre=>({...pre,column:'HEADER'})))
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    item: () => ({ itemInfo, currentsId,currentColumn,relate }),

    end: (item, monitor) => {
      const dropResult: { name: string,family:{parents:(number|undefined)[],children:(number|undefined)[]},title:string,currentColumn:string } | null = monitor.getDropResult();

      
      if (dropResult) {
        const {name,family,currentColumn} = dropResult;
 console.log(currentColumn,name)

        
        
        const { HEADER, UPPER, CURRENT, LOWER } = COLUMN_NAMES;
        switch (name) {
          case HEADER:
            setChangeColumn(item, HEADER);
    if(currentColumn==='CURRENT'&&name==="HEADER"){

      setResetColumn();
    }
            break;
          case UPPER:
            setChangeColumn(item, UPPER);
            break;
          case CURRENT:
            setChangeColumn(item, CURRENT);
            setFamilyItem(family)
   
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
