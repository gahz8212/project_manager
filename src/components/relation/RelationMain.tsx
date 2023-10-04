import React, { useEffect, useState } from "react";
import { ListData } from "../../lib/api/list";
import Item from "./Item";
import Column from "./Column";
import { COLUMN_NAMES } from "./constance";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const { HEADER, UPPER, CURRENT, LOWER } = COLUMN_NAMES;
type Props = {
  list: ListData;
  // setItems: React.Dispatch<React.SetStateAction<ListData>>;
};
const RelationMain: React.FC<Props> = ({ list }) => {
  const [items, setItems] = useState(list);
  const returnItemFromColumn = (columnName: string) => {
    return items
      .filter((item) => item.column === columnName)
      .map((item) => (
        <Item
          key={item.id}
          itemInfo={item}
          setItems={setItems}
          currentColumn={item.column}
        ></Item>
      ));
  };

  return (
    <div className="rel_container">
      <div className="space"></div>
      <DndProvider backend={HTML5Backend}>
        <Column title={HEADER} className="rel_header">
          {returnItemFromColumn(COLUMN_NAMES.HEADER)}
        </Column>
        <div className="rel_wrapper">
          <Column title={UPPER} className="rel_upper">
            {returnItemFromColumn(COLUMN_NAMES.UPPER)}
          </Column>
          <Column title={CURRENT} className="rel_current">
            {returnItemFromColumn(COLUMN_NAMES.CURRENT)}
          </Column>
          <Column title={LOWER} className="rel_lower">
            {returnItemFromColumn(COLUMN_NAMES.LOWER)}
          </Column>
        </div>
      </DndProvider>
    </div>
  );
};

export default RelationMain;
