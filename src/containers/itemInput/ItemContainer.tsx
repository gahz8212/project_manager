import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputForm from "../../components/itemInput/InputForm";
import { RootState } from "../../modules";
import {
  changeField,
  inputImage,
  addImage,
  initializeForm,
} from "../../modules/item";
import { resize } from "../../lib/utils/resize";
const ItemContainer = () => {
  const dispatch = useDispatch();
  const { loading, images, error, item } = useSelector((state: RootState) => ({
    loading: state.item.loading,
    images: state.item.images,
    error: state.item.error,
    item: state.item.item,
  }));
  const [imageList, setImageList] = useState([] as { url: string }[]);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheckingBox, setIsCheckingBox] = useState(false);
  const [checkedArr, setCheckedArr] = useState([]);

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    dispatch(changeField({ name, value }));
  };
  const onImageInsert = async (e: any) => {
    const imageArray = e.target.files;
    const formData = new FormData();
    const notConflictImages = [];
    const ableCount = 3 - imageList.length;
    if (ableCount > 0) {
      if (imageList.length > 0) {
        for (let image of imageArray) {
          let isConflict = false;
          for (let i = 0; i < imageList.length; i++) {
            if (imageList[i].url.slice(5) === image.name) {
              isConflict = true;
              break;
            }
          }
          if (!isConflict) {
            notConflictImages.push(image);
          }
        }
        for (
          let i = 0;
          i <
          (notConflictImages.length > ableCount
            ? ableCount
            : notConflictImages.length);
          i++
        ) {
          formData.append("images", await resize(notConflictImages[i]));
        }
      } else {
        for (
          let i = 0;
          i < (imageArray.length > ableCount ? ableCount : imageArray.length);
          i++
        ) {
          formData.append("images", await resize(imageArray[i]));
        }
      }
    }
    dispatch(inputImage.request(formData));
  };
  const onImageRemove = (url: string) => {
    setImageList((prevState) => prevState.filter((prev) => prev.url !== url));
  };

  let departs = [] as string[];
  // const allDeparts = ["Off", "Dev", "Man", "Pac"];
  const onSelect = (e: any) => {
    const { value, checked } = e.target;
    // console.log(name, value, checked);

    if (checked) {
      departs.push(value);
    } else {
      const index = departs.findIndex(() => value);
      departs.splice(index - 1, 1);
    }
    console.log(departs);
  };

  useEffect(() => {
    if (images) {
      setImageList((prevState) => [...prevState, ...images]);
    }
  }, [images]);
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (images) {
        console.log(imageList.length);
        dispatch(addImage(imageList));
      }
    }
  }, [dispatch, images, imageList]);

  useEffect(() => {
    dispatch(initializeForm());
  }, [dispatch]);
  return (
    <InputForm
      loading={loading}
      onChange={onChange}
      onImageInsert={onImageInsert}
      onImageRemove={onImageRemove}
      item={item}
      onSelect={onSelect}
    ></InputForm>
  );
};

export default ItemContainer;
