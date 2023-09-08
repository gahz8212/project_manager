import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeField,
  originFieldClean,
  updateField,
  updateFieldClean,
} from "../../modules/list";
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
  const { item, originalItem } = useSelector((state: RootState) => ({
    item: state.list.item,
    originalItem: state.list.originalItem,
  }));
<<<<<<< HEAD

  const onChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(changeField({ option: "originalItem", name, value }));
  };
  const onImageRemove = (url: string) =>
    // console.log("url", url);

    {
      return {
        ...originalItem,
        image: originalItem?.Images?.filter((image) => image.url !== url),
      };
    };
  useEffect(() => {
    if (item) {
      dispatch(updateField(item));
      dispatch(updateFieldClean());
    }
  }, [item, dispatch]);

=======
  const [newItem, setNewItem] = useState(item);
  // const [newTextValue, setNewTextValue] = useState("");
  const onChange = (e: any) => {
    const { name, value } = e.target;
    console.log("name:", name, "value:", value);
    // setNewTextValue(e.target.value);
    // console.log(newTextValue);
    // dispatch(updateField({ name: "item", value: newTextValue }));
  };
  // console.log(item);
>>>>>>> 53ae2baee5eaaed2996bcbf657a328e7a2282e7c
  return (
    <Viewer
      show={open}
      id={itemId}
      item={originalItem}
      onImageRemove={onImageRemove}
      onChange={onChange}
      onRead={onRead}
      onUpdate={onUpdate}
      onRemove={onRemove}
    ></Viewer>
  );
};

export default ViewContainer;
