import React from "react";
import { useDrop } from "react-dnd";
import { findFamily } from "./RelationMain";
type Props = {
  title: string;
  className: string;
  children: React.ReactNode;
  relate:
    | {
        upperId: number;
        lowerId: number;
      }[]
    | null;
};
const Column: React.FC<Props> = ({ title, className, children, relate }) => {
  // console.log(relate)

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "card",
      drop: (item: {
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
        currentColumn: string;

        currentsId: number[] | null;
      }) => {
        const { currentColumn } = item;

        const family = findFamily(item.itemInfo.id, relate);
        // console.log("item.itemInfo.id", item.itemInfo.id);
        // console.log("family", family);
        return { name: title, currentColumn, family };
      },

      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [relate]
  );
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
