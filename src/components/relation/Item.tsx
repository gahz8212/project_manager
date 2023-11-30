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
  testId:React.MutableRefObject<number[]>;
  setMarkItems: React.Dispatch<React.SetStateAction<number[]>>;
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
  testId,
  setItems,
  setMarkItems,
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
  
      ids?.map((id) =>
        children.map((child) => {
      
          const parents = findFamily(child, relate)?.parents;
         if(parents){
          const nextParents=parents.filter(parent=>parent!==id)
          if(nextParents.length===0){
            setChangeColumn(child, "HEADER");

          }
          console.log('nextParents',nextParents)
          nextParents.forEach(id=>{
            console.log('id',id)
            if(id){ 
            
           if(currentsId.includes(id)){
          }else{
            setChangeColumn(child, "HEADER")}
          }})

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
  const add_relation=(uppersId:number[],lowersId:number)=>{
    console.log(uppersId,lowersId)
    const nextRelate=uppersId.map(upper=>({upperId:upper,lowerId:lowersId}))
    relate?.push(...nextRelate)

      return resultArray
      }


  
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "card",
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
      item: () => ({ itemInfo, testId, currentColumn }),

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
          const parentsCount=findFamily(item.itemInfo.id,relate)?.parents.length
          const childrenCount=findFamily(item.itemInfo.id,relate)?.children.length
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
              setMarkItems([]);
            }else{
              if(parentsCount===0 && childrenCount===0){
                setChangeColumn(item.itemInfo.id,HEADER)
              }
              else{
            // let result=window.confirm(`${column}에서 ${item.itemInfo.id}의 연결을 해제 하나요?`)
            // if(result){
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
              // console.log("relate", relate);
            }
            setChangeColumn(item.itemInfo.id, HEADER);
            
          }}
        
              break;



              
            case UPPER: //목적지:UPPER, 출발지:LOWER || CURRENT, 목적:순회
            if(currentColumn===UPPER){
              break;
            }
            if(currentColumn===HEADER){
              if(parentsCount===0 && childrenCount===0){// 부모 자식없는 아이템
                if( uppersId.length>0 ){//UPPER가 차 있으면 CURRENT로
                  setChangeColumn(item.itemInfo.id,CURRENT)
                }else if(uppersId.length===0 && currentsId.length===0){//UPPER,CURRENT 모두 비어 있으면 UPPER로
                  setChangeColumn(item.itemInfo.id,UPPER)
                  // console.log('list',item)
              }
            }else if(parentsCount!==0 && childrenCount===0){//부모만 있고 자식이 없는 아이템
              if( uppersId.length>0 ){//UPPER가 차 있으면 않으면 CURRENT로
                setChangeColumn(item.itemInfo.id,CURRENT)
              }else if(uppersId.length===0 && currentsId.length===0){//UPPER,CURRENT 모두 비어 있으면 UPPER로
                setChangeColumn(item.itemInfo.id,UPPER)
              }
            }else if(parentsCount===0 && childrenCount!==0){//자식이 있고 부모가 없는 아이템
              
              if( uppersId.length>0 ){////UPPER가 차 있으면 않으면 CURRENT로
                //아이템의 자식중에 uppersId가 있는 경우
                setChangeColumn(item.itemInfo.id,CURRENT)
                family.children.forEach(child=>
                  {
                    if(child){
                     
                      if(uppersId.includes(child)){
                        setMarkItems(prev=>[...prev,item.itemInfo.id])

                      } 
                    else {
                      setChild(family.children, LOWER);
                  }
                }})
              }else if(uppersId.length===0 && currentsId.length===0){//UPPER,CURRENT 모두 비어 있으면 UPPER로
                setChangeColumn(item.itemInfo.id,UPPER)
                setGrandChild(grandChildren, LOWER);
                setChild(family.children, CURRENT);
              }
            } 
            else if(parentsCount!==0 && childrenCount!==0){//자식도 있고 부모도 있는 아이템
              
              if( uppersId.length>0 ){////UPPER가 차 있으면 않으면 CURRENT로
                //아이템의 자식중에 uppersId가 있는 경우
                setChangeColumn(item.itemInfo.id,CURRENT)
                family.children.forEach(child=>
                  {
                    if(child){
                     
                      if(uppersId.includes(child)){
                        setMarkItems(prev=>[...prev,item.itemInfo.id])

                      } 
                    else {
                      setChild(family.children, LOWER);
                  }
                }})
              }else if(uppersId.length===0 && currentsId.length===0){//UPPER,CURRENT 모두 비어 있으면 UPPER로
                setChangeColumn(item.itemInfo.id,UPPER)
                setGrandChild(grandChildren, LOWER);
                setChild(family.children, CURRENT);
              }
            } 
          
          
          
          }else if(currentColumn===CURRENT||currentColumn===LOWER){
                  //CURRENT에는 둘 이상의 아이템이 공존할 수 있으므로 (자기 자신과 UPPER의 자식, LOWER의 부모가 있을 수 있다.)
                  //CURRENT가 최상위 부모가 되는 상황이므로 setResetColumn()을 호출한 뒤의 상황이 반영되어야 한다.
                  //초기값은 선택된 아이템만 UPPER로 이동된다.
                  //자식만 있는 아이템이면 uppersId>0(자기 자신을 뺀 누군가의 부모) currentsId>0(자기자신) 
                  //부모와 자식 둘다 있는 아이템이면 uppersId>0(자기 자신 포함한 누군가의 부모) && currentsId>0(최소 1, 자기 자신) 
                  //부모와 *자식* 둘다 *없는* 아이템이면 uppersId>0(자기 자신을 뺀 누군가의 부모) currentsId>0(최소1, 자기 자신을 포함한 UPPER의 자식)
                  //부모만 있고 *자식*이 *없는* 아이템이면 uppersId>0(자기 자신 포함한 누군가의 부모) currentsId는 무시
                  if((parentsCount===0||parentsCount!==0) && childrenCount!==0){
                    setResetColumn()
                    setChangeColumn(item.itemInfo.id,UPPER)
                    setChild(family.children,CURRENT)
                    setGrandChild(grandChildren,LOWER)
                  }
                  else if((parentsCount===0||parentsCount!==0) && childrenCount===0){
                    setResetColumn()
                    setChangeColumn(item.itemInfo.id,UPPER)
                  } 
            }
              break;
              
              case CURRENT: //목적지:CURRENT, 출발지:LOWER || UPPER, 목적:순회
              if(currentColumn===CURRENT){
                break;
              }
                if(currentColumn===HEADER){
                  if(parentsCount===0 && childrenCount===0){// 부모도 없고 자식도 없는 아이템이 왔는데
                    if( uppersId.length>0 ){//UPPER가 차 있으면 CURRENT로
                      setChangeColumn(item.itemInfo.id,CURRENT)
                      // console.log({uppersId,lowersId:item.itemInfo.id})
                      add_relation(uppersId,item.itemInfo.id)
                    }else if(uppersId.length===0 && currentsId.length===0){//UPPER도 비어있고 CURRENT도 비어 있으면 UPPER로
                      setChangeColumn(item.itemInfo.id,UPPER)
                    }
                  }else if(parentsCount!==0 && childrenCount===0){//부모만 있고 자식이 없는 아이템
                    if( uppersId.length>0 ){////UPPER가 차 있으면 CURRENT로
                      setChangeColumn(item.itemInfo.id,CURRENT)
                      add_relation(uppersId,item.itemInfo.id)
                      // console.log({uppersId,lowersId:item.itemInfo.id})
                    }else if(uppersId.length===0 && currentsId.length===0){//아무도 없으면 CURRENT로 - family를 보려는 의도
                      setChangeColumn(item.itemInfo.id,CURRENT)
                      add_relation(uppersId,item.itemInfo.id)
                      setParent(family.parents,UPPER)
                    }
                  }else if(parentsCount===0 && childrenCount!==0){//부모없이 자식만 있는 아이템
                    
                    if( uppersId.length>0 ){//UPPER가 차 있으면 아이템은 CURRENT로 자식은 LOWER로
                      setChangeColumn(item.itemInfo.id,CURRENT)
                      add_relation(uppersId,item.itemInfo.id)
                      // console.log({uppersId,lowersId:item.itemInfo.id})
                      family.children.forEach(child=>
                        {
                          if(child){
                            if(uppersId.includes(child)){
                              setMarkItems(prev=>[...prev,item.itemInfo.id])
                            } 
                          else {
                            setChild(family.children, LOWER);
                        }
                      }})
                    }else if(uppersId.length===0 && currentsId.length===0){//UPPER,CURRENT 모두 비어 있으면 UPPER로
                      setChangeColumn(item.itemInfo.id,UPPER)
                      setGrandChild(grandChildren, LOWER);
                      setChild(family.children, CURRENT);
                    }
                  }
                  else if(parentsCount!==0 && childrenCount!==0){//부모도 있고 자식도 있는 아이템
                    
                    if( uppersId.length>0 ){//UPPER가 차 있으면 아이템은 CURRENT로 자식은 LOWER로
                      setChangeColumn(item.itemInfo.id,CURRENT)
                      // console.log({uppersId,lowersId:item.itemInfo.id})
                      family.children.forEach(child=>
                        {
                          if(child){
                           
                            if(uppersId.includes(child)){
                              setMarkItems(prev=>[...prev,item.itemInfo.id])

                            } 
                          else {
                            setChild(family.children, LOWER);
                        }
                      }})
                    }else if(uppersId.length===0 && currentsId.length===0){//UPPER,CURRENT 모두 비어 있으면 UPPER로
                      setChangeColumn(item.itemInfo.id,UPPER)
                      setGrandChild(grandChildren, LOWER);
                      setChild(family.children, CURRENT);
                    }
                  } 

                }
                else if(currentColumn===UPPER){//아이템이 UPPER에서 왔을때
                  //UPPER에는 둘 이상의 아이템이 공존할 수 없으므로 (자기 자신만 있을 수 있다.)
                  //초기값에 부모는 무시하고 자기 자신이 UPPER에 있는 상황
                  //자식만 있는 아이템이면 uppersId>0(자기 자신) currentsId>0 
                  //부모와 자식 둘다 있는 아이템이면 uppersId>0(자기 자신) && currentsId>0 
                  //부모와 자식 둘다 없는 아이템이면 uppersId>0(자기 자신) currentsId는 무시
                  //부모만 있고 자식이 없는 아이템이면 uppersId>0(자기 자신) currentsId는 무시
                  if(parentsCount===0 && childrenCount===0){// 부모 자식없는 아이템이 UPPER에서 CURRENT로 왔을 때
                    if( uppersId.length>0 && currentsId.length===0 ){//초기값
                      setChangeColumn(item.itemInfo.id,UPPER)
                    }
            
                  }else if(parentsCount!==0 && childrenCount===0){//부모만 있는 아이템이 UPPER에서 CURRENT로 왔을 때
                    if( uppersId.length>0 ){//UPPER만 차 있으면
                      setChangeColumn(item.itemInfo.id,UPPER)
                    }
        
                  }else if(parentsCount===0 && childrenCount!==0){//부모없이 자식만 있는 아이템
                    if(uppersId.length>0 && currentsId.length>0){//UPPER와 CURRENT가 모두 차 있을때
                      setChangeColumn(item.itemInfo.id,UPPER)
                    }
                  } else if(parentsCount!==0 && childrenCount!==0){//부모와 자식이 모두 있는 아이템
                    if(uppersId.length>0 && currentsId.length>0){//UPPER와 CURRENT가 모두 차 있을때
                      setChangeColumn(item.itemInfo.id,CURRENT)
                      setParent(family.parents,UPPER);
                      setChild(family.children,LOWER)
                    }
                  } 
                }
                //아이템이 LOWER에서 왔을때
                else if(currentColumn===LOWER){
                  //LOWER에 아이템이 있다는 것은 이미 UPPER와 CURRENT에 값이 있는 상황(LOWER에는 자기자신과 CURRENT에 부모가 있는 아이템이 있을 수 있다.)
                  //초기값에 부모는 항상 존재하고 자기 자신포함한 다른 아이템이 LOW에 있는 상황
                  //자식만 있는 아이템이면 uppersId>0(항상) currentsId>0 
                  //부모와 자식 둘다 있는 아이템이면 uppersId>0(항상) && currentsId>0 
                  //부모와 자식 둘다 없는 아이템이면 uppersId>0(항상) currentsId>0
                  //부모만 있고 자식이 없는 아이템이면 uppersId>0(항상) currentsId>0
                  if(parentsCount!==0 && childrenCount===0){//부모만 있는 아이템이 LOWER에서 CURRENT로 왔을 때
                    setResetColumn()
                    setChangeColumn(item.itemInfo.id,CURRENT)
                    setParent(family.parents,UPPER)
                    
                  } else if(parentsCount!==0 && childrenCount!==0){//부모와 자식이 모두 있는 아이템이 왔는데333333333333333333333333
                    
                    setResetColumn()
                    setChangeColumn(item.itemInfo.id,CURRENT)
                    setFamilyItem(family)
                  } 
                  else if(parentsCount===0 && childrenCount!==0){//부모없이 자식만 있는 아이템이 왔는데333333333333333333333333
                    setResetColumn()
                    setChangeColumn(item.itemInfo.id,CURRENT)
                      setFamilyItem(family)
                  } 
                }

              break;
            case LOWER: //목적지:LOWER, 출발지:UPPER || CURRENT, 목적:순회
            if(currentColumn===LOWER){
              break;
            }
            //HEADER=>LOWER
            if(currentColumn===HEADER){
            if(parentsCount===0 && childrenCount===0){//부모 자식 없는 아이템
              if(uppersId.length>0 && currentsId.length>0){
                setChangeColumn(item.itemInfo.id,LOWER)
                add_relation(currentsId,item.itemInfo.id)
              }
              else if(uppersId.length>0 && currentsId.length===0){
                setChangeColumn(item.itemInfo.id,CURRENT)
                add_relation(uppersId,item.itemInfo.id)
              }
              else if(uppersId.length===0 && currentsId.length===0){
                setChangeColumn(item.itemInfo.id,UPPER)
                
              }
              
            }else if(parentsCount===0 && childrenCount!==0){//부모 없이 자식만 있는 아이템
              if(uppersId.length>0 && currentsId.length>0){
                setChangeColumn(item.itemInfo.id,LOWER)
                add_relation(currentsId,item.itemInfo.id)
                family.children.forEach(child=>
                  {
                    if(child){
                     
                      if(uppersId.includes(child)){
                        setMarkItems(prev=>[...prev,item.itemInfo.id])

                      } 
               
                }})}
              else if(uppersId.length>0 && currentsId.length===0){
                //만약 이동한 아이템의 자식이 UPPER에 이미 있는 경우
                setChangeColumn(item.itemInfo.id,CURRENT)
                add_relation(uppersId,item.itemInfo.id)
                if(family.children.map(child=>
                  {if(child){return uppersId.includes(child)}else return false}
                  )){
                    setMarkItems(prev=>[...prev,item.itemInfo.id])
                    
                  }else{
                    setChild(family.children,LOWER)

                  }
              }
              else if(uppersId.length===0 && currentsId.length===0){
                setChangeColumn(item.itemInfo.id,UPPER)
                setChild(family.children,CURRENT)
                setGrandChild(grandChildren,LOWER)
              }              
            }else if(parentsCount!==0 && childrenCount===0){//부모만 있는 경우
              if(uppersId.length>0 && currentsId.length>0){
                setChangeColumn(item.itemInfo.id,LOWER)
                add_relation(currentsId,item.itemInfo.id)
              }
              else if(uppersId.length>0 && currentsId.length===0){//UPPER만 차 있을때
                setChangeColumn(item.itemInfo.id,CURRENT) 
                add_relation(uppersId,item.itemInfo.id)
              }        
              else if(uppersId.length===0 && currentsId.length===0){//UPPER,CURRENT 비어있을때
                setChangeColumn(item.itemInfo.id,UPPER)
                setChild(family.children,CURRENT)
                setGrandChild(grandChildren,LOWER)
              }              
            }else if(parentsCount!==0 && childrenCount!==0){//부모도 있고 자식도 있는 경우
              if(uppersId.length>0 && currentsId.length>0){
                setChangeColumn(item.itemInfo.id,LOWER)
                add_relation(currentsId,item.itemInfo.id)
                family.children.forEach(child=>
                  {
                    if(child){
                     
                      if(uppersId.includes(child)){
                        setMarkItems(prev=>[...prev,item.itemInfo.id])

                      } 
                    else {
                      setChild(family.children, LOWER);
                  }
                }})
              }
              else if(uppersId.length>0 && currentsId.length===0){
                setChangeColumn(item.itemInfo.id,CURRENT)
                add_relation(uppersId,item.itemInfo.id)
                if(family.children.map(child=>
                  {if(child){return uppersId.includes(child)}else return false}
                  )){
                    setMarkItems(prev=>[...prev,item.itemInfo.id])
                  }else{
                    setChild(family.children,LOWER)

                  }
                
              }         
              else if(uppersId.length===0 && currentsId.length===0){

                setChangeColumn(item.itemInfo.id,UPPER)
                setChild(family.children,CURRENT)
                setGrandChild(grandChildren,LOWER)
              }
              
            }
          }
          else if(currentColumn===CURRENT){
            // if(uppersId.length>0 && currentsId.length>1){setChangeColumn(item.itemInfo.id,LOWER)}
            // else if(uppersId.length>0 && currentsId.length===1){
            //   setChangeColumn(item.itemInfo.id,CURRENT);
            //   setChild(family.children,LOWER) }
            if(parentsCount!==0 && childrenCount!==0){
              if(uppersId.length>0 && currentsId.length>1){setChangeColumn(item.itemInfo.id,LOWER)}
              else if(uppersId.length>0 && currentsId.length===1){setChangeColumn(item.itemInfo.id,CURRENT);setChild(family.children,LOWER) }
            //   // else if(uppersId.length===0 && currentsId.length===0){}}
            // else if(parentsCount!==0 && childrenCount===0){
            //    if(uppersId.length>0 && currentsId.length>0){}
            //    else if(uppersId.length>0 && currentsId.length===1){}
            //   //  else if(uppersId.length===0 && currentsId.length===0){}}
            }else if(parentsCount===0 && childrenCount!==0){
               if(uppersId.length>0 && currentsId.length>0){
                // setResetColumn();
                setChangeColumn(item.itemInfo.id,LOWER)}
               else if(uppersId.length>0 && currentsId.length===1){setChangeColumn(item.itemInfo.id,CURRENT);setChild(family.children,LOWER)}
              //  else if(uppersId.length===0 && currentsId.length===0){}}
            // else if(parentsCount===0 && childrenCount===0){
            //    if(uppersId.length>0 && currentsId.length>0){}
            //    else if(uppersId.length>0 && currentsId.length===1){}
            //   //  else if(uppersId.length===0 && currentsId.length===0){}}
          }else{
            if(uppersId.length>0 && currentsId.length===1){
              setChangeColumn(item.itemInfo.id,CURRENT)}
          }
        }
              break;
            default:
              break;
          }
        }
      },
    }),
    [currentsId,relate]
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
