import React from "react";

import { useDrag } from "react-dnd";
import { COLUMN_NAMES } from "./constance";
import { ListData } from "../../lib/api/list";
type Props = {
  setItems: React.Dispatch<React.SetStateAction<ListData>>;
  currentColumn: string;
  markItems: any[];
currentsId:number[]

family:{parents:number[],children:number[]}|undefined;
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
family
 
}) => {

const setChangeColumn = (item: any, column: string) => {
  setItems(prev=>prev.map(pre=>({...pre,column:item.itemInfo.id===pre.id?column:pre.column}))) 
  console.log('currentsId',currentsId)

  };
  
  const setFamilyItem=()=>{
  setParentColumn(family?.parents);
  setChildColumn(family?.children);

  }
  const setParentColumn=(parents:number[]|undefined)=>{


    parents?.map(parent=>setItems(prev=>prev.map(pre=>({...pre,column:pre.id===parent?'UPPER':pre.column}))))
  }
  const setChildColumn=(children:number[]|undefined)=>{
    children?.map(child=>setItems(prev=>prev.map(pre=>({...pre,column:pre.id===child?'LOWER':pre.column}))))

  }
  const setResetColumn=()=>{
    console.log(currentsId)
    setItems(prev=>prev.map(pre=>({...pre,column:'HEADER'})))
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    item: () => ({ itemInfo, currentsId,currentColumn }),

    end: (item, monitor) => {
      const dropResult: { name: string,family:{parents:(number|undefined)[],children:(number|undefined)[]},title:string,currentColumn:string } | null = monitor.getDropResult();

      
      if (dropResult) {
        const {name,currentColumn} = dropResult;
        const { HEADER, UPPER, CURRENT, LOWER } = COLUMN_NAMES;
        switch (name) {
          case HEADER:
            setChangeColumn(item, HEADER);
            if(currentColumn==='CURRENT' && name==="HEADER"){
              setResetColumn()}
            break;
          case UPPER:
            setChangeColumn(item, UPPER);
            break;
          case CURRENT:
            setChangeColumn(item, CURRENT);
            setFamilyItem()
   
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

      <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>

     <span style={{color:'tomato',display:'inline-block',borderRadius:'50%',width:'30px',height:'30px',backgroundColor:'gray',textAlign:'center',lineHeight:1.8}}>{family?.parents}</span> 
      <span style={{color:'yellow',display:'inline-block',borderRadius:'50%',width:'30px',height:'30px',backgroundColor:'green',textAlign:'center',lineHeight:1.8}}>{family?.children}</span>
      </div>
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
