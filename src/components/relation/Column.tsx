import React from "react";
import { useDrop } from "react-dnd";
type Props = {
  title: string;
  className: string;
  children: React.ReactNode;
  relation:(id:number)=>void;
  
};
const Column: React.FC<Props> = ({ title, className, children,relation }) => {
  const [{ isOver,canDrop }, drop] = useDrop(() => ({
    accept: "card",
    drop: (item:any) => {
      const {itemInfo,currentColumn}=item;
        // console.log('itemInfo.id',itemInfo.id)
        // console.log(currentColumn)
       
        if(currentColumn==='LOWER')
        {
          relation(itemInfo.id)

        }

      return{ name: title }},
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop:monitor.canDrop(),
      }),
      // canDrop:(item:any)=>{
      //   // const {itemInfo}=item;
      //   // console.log('itemInfo.id',itemInfo.id)
      //   return true
      // }

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
