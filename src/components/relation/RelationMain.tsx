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

  relate:
    | ({
        upperId: number;
        lowerId: number;
      }
    |undefined)[]|null;
};
export const findFamily = (
  currentIDs: number | number[] | undefined,
  relate: ({upperId:number,lowerId:number}|undefined)[]|null
) => {
  if (relate && currentIDs) {
    const parents = relate
      .filter((rel) => rel?.lowerId === currentIDs)
      .map((rel) => rel?.upperId);
    const children = relate
      .filter((rel) => rel?.upperId === currentIDs)
      .map((rel) => rel?.lowerId);

    return { parents, children };
  }
};
const RelationMain: React.FC<Props> = ({
  list,
  setList,
  open,
  formOpen,
  makeRelation,
  relate,
}) => {
  const [visible, setVisible] = useState(false);
  const [markItems, setMarkItems] = useState([] as number[]);


  const returnItemFromColumn = (columnName: string) => {
    return list
      .filter((item) => item.column === columnName)
      .map((item) => (
        <Item
          markItems={markItems}
          uppersId={uppersId.current}
          currentsId={currentsId.current}
          uppersId={lowersId.current}
          familyBall={findFamily(item.id, relate)}
          key={item.id}
          itemInfo={item}
          setItems={setList}
          currentColumn={item.column}
          relate={relate}
<<<<<<< HEAD
       
=======
>>>>>>> b974c2c375abbee91345b11061f3ba84b65b9cf3
        ></Item>
      ));
  };

  const headersId: React.MutableRefObject<number[]> = useRef([]);
  const uppersId: React.MutableRefObject<number[]> = useRef([]);
  const currentsId: React.MutableRefObject<number[]> = useRef([]);
  const lowersId: React.MutableRefObject<number[]> = useRef([]);
  const idRef = useRef<number>(-1);

  const relateCondition = () => {
    setMarkItems([]);

    const showButton =
      (uppersId.current.length > 0 ||
        currentsId.current.length > 0 ||
        lowersId.current.length > 0) &&
      (currentsId !== lowersId ||
        uppersId !== currentsId ||
        uppersId !== lowersId);

    searchChildren(currentsId.current);

    const searchResult = currentsId.current.map((curId) =>
      lowersId.current.map((lowId) => searchParent(lowId, curId))
    );

    // console.log(searchResult);

    let condition = false;
    for (let res of searchResult) {
      for (let r of res) {
        if (typeof r === "object") {
          condition = false;
          setMarkItems((prev) =>
            prev.includes(r.id) ? prev : [...prev, r.id]
          );
          break;
        } else {
          condition = true;
        }
      }
    }
    console.log("condition", condition);
    return showButton && condition;
    // return showButton
  };

  const searchChildren = (ids: (number | undefined)[]) => {
    const current = ids.map((id) =>
      relate?.filter((rel) => rel?.upperId === id)
    );
    if (current.length === 0) {
      return ids;
    }
    const lowers = current.flat().map((cur) => cur?.lowerId);

    searchChildren(lowers);
  };

  const searchParent: (id: number, value: number) => any = (
    id: number,
    value: number
  ) => {
    const upper = relate?.filter((rel) => rel?.lowerId === value)[0]?.upperId;
    if (upper === undefined) {
      return false;
    }
    if (id === upper) {
      return { id };
    } else {
      return searchParent(id, upper);
    }
  };

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
    headersId.current = list
      .filter((item) => item.column === "HEADER")
      .map((header) => header.id);
    uppersId.current = list
      .filter((item) => item.column === "UPPER")
      .map((upper) => upper.id);
    currentsId.current = list
      .filter((item) => item.column === "CURRENT")
      .map((current) => current.id);
    lowersId.current = list
      .filter((item) => item.column === "LOWER")
      .map((lower) => lower.id);

    if (relateCondition()) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [list]);

  return (
    <div className="rel-container">
      <div className="space"></div>
      {/* <ItemContainer open={open} formOpen={formOpen} /> */}
      <DndProvider backend={HTML5Backend}>
        <Column
          relate={relate}
          idRef={idRef}
          title={HEADER}
<<<<<<< HEAD
        
=======
>>>>>>> b974c2c375abbee91345b11061f3ba84b65b9cf3
          className="rel_header"
        >
          {returnItemFromColumn(COLUMN_NAMES.HEADER)}
        </Column>
        <div className="rel_wrapper">
          <Column
            relate={relate}
            idRef={idRef}
            title={UPPER}
<<<<<<< HEAD
           
=======
>>>>>>> b974c2c375abbee91345b11061f3ba84b65b9cf3
            className="rel_upper"
          >
            {returnItemFromColumn(COLUMN_NAMES.UPPER)}
          </Column>
          <Column
            relate={relate}
            idRef={idRef}
            title={CURRENT}
<<<<<<< HEAD
          
=======
>>>>>>> b974c2c375abbee91345b11061f3ba84b65b9cf3
            className="rel_current"
          >
            {returnItemFromColumn(COLUMN_NAMES.CURRENT)}
          </Column>
          <Column
            relate={relate}
            idRef={idRef}
            title={LOWER}
<<<<<<< HEAD
          
=======
>>>>>>> b974c2c375abbee91345b11061f3ba84b65b9cf3
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
