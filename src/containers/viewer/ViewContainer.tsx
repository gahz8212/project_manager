import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemData_list } from "../../lib/api/list";
import { imageInsert } from "../../lib/utils/createFormData";
import {
  updateImage,
  // updateField,
  updateFieldClean,
  changeField,
} from "../../modules/list";
import Viewer from "../../components/viewer/Viewer";
import { RootState } from "../../modules";
type Props = {
  open: boolean;
  itemId: number;
  onRead: (id: number) => void;
  onUpdate: (
    item: ItemData_list
    // options: { option: string; name: string; value: any }
  ) => void;
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
  const { originalItem, updateImages } = useSelector((state: RootState) => ({
    // item: state.list.item,
    originalItem: state.list.originalItem,
    updateImages: state.list.updateImages,
  }));
  const [Item, setItem] = useState({} as ItemData_list);
  const [imageList, setImageList] = useState([] as { url: string }[]);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setItem({ ...Item, [name]: value });
    // onUpdate(Item, { option: "originalItem", name, value });
    // dispatch(changeField({ option: "originalItem", name, value }));
  };

  const onImageRemove = (url: string) => {
    setItem({
      ...Item,
      Images: Item.Images?.filter((image) => image.url !== url),
    });
  };
  const onImageUpdate = async (e: any) => {
    const formData = imageInsert(e, imageList);
    dispatch(updateImage.request(await formData));
  };
  useEffect(() => {
    if (originalItem) {
      dispatch(updateFieldClean());
      // dispatch(updateField(item));
      // setImageList([]);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [dispatch, imageList, originalItem]);

  useEffect(() => {
    if (originalItem) {
      setItem(originalItem);
    }
  }, [originalItem]);

  useEffect(() => {
    if (updateImages) {
      setItem({
        ...Item,
        Images: Item.Images?.concat(updateImages),
      });
    }
  }, [updateImages]);

  useEffect(() => {
    if (Item.Images) {
      setImageList(Item.Images);
    }
  }, [Item, imageList]);
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
      onImageUpdate={onImageUpdate}
      inputRef={inputRef}
    ></Viewer>
  );
};

export default ViewContainer;
