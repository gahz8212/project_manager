import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemData_list } from "../../lib/api/list";
import { imageInsert } from "../../lib/utils/createFormData";
import {
  changeField,
  updateImage,
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
  const { item, originalItem, updateImages } = useSelector(
    (state: RootState) => ({
      item: state.list.item,
      originalItem: state.list.originalItem,
      updateImages: state.list.updateImages,
    })
  );
  const [Item, setItem] = useState({} as ItemData_list);
  const [imageList, setImageList] = useState([] as { url: string }[]);

  const onChange = (e: any) => {
    const { name, value } = e.target;

    dispatch(changeField({ option: "originalItem", name, value }));
  };

  const onImageRemove = (url: string) => {
    // originalItem.Images = null;
    setItem({
      ...originalItem,
      Images: originalItem.Images?.filter((image) => image.url !== url),
    });
    // console.log(Item.Images);
  };
  const onImageUpdate = async (e: any) => {
    // console.log(e);
    console.log(imageList.length);
    // const formData = imageInsert(e, imageList);
    // dispatch(updateImage.request(await formData));
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
  useEffect(() => {
    if (Item.Images) {
      console.log(Item.Images);
      setImageList(Item.Images);
    }
  }, [Item]);
  // useEffect(() => {
  //   // console.log(updateImages);
  //   if (updateImages) {
  //     setImageList(updateImages);
  //     const nextItem = {
  //       ...originalItem,
  //       Images: originalItem.Images?.concat(imageList),
  //     };
  //     // console.log(nextItem);
  //     setItem(nextItem);
  //   }
  // }, [updateImages, originalItem, imageList]);
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
    ></Viewer>
  );
};

export default ViewContainer;
