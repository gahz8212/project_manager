import React from "react";
import { useDrop } from "react-dnd";
type Props = {
  title: string;
  className: string;
  children: React.ReactNode;
 
  relation:(id:number)=>void;
  relate: {
    upperId: number;
    lowerId: number;
}[] | null
};
const Column: React.FC<Props> = ({ title, className, children,relation,relate }) => {
  const [{ isOver, }, drop] = useDrop(() => ({
    accept: "card",
    drop: (item:any) => {
      const {itemInfo,currentColumn}=item;
      // console.log(currentColumn)
   
      relation(itemInfo.id)
      // console.log('id',itemInfo.id,'relate',relate)
      // if(title==='CURRENT' )
      // {
        // console.log('relate',relate)

        // console.log(`${itemInfo.id} 가(이) upper로 `)
        // relate?.forEach(rel=>console.log(rel))
      // }
      // else if(title==='LOWER' )
      // {
        // console.log(`${itemInfo.id} 가(이) lower로 `)
        // relate?.map(rel=>console.log(rel))
        // }

      return{ name: title,parent:3,child:4 }},
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        // canDrop:monitor.canDrop(),
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
