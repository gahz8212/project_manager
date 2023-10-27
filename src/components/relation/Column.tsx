import React from "react";
import { useDrop } from "react-dnd";
type Props = {
  title: string;
  className: string;
  children: React.ReactNode;


};
const Column: React.FC<Props> = ({ title, className, children,}) => {

// const findFamily=(currentIDs:number[]|null,relate:{upperId:number,lowerId:number}[]|null)=>{
const findFamily=(currentIDs:number,relate:{upperId:number,lowerId:number}[]|null)=>{

  if(relate && currentIDs){
    // console.log(currentIDs)
    const parents=relate.filter(rel=>rel.lowerId===currentIDs).map(rel=>rel.upperId)
    // const parents=relate?.filter(rel=>currentIDs?.map(currentID=>currentID===rel.lowerId)).map(rel=>rel.upperId)
    const children=relate.filter(rel=>rel.upperId===currentIDs).map(rel=>rel.lowerId)
    // const children=relate?.filter(rel=>currentIDs?.map(currentID=>currentID===rel.upperId)).map(rel=>rel.lowerId)

return {parents,children}
  }
}
 
  const [{ isOver, }, drop] = useDrop(() => ({
    accept: "card",
    drop: (item:{itemInfo: {
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
    },currentColumn:string,  relate: {
      upperId: number;
      lowerId: number;
  }[],currentsId:number[] | null}) => {
      const {itemInfo,relate,currentColumn,currentsId}=item;
      console.log(itemInfo.id,currentsId,currentColumn)
      const family=findFamily(itemInfo.id,relate)

      return({ name: title,family,currentColumn })},
      collect: (monitor) => ({
        isOver: monitor.isOver(),
    
      }),
 

  }));
  return (
    <div
      ref={drop}
      className={className}
      style={{ backgroundColor: isOver ? "rgb(188,251,255)" : undefined }}
    >
      {children}
    </div>
  );
};

export default Column;
