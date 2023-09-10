import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemData_list } from "../../lib/api/list";
import {
  changeField,
  // originFieldClean,
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
  const [Item, setItem] = useState({} as ItemData_list);
  // const [text, setText] = useState("");
  const onChange = (e: any) => {
    const { name, value } = e.target;
    // setText(value);
    dispatch(changeField({ option: "originalItem", name, value }));
  };

  const onImageRemove = (url: string) => {
    // console.log(Item);

    // const newImages = Item?.Images?.filter((image) => image.url !== url);
    // console.log(newImages);
    // const nextData={...Item?.Images,{...Item.Images.filter(image=>image.url!==url)}}
    setItem({
      ...Item,
      Images: Item?.Images?.filter((image) => image.url !== url),
    });
  };
  useEffect(() => {
    if (item) {
      dispatch(updateField(item));
      dispatch(updateFieldClean());
    }
  }, [item, dispatch]);
  useEffect(() => {
    if (originalItem) {
      setItem(originalItem);
    }
  }, [originalItem]);

  return (
    <Viewer
      show={open}
      id={itemId}
      item={Item}
      onImageRemove={onImageRemove}
      onChange={onChange}
      onRead={onRead}
      onUpdate={onUpdate}
      onRemove={onRemove}
    ></Viewer>
  );
};

export default ViewContainer;
