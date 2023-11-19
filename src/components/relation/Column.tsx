import React from "react";
import { useDrop } from "react-dnd";
import { findFamily } from "./RelationMain";
type Props = {
  title: string;
  className: string;
  children: React.ReactNode;
  // setHighlight:React.Dispatch<React.SetStateAction<number>>;
  relate:
    | {
        upperId: number;
        lowerId: number;
      }[]
    | null;
  idRef: React.MutableRefObject<number>;
};
const Column: React.FC<Props> = ({
  title,
  className,
  children,
  relate,
  idRef,
  // setHighlight,
}) => {
  // console.log(relate)
  //  const idRef=useRef<number>(0)
  const findGrandParent = (parents: number[] | undefined) => {
    let grandParents: number[] = [];
    if (parents) {
      parents.forEach((parent) => {
        relate?.forEach((rel) => {
          if (rel.lowerId === parent) {
            grandParents.push(rel.upperId);
          }
        });
      });
    }
    return grandParents;
  };
  const findGrandchildren = (children: number[] | undefined) => {
    let grandChildren: number[] = [];
    if (children) {
      children.forEach((child) => {
        relate?.forEach((rel) => {
          if (rel.upperId === child) {
            grandChildren.push(rel.lowerId);
          }
        });
      });
    }

    return grandChildren;
  };
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

        // currentsId: number[] | null;
      }) => {
        const { currentColumn } = item;

        const family = findFamily(item.itemInfo.id, relate);
        const grandParents = findGrandParent(family?.parents);
        const grandChildren = findGrandchildren(family?.children);

        return {
          name: title,
          currentColumn,
          family,
          grandParents,
          grandChildren,
        };
      },

      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [relate, idRef.current] //////////////이런 방법이 존재한다고!
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
