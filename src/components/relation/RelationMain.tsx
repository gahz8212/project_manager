import React, { useState, useEffect, useRef } from "react";
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
  setList: React.Dispatch<React.SetStateAction<ListData>>;
  open: boolean;
  formOpen: () => void;
  makeRelation: (relItem: RelData) => void;
  getRelation: () => void;

  relate:
    | {
        upperId: number;
        lowerId: number;
      }[]
    | null;
};
const RelationMain: React.FC<Props> = ({
  list,
  setList,
  open,
  formOpen,
  makeRelation,
  getRelation,
  relate,
}) => {
  const [items, setItems] = useState(list as ListData);
  const [visible, setVisible] = useState(false);
  const [markItems, setMarkItems] = useState([] as any[]);
  // const [markItems2,setMarkItems2]=useState([]as any[])
  const returnItemFromColumn = (columnName: string) => {
    return items
      .filter((item) => item.column === columnName)
      .map((item) => (
        <Item
          markItems={markItems}
          // markItems2={markItems2}
          key={item.id}
          itemInfo={item}
          setItems={setItems}
          currentColumn={item.column}
        ></Item>
      ));
  };

  const headersId: React.MutableRefObject<number[]> = useRef([]);
  const uppersId: React.MutableRefObject<number[]> = useRef([]);
  const currentsId: React.MutableRefObject<number[]> = useRef([]);
  const lowersId: React.MutableRefObject<number[]> = useRef([]);

  const relateCondition = () => {
    setMarkItems([]);
    // setMarkItems2([])
    const showButton =
      currentsId.current.length > 0 &&
      lowersId.current.length > 0 &&
      currentsId !== lowersId;

    // const compareResult = compareParent(currentsId.current, lowersId.current);
    searchChildren(currentsId.current);



    const searchResult=currentsId.current.map(curId=>lowersId.current.map(lowId=>searchParent(lowId,curId)))
    const family=searchFamily(currentsId.current)
    console.log(family)
    let condition=false;
    for(let res of searchResult){
      for(let r of res){

        if(typeof r==='object')
        {
          condition=false;
          setMarkItems(prev=>prev.includes(r.id)?prev:[...prev,r.id])
          break
        }
        else{
          condition=true
        }
      }
    }
    // console.log(markItems)
    return showButton && condition;
    // return showButton && compareResult;
  };
  // let children: any[] = [];

  const searchFamily=(currentsId:number[])=>{
    const parents=currentsId.map(curr=>relate?.filter(rel=>rel.lowerId===curr)).flat()
    const childrens=currentsId.map(curr=>relate?.filter(rel=>rel.upperId===curr)).flat()
    const parent=(parents.map(p=>p?.upperId))
    const child=childrens.map(c=>c?.lowerId)
console.log('parent',parent[0],'child',child)


setList(prevState=>prevState.map(p=>({...p,column:p.id===parent[0]?'UPPER':'HEADER'})))
// setItems(prev=>prev)
// console.log('list',list,'items',items)




  }
  const searchChildren = (ids: (number | undefined)[]) => {
    const current = ids.map((id) =>
      relate?.filter((rel) => rel.upperId === id)
    );
    if (current.length === 0) {
      return ids;
    }
    const lowers = current.flat().map((cur) => cur?.lowerId);
    // console.log("children", lowers);
    // children.push(lowers);
    searchChildren(lowers);
  };
  // console.log(children);
  const searchParent:(id: number, value: number) => any=(id:number,value:number)=>{
  const upper=relate?.filter(rel=>rel.lowerId===value)[0]?.upperId
  if(upper===undefined){
    return false;
  }
  if(id===upper){
    return {id}
  }else{
    return searchParent(id,upper)
  }
  }

  // const compareParent: (cIds: number[], lIds: number[]) => boolean = (
  //   cIds: number[],
  //   lIds: number[]
  // ) => {
  //   const currents = cIds.map((cId) => findTop(cId));
  //   const lowers = lIds.map((lId) => findTop(lId));
  //   // console.log(currents,lowers)
  //   const results = lowers
  //     .map((lower) => currents.map((current) => current === lower))
  //     .flat();

  //   let changeId: number[] = [];
  //   for (let lId of lIds) {
  //     for (let result of results) {
  //       if (result === true) {
  //         changeId.push(lId);
  //         break;
  //       }
  //     }
  //   }
  //   // console.log('changeId',changeId)
  //   for (let id of changeId) {
  //     setMarkItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
  //   }
  //   // console.log('mark',markItems)
  //   return !results.includes(true);
  // };

  // const findTop: (id: number) => number = (id: number) => {
  //   const upper = relate?.filter((rel) => rel.lowerId === id)[0]?.upperId;
  //   if (upper === undefined) {
  //     return id;
  //   } else {
  //     return findTop(upper);
  //   }
  // };
  useEffect(() => {
    headersId.current = items
      .filter((item) => item.column === "HEADER")
      .map((header) => header.id);
    uppersId.current = items
      .filter((item) => item.column === "UPPER")
      .map((upper) => upper.id);
    currentsId.current = items
      .filter((item) => item.column === "CURRENT")
      .map((current) => current.id);
    lowersId.current = items
      .filter((item) => item.column === "LOWER")
      .map((lower) => lower.id);

    if (relateCondition()) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [items]);

  // useEffect(() => {
  //   setItems(list);
  // }, [list]);
  return (
    <div className="rel-container">
      <div className="space"></div>
      {/* <ItemContainer open={open} formOpen={formOpen} /> */}
      <DndProvider backend={HTML5Backend}>
        <Column
          relate={relate}
          relation={getRelation}
          title={HEADER}
          className="rel_header"
        >
          {returnItemFromColumn(COLUMN_NAMES.HEADER)}
        </Column>
        <div className="rel_wrapper">
          <Column
            relate={relate}
            relation={getRelation}
            title={UPPER}
            className="rel_upper"
          >
            {returnItemFromColumn(COLUMN_NAMES.UPPER)}
          </Column>
          <Column
            relate={relate}
            relation={getRelation}
            title={CURRENT}
            className="rel_current"
          >
            {returnItemFromColumn(COLUMN_NAMES.CURRENT)}
          </Column>
          <Column
            relate={relate}
            relation={getRelation}
            title={LOWER}
            className="rel_lower"
          >
            {returnItemFromColumn(COLUMN_NAMES.LOWER)}
          </Column>
        </div>
      </DndProvider>

      <div>
        <div className={`write ${open ? "rotate" : ""}`}>
          <button onClick={formOpen}>+</button>
        </div>
        <div className={`relate ${visible ? "visible" : ""}`}>
          <button
            onClick={() =>
              makeRelation({
                targetId: currentsId.current,
                sourceId: lowersId.current,
              })
            }
          >
            ^
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelationMain;
