import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, updateField } from "../../modules/list";
import Viewer from "../../components/viewer/Viewer";
import { RootState } from "../../modules";
type Props = {
  open: boolean;
  itemId: number;
  onRead: (id: number) => void;
  onUpdate: (id: number) => void;
  onRemove: () => void;
};
const ViewContainer: React.FC<Props> = ({
  open,
  itemId,
  onRead,
  onUpdate,
  onRemove,
}) => {
  const dispatch = useDispatch();
  const { item } = useSelector((state: RootState) => ({
    item: state.list.item,
  }));
  const [newTextValue, setNewTextValue] = useState("");
  const onChange = (e: any) => {
    // console.log(e.target.value);
    setNewTextValue(e.target.value);
    console.log(newTextValue);
    dispatch(updateField({ name: "item", value: newTextValue }));
  };
  return (
    <Viewer
      show={open}
      id={itemId}
      item={item}
      onChange={onChange}
      onRead={onRead}
      onUpdate={onUpdate}
      onRemove={onRemove}
    ></Viewer>
  );
};

export default ViewContainer;
