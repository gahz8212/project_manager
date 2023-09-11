import React from "react";
import { ListData } from "../../lib/api/list";
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
  formOpen: () => void;
  toggleModal: () => void;
  onRemoveClick: (id: number) => void;
  onRead: (id: number) => void;
  onUpdate: (id: number) => void;
  onRemove: () => void;
};

const ListComponents: React.FC<Props> = ({
  loading,
  list,
  error,
  children,
  open,
  show,
  itemId,
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
      <ViewContainer
        open={show}
        itemId={itemId}
        onRead={onRead}
        onUpdate={onUpdate}
        onRemove={onRemove}
      />
      <ModalForm
        id={itemId}
        visible={visibleModal}
        toggleModal={toggleModal}
        onRemoveClick={onRemoveClick}
      />
      <div className="list-wrapper">
        {list.map((item) => {
          return (
            <div className="list-item" key={item.id}>
              <Link
                to="#"
                onClick={() => {
                  onRead(item.id);
                }}
              >
                <div>
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
