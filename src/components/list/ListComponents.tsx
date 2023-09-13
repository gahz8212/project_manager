import React from "react";
import { ListData } from "../../lib/api/list";
import { ItemData_list } from "../../lib/api/list";
import Loading from "../common/loading/Loading";
import ItemContainer from "../../containers/itemInput/ItemContainer";

import ViewContainer from "../../containers/viewer/ViewContainer";
import { Link } from "react-router-dom";
import ModalForm from "../common/ModalForm";
type Props = {
  loading: boolean;
  list: ListData | [];
  error: Error | null;
  children: React.ReactNode;
  open: boolean;
  show: boolean;
  visibleModal: boolean;
  itemId: number;
  item: ItemData_list;
  formOpen: () => void;
  toggleModal: () => void;
  onRead: (id: number) => void;
  onRemoveClick: (id: number) => void;
  onUpdateClick: (
    item: ItemData_list
    // options: { option: string; name: string; value: any }
  ) => void;
  onRemove: () => void;
  onUpdate: (item: ItemData_list) => void;
};

const ListComponents: React.FC<Props> = ({
  loading,
  list,
  error,
  children,
  open,
  show,
  itemId,
  item,
  visibleModal,
  formOpen,
  onRead,
  toggleModal,
  onRemove,
  onRemoveClick,
  onUpdate,
  onUpdateClick,
}) => {
  if (!list) return null;
  if (error) return null;

  return (
    <div className="list-container">
      <div className="space"></div>

      {children}
      {loading && <Loading />}
      <ItemContainer open={open} formOpen={formOpen} />
      <ViewContainer
        open={show}
        itemId={itemId}
        onRead={onRead}
        onUpdate={onUpdate}
        onRemove={onRemove}
      />
      <ModalForm
        id={itemId}
        item={item}
        visible={visibleModal}
        toggleModal={toggleModal}
        onRemoveClick={onRemoveClick}
        onUpdateClick={onUpdateClick}
      />
      <div className="list-wrapper">
        {list.map((item) => {
          return (
            <div
              className={`list-items ${item.id === itemId ? "select" : ""}`}
              key={item.id}
            >
              <Link
                to="#"
                onClick={() => {
                  onRead(item.id);
                }}
              >
                <div className="list-item">
                  <div className="item-textarea">
                    <div className="left">
                      <b>분류:{item.category}</b>
                      <div>
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
              </Link>
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
