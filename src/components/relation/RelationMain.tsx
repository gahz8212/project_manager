import React, { useState, useEffect,useRef } from "react";
import { ListData } from "../../lib/api/list";
import Item from "./Item";
import Column from "./Column";
import { COLUMN_NAMES } from "./constance";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import ItemContainer from "../../containers/itemInput/ItemContainer";
import { RelData } from "../../lib/api/item";
const { HEADER, UPPER, CURRENT, LOWER } = COLUMN_NAMES;
type Props = {
  list: ListData;
  open: boolean;
  formOpen: () => void;
  makeRelation:(relItem:RelData)=>void;
  getRelation:(id:number)=>void;

  relate: {
    upperId: number;
    lowerId: number;
}[] | null;
};
const RelationMain: React.FC<Props> = ({ list, open, formOpen,makeRelation,getRelation,relate }) => {
  const [items, setItems] = useState(list as ListData);
  const [visible,setVisible]=useState(false)

  const returnItemFromColumn = (columnName: string) => {
    return items
      .filter((item) => item.column === columnName)
      .map((item) => (
        <Item
     
          key={item.id}
          itemInfo={item}
          setItems={setItems}
          currentColumn={item.column}
        ></Item>
      ));
  };
// const makeRelation=()=>{
  
// console.log(headersId.current)
// console.log(uppersId.current)
// console.log(currentsId.current)
// console.log(lowersId.current)
// }
const headersId:React.MutableRefObject<number[]>=useRef([] )
const uppersId:React.MutableRefObject<number[]>=useRef([] )
const currentsId:React.MutableRefObject<number[]>=useRef([] )
const lowersId:React.MutableRefObject<number[]>=useRef([] )

const relateCondition=()=>{
  const result=(currentsId.current.length>0 && lowersId.current.length>0 && currentsId!==lowersId  )
  // const result=currentsId.current.length>0 && lowersId.current.length>0
  //lowersId.current의 요소가 uppersId.current 요소에 있으면 
  // console.log(currentsId.current,lowersId.current,relate)
  if(result){
    searchParent(currentsId.current,lowersId.current)
    
  }
  return true;
}

const searchParent=(parentNode:number[],childNode:number[])=>{
  if(relate){
    let result:boolean=false
   for(let child of childNode){
    for(let rel of relate){
      if(rel.upperId===child){
        result=true;
        console.log(child)
        break;
      }
    }
   }
   if(result){
    return;
   }else{
    searchParent(childNode,parentNode)
   }
    // console.log(relate.length,relate,parentNode,childNode)

    // for(const rel of relate){
    //   // console.log(rel)
    //    result=(childNode.map(child=>rel.upperId===child))[0]
    // }
    return result;
  }
}


  useEffect(()=>{
    headersId.current=items.filter(item=>item.column==='HEADER').map(header=>header.id)
    uppersId.current=items.filter(item=>item.column==='UPPER').map(upper=>upper.id)
    currentsId.current=items.filter(item=>item.column==='CURRENT').map(current=>current.id)
    lowersId.current=items.filter(item=>item.column==='LOWER').map(lower=>lower.id)
    // console.log(currentsId.current)
  if(relateCondition()){
    setVisible(true)
  }else{
  setVisible(false)
}
},[items])

useEffect(() => {
  setItems(list);
}, [list]);
  return (
    <div className="rel-container">
      <div className="space"></div>
      {/* <ItemContainer open={open} formOpen={formOpen} /> */}
      <DndProvider backend={HTML5Backend}>
        <Column relate={relate} relation={getRelation}  title={HEADER} className="rel_header">
          {returnItemFromColumn(COLUMN_NAMES.HEADER)}
        </Column>
        <div className="rel_wrapper">
          <Column  relate={relate}  relation={getRelation} title={UPPER} className="rel_upper">
            {returnItemFromColumn(COLUMN_NAMES.UPPER)}
          </Column>
          <Column  relate={relate}  relation={getRelation} title={CURRENT} className="rel_current">
            {returnItemFromColumn(COLUMN_NAMES.CURRENT)}
          </Column>
          <Column  relate={relate}  relation={getRelation} title={LOWER} className="rel_lower">
            {returnItemFromColumn(COLUMN_NAMES.LOWER)}
          </Column>
        </div>
      </DndProvider>

      <div>
      <div className={`write ${open ? "rotate" : ""}`}>
        <button onClick={formOpen}>+</button>
      </div>
      <div className={`relate ${visible ? "visible" : ""}`}>
        <button onClick={()=>makeRelation({targetId:currentsId.current,sourceId:lowersId.current})}>^</button>
      </div>
      </div>
    </div>
  );
};

export default RelationMain;
