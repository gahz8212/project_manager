import React from "react";
import { useDrop } from "react-dnd";
type Props = {
  title: string;
  className: string;
  children: React.ReactNode;


};
const Column: React.FC<Props> = ({ title, className, children}) => {



 
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
      const {currentColumn,}=item;
  

     

      return({ name: title,currentColumn })},
      
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
