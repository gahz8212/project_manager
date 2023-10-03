import React from "react";
import { useDrop } from "react-dnd";
type Props = {
  itemInfo: { id: number; title: string }[];
  className: string;
  children: React.ReactNode;
};
const Column: React.FC<Props> = ({ itemInfo, className, children }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "card",
    drop: () => ({ item: itemInfo }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: () => true,
  });
  return (
    <div
      ref={drop}
      className={className}
      style={{ backgroundColor: isOver ? "rgb(188,251,255)" : undefined }}
    >
      {itemInfo &&
        itemInfo.map((item) => <div key={item.id}>{item.title}</div>)}
      {children}
    </div>
  );
};

export default Column;
