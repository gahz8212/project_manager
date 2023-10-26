import React from "react";
import { useDrop } from "react-dnd";
type Props = {
  title: string;
  className: string;
  children: React.ReactNode;


};
const Column: React.FC<Props> = ({ title, className, children,}) => {

const findFamily=(currentID:number,relate:{upperId:number,lowerId:number}[]|null)=>{

  if(relate){
    const parents=relate.filter(rel=>rel.lowerId===currentID).map(rel=>rel.upperId)
    const children=relate.filter(rel=>rel.upperId===currentID).map(rel=>rel.lowerId)

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
  }[] | null}) => {
      const {itemInfo,relate,currentColumn}=item;
      console.log(itemInfo.id,currentColumn)
      const family=findFamily(itemInfo.id,relate)

      return({ name: title,family })},
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
