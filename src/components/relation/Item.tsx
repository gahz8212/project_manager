import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { COLUMN_NAMES } from "./constance";
import { ListData } from "../../lib/api/list";
type Props = {
  // newItems: {}[];
  setItems: React.Dispatch<React.SetStateAction<{}[]>>;
};
const Item: React.FC<Props> = ({ setItems }) => {
  return <div></div>;
};

export default Item;
