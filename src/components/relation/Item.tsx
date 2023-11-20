import React from "react";
import { findFamily } from "./RelationMain";
import { useDrag } from "react-dnd";
import { COLUMN_NAMES } from "./constance";
import { ListData } from "../../lib/api/list";
type Props = {
  setItems: React.Dispatch<React.SetStateAction<ListData>>;
  currentColumn: string;
  markItems: any[];
  currentsId: number[];
  uppersId: number[];

  familyBall: { parents: (number | undefined)[]; children: (number | undefined)[]; } | undefined;
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
  relate:
    | ({upperId:number,lowerId:number}|undefined)[]|null
};
const Item: React.FC<Props> = ({
  itemInfo,
  uppersId,
  currentsId,
  setItems,
  currentColumn,
  markItems,
  familyBall,
  relate,

}) => {
  const setChangeColumn = (id: number | undefined, column: string) => {
    setItems((prev) =>
      prev.map((pre) => ({
        ...pre,
        column: id === pre.id ? column : pre.column,
      }))
    );
  };

  const setFamilyItem = (
    family:
      | { parents: (number | undefined)[]; children: (number | undefined)[] }
      | undefined
  ) => {
    setParentColumn(family?.parents);
    setChildColumn(family?.children);
  };
  const setChild = (children: (number | undefined)[], column: string) => {
    children?.map((child) =>
      setItems((prev) =>
        prev.map((pre) => ({
          ...pre,
          column: pre.id === child ? column : pre.column,
        }))
      )
    );
  };
  const setGrandChild = (
    grandChildren: number[] | undefined,
    column: string
  ) => {
    grandChildren?.map((children) =>
      setItems((prev) =>
        prev.map((pre) => ({
          ...pre,
          column: pre.id === children ? column : pre.column,
        }))
      )
    );
  };
  const setParent = (parents: (number | undefined)[], column: string) => {
    parents?.map((parent) =>
      setItems((prev) =>
        prev.map((pre) => ({
          ...pre,
          column: pre.id === parent ? column : pre.column,
        }))
      )
    );
  };
  const setGrandParent = (grandParents: number[], column: string) => {
    grandParents?.map((grandParent) =>
      setItems((prev) =>
        prev.map((pre) => ({
          ...pre,
          column: pre.id === grandParent ? column : pre.column,
        }))
      )
    );
  };
  const setParentColumn = (parents: (number | undefined)[] | undefined) => {
    parents?.map((parent) =>
      setItems((prev) =>
        prev.map((pre) => ({
          ...pre,
          column: pre.id === parent ? "UPPER" : pre.column,
        }))
      )
    );
  };
  const setChildColumn = (children: (number | undefined)[] | undefined) => {
    children?.map((child) =>
      setItems((prev) =>
        prev.map((pre) => ({
          ...pre,
          column: pre.id === child ? "LOWER" : pre.column,
        }))
      )
    );
  };
  const setResetColumn = () => {
    setItems((prev) => prev.map((pre) => ({ ...pre, column: "HEADER" })));
  };

  let resultArray:any =[]

  const remove_relation=(ids:(number | undefined)[])=>{
   if(ids){
     const children=ids?.map(id=>findFamily(id,relate)?.children).flat()
     const parents=ids?.map(id=>findFamily(id,relate)?.parents).flat()
    //  if(Object.keys(children).length===0){return}
    //  else{
      // remove_relation(children);
      ids.map((id) =>
        children.map((child) => {
      
          const parents = findFamily(child, relate)?.parents;
          if (parents) {
            if(parents.length<2){
              setChangeColumn(child, "HEADER");
            }
          }
          return { upperId: id, lowerId: child };
        })
      )
      const parentArray = ids.map((id) =>
          parents.map((parent) => {
            return { upperId: parent, lowerId: id };
          })
        );
        resultArray.push( ...parentArray.flat());
     
    }
      return resultArray
      }


  
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "card",
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
      item: () => ({ itemInfo, currentsId, currentColumn }),

      end: (item, monitor) => {
        const dropResult: {
          name: string;
          resetAble: boolean;
          family: {
            parents: (number | undefined)[];
            children: (number | undefined)[];
          };
          grandParents: number[];
          grandChildren: number[];
          title: string;
          currentColumn: string;
        } | null = monitor.getDropResult();

        if (dropResult) {
          const {
            name,
            currentColumn,
            family,
            grandParents,
            grandChildren,
         
          } = dropResult;
          const { HEADER, UPPER, CURRENT, LOWER } = COLUMN_NAMES;
          // console.log(resetAble)
          switch (name) {
            case HEADER: //목적지:HEADER, 출발지:상관없음
           
            let column;
            if(currentColumn===CURRENT){
               column=uppersId;
            }else if(currentColumn===LOWER){
               column=currentsId;
            }else{
              column='top'
            }

            if(column==='top'){
              setResetColumn();
            }else{
            let result=window.confirm(`${column}에서 ${item.itemInfo.id}의 연결을 해제 하나요?`)
            if(result){
            const remove_relate=remove_relation([item.itemInfo.id])
            if (remove_relate) {
              const index = remove_relate?.map((removes: any) =>
                relate?.findIndex(
                  (rel) =>
                    removes.upperId === rel?.upperId &&
                    removes.lowerId === rel?.lowerId
                )
              );
              index.sort().reverse();
              const unique: number[] = index.filter((el: any, i: any) => {
                return index.indexOf(el) === i;
              });
              unique.map((idx) => relate?.splice(idx, 1));
              console.log("relate", relate);
            }
            setChangeColumn(item.itemInfo.id, HEADER);
          }}
              break;
            case UPPER: //목적지:UPPER, 출발지:LOWER || CURRENT, 목적:순회
              if (currentColumn === LOWER || currentColumn === CURRENT) {
                setResetColumn();
              } else if (currentColumn === HEADER) {
              }
              setChangeColumn(item.itemInfo.id, UPPER);
              setGrandChild(grandChildren, LOWER);
              setChild(family.children, CURRENT);
              break;

            case CURRENT: //목적지:CURRENT, 출발지:LOWER || UPPER, 목적:순회
            if (currentColumn === LOWER || currentColumn === UPPER) {
              setResetColumn();
              setFamilyItem(family);
              } else if (currentColumn === HEADER) {
                // console.log('currentsId.length',currentsId.length)
                if (currentsId.length ===0) {
                  setFamilyItem(family);
                }else{
                  setChild(family.children, LOWER);
                  
                }
                // alert('item을 추가 합니다.')
                // setChangeColumn(item.itemInfo.id, CURRENT);
              }
              setChangeColumn(item.itemInfo.id, CURRENT);

              break;
            case LOWER: //목적지:LOWER, 출발지:UPPER || CURRENT, 목적:순회
              if (currentColumn === CURRENT || currentColumn === UPPER) {
                setResetColumn();
                setParent(family.parents, CURRENT);
                setGrandParent(grandParents, UPPER);
              } else if (currentColumn === HEADER) {
                if(currentsId.length>0){
                  const newRelate=currentsId.map(currentId=>({upperId:currentId,lowerId:item.itemInfo.id}))
                  let result=window.confirm(`${currentsId}에 ${item.itemInfo.id}의 연결을 설정 할까요?`)
                  if(result){
                    relate?.push(...newRelate)
                    setChangeColumn(item.itemInfo.id, LOWER);
                  }
                }
              }
              setChangeColumn(item.itemInfo.id, LOWER);
              break;
            default:
              break;
          }
        }
      },
    }),
    [currentsId]
  );
  return (
    <div
      ref={drag}
      // onClick={() => {
      //   alert(relate?.map((rel) => rel.lowerId));
      // }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>
          {familyBall?.parents.map((parent) => (
            <span
              key={parent}
              style={{
                fontWeight: "bold",
                color: "red",
                display: "inline-block",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                backgroundColor: "darkorange",
                textAlign: "center",
                lineHeight: 1.8,
              }}
            >
              {parent}
            </span>
          ))}
        </span>
        <span>
          {familyBall?.children.map((child) => (
            <span
              key={child}
              style={{
                fontWeight: "bold",
                color: "yellow",
                display: "inline-block",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                backgroundColor: "green",
                textAlign: "center",
                lineHeight: 1.8,
              }}
            >
              {child}
            </span>
          ))}
        </span>
      </div>
      <div
        className={`rel_item ${
          markItems.includes(itemInfo.id) ? "orange" : ""
        }`}
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
