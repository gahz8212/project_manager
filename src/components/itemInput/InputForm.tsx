import React from "react";
import "./InputForm.scss";
import Loading from "../common/loading/Loading";
type Props = {
  loading: boolean;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  onImageInsert: (e: any) => void;
  onImageRemove: (url: string) => void;
  images: { url: string }[] | null;
};

const InputForm: React.FC<Props> = ({
  loading,
  onChange,
  onImageInsert,
  onImageRemove,
  images,
}) => {
  return (
    <>
      <div
        className="space"
        // style={{ height: "6rem", background: "gray" }}
      ></div>
      <form>
        <div className="container">
          <div className="left">
            <div className="name">
              <select name="category" id="category" onChange={onChange}>
                <option value="">분류선택</option>
                <option value="소프트웨어">소프트웨어</option>
                <option value="하드웨어">하드웨어</option>
              </select>
              <input
                type="text"
                placeholder="Input name"
                name="name"
                onChange={onChange}
              />
              <div>
                <textarea
                  placeholder="Input description"
                  cols={50}
                  rows={6}
                  name="description"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="price">
              <select name="unit" onChange={onChange}>
                <option value="">unit</option>
                <option value="$">$</option>
                <option value="￦">￦</option>
                <option value="￥">￥</option>
              </select>
              <input
                type="number"
                placeholder="Input price"
                name="price"
                onChange={onChange}
              />
            </div>
            <div className="category">
              <div className="departs">
                <input type="checkbox" id="Off" onChange={onChange} />
                <label htmlFor="Off">사무실</label>
                <input type="checkbox" id="Dev" />
                <label htmlFor="Dev">개발실</label>
                <input type="checkbox" id="Man" />
                <label htmlFor="Man">생산</label>
                <input type="checkbox" id="Pac" />
                <label htmlFor="Pac">포장</label>
              </div>
            </div>
          </div>

          <div className="images">
            <label htmlFor="file">이미지 선택</label>
            <input
              type="file"
              // name="image"
              id="file"
              multiple
              accept="image/*"
              onChange={onImageInsert}
            />
            <div className="imageFrame">
              {images &&
                images.map((image) => (
                  <img
                    key={image.url}
                    src={`/img/${image.url}`}
                    alt={image.url}
                  ></img>
                ))}
            </div>
          </div>

          {loading && <Loading />}
        </div>
      </form>
    </>
  );
};

export default InputForm;
