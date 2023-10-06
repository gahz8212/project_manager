import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import InputForm from "../../components/itemInput/InputForm";
import { RootState } from "../../modules";
import { imageInsert } from "../../lib/utils/createFormData";
import {
  changeField,
  inputImage,
  addImage,
  initializeForm,
  inputItem,
} from "../../modules/item";

type Props = {
  open: boolean;
  formOpen: () => void;
};
const ItemContainer: React.FC<Props> = ({ open, formOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, images, error, item, status } = useSelector(
    (state: RootState) => ({
      loading: state.item.loading,
      images: state.item.images,
      error: state.item.error,
      status: state.item.status,
      item: state.item.item,
    })
  );
  const [imageList, setImageList] = useState([] as { url: string }[]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    dispatch(changeField({ name, value }));
  };
  const onImageRemove = (url: string) => {
    setImageList((prevState) => prevState.filter((prev) => prev.url !== url));
    // dispatch(removeImage(url));
  };
  const onImageInsert = async (e: any) => {
    // console.log(e);
    const formData = imageInsert(e, imageList);
    // const imageArray = e.target.files;
    // const formData = new FormData();
    // const notConflictImages = [];
    // const ableCount = 3 - imageList.length;
    // if (ableCount > 0) {
    //   if (imageList.length > 0) {
    //     for (let image of imageArray) {
    //       let isConflict = false;
    //       for (let i = 0; i < imageList.length; i++) {
    //         if (imageList[i].url.slice(5) === image.name) {
    //           isConflict = true;
    //           break;
    //         }
    //       }
    //       if (!isConflict) {
    //         notConflictImages.push(image);
    //       }
    //     }
    //     for (
    //       let i = 0;
    //       i <
    //       (notConflictImages.length > ableCount
    //         ? ableCount
    //         : notConflictImages.length);
    //       i++
    //     ) {
    //       formData.append("images", await resize(notConflictImages[i]));
    //     }
    //   } else {
    //     for (
    //       let i = 0;
    //       i < (imageArray.length > ableCount ? ableCount : imageArray.length);
    //       i++
    //     ) {
    //       formData.append("images", await resize(imageArray[i]));
    //     }
    //   }
    // }
    dispatch(inputImage.request(await formData));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(inputItem.request(item));
  };
  useEffect(() => {
    if (images) {
      setImageList((prevState) => [...prevState, ...images]);
    }
  }, [images]);
  const mounted = useRef(true);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (images) {
      dispatch(addImage(imageList));
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [dispatch, images, imageList]);
  useEffect(() => {
    if (mounted.current) {
      if (error === "로그인이 필요 합니다.") {
        navigate("/");
        mounted.current = false;
      }
    }
  }, [error, navigate, dispatch]);

  useEffect(() => {
    if (open) {
      if (mounted.current) {
        dispatch(initializeForm());
        setIsCheckAll(false);
        mounted.current = false;
      }
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (status === "item_write_ok") {
      formOpen();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, [status]);

  return (
    <InputForm
      loading={loading}
      error={error}
      item={item}
      open={open}
      isCheckAll={isCheckAll}
      onChange={onChange}
      onImageInsert={onImageInsert}
      onImageRemove={onImageRemove}
      onSubmit={onSubmit}
      setIsCheckAll={setIsCheckAll}
      inputRef={inputRef}
    ></InputForm>
  );
};

export default ItemContainer;
