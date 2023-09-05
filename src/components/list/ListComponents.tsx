import React from "react";
import { ListData } from "../../lib/api/list";
import Loading from "../common/loading/Loading";
import ItemContainer from "../../containers/itemInput/ItemContainer";
import ButtonsComponents from "../common/ButtonsComponents";
import Viewer from "../common/Viewer";
type Props = {
  loading: boolean;
  list: ListData | [];
  error: Error | null;
  children: React.ReactNode;
  open: boolean;
  visibleModal: boolean;
  formOpen: () => void;
  onRead: (id: number) => void;
  onUpdate: (id: number) => void;
  onRemove: () => void;
  toggleModal: () => void;
  onRemoveClick: (id: number) => void;
};

const ListComponents: React.FC<Props> = ({
  loading,
  list,
  error,
  children,
  open,
  formOpen,
  onRead,
  onUpdate,
  onRemove,
  toggleModal,
  visibleModal,
  onRemoveClick,
}) => {
  if (!list) return null;
  if (error) return null;

  return (
    <div className="list-container">
      <div className="space"></div>

      {children}
      {loading && <Loading />}
      <ItemContainer open={open} formOpen={formOpen} />

      <div className="list-wrapper">
        {list.map((item) => {
          return (
            <div className="list-item" key={item.id}>
              <div className="item-textarea">
                <div className="left">
                  <b>분류:{item.category}</b>
                  <div>
                    ID:{item.id}
                    <b>품명:{item.name}</b>
                    <div>
                      <b>단가:{item.unit}</b>
                      {item.price}
                    </div>
                    <b>갯수:{item.count}</b>
                  </div>
                  <div>
                    {item.departs}
                    {/* {item.use} */}
                  </div>
                </div>
                <div className="right">
                  <ButtonsComponents
                    onRead={() => onRead(item.id)}
                    onUpdate={() => onUpdate(item.id)}
                    onDelete={onRemove}
                  />

                  <textarea value={item.description} readOnly></textarea>
                </div>
              </div>
              <div className="imageFrame">
                {item.Images?.map((image) => (
                  <img
                    src={image.url}
                    alt=""
                    key={image.url}
                    width="100px"
                  ></img>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className={`write ${open ? "rotate" : ""}`}>
        <button onClick={formOpen}>+</button>
      </div>
    </div>
  );
};

export default ListComponents;
