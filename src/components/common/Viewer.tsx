import React from "react";
import { ItemData } from "../../lib/api/item";
import ModalForm from "./ModalForm";
type Props = {
  id: number;
  data: ItemData;
};
const Viewer: React.FC<Props> = ({ id, data }) => {
  return (
    <div className="viewerBlock">
      <div>{data.name}</div>
      <ModalForm id={id} data={data} />
    </div>
  );
};

export default Viewer;
