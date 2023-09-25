import React from "react";
import { ItemData_list } from "../../lib/api/list";
type Props = {
  id: number;
  item: ItemData_list;
  originalItem: ItemData_list;
  visible: string;
  toggleModal: (option: string) => void;
  onRemoveClick: (id: number) => void;
  onUpdateClick: (item: ItemData_list) => void;
};
const ModalForm: React.FC<Props> = ({
  id,
  item,
  originalItem,
  visible,
  toggleModal,
  onRemoveClick,
  onUpdateClick,
}) => {
  return (
    <div>
      {visible === "remove" ? (
        <div className="modalblock">
          <div className="confirm_remove">
            <div>{id}</div>
            <div>{item.name}</div>
            <div className="btns">
              <button onClick={() => onRemoveClick(id)}>삭제</button>
              <button onClick={() => toggleModal("")}>취소</button>
            </div>
          </div>
        </div>
      ) : visible === "update" ? (
        <div className="modalblock">
          <div className="confirm_update">
            <div>{id}</div>

            <div className="confirm_select">
              <div className="update_before" onClick={() => toggleModal("")}>
                <div>{originalItem.category}</div>
                <div>{originalItem.name}</div>
                <div>{originalItem.description}</div>
                <div>
                  {originalItem.unit}
                  {originalItem.price}
                </div>
                <div>{originalItem.count}EA</div>
                <div>{originalItem.departs}</div>
                <div>
                  {originalItem.Images?.map((image) => (
                    <img
                      src={image.url}
                      alt="i"
                      key={image.url}
                      style={{ width: "80px" }}
                    />
                  ))}
                </div>
              </div>
              <div className="update_after" onClick={() => onUpdateClick(item)}>
                <div>{item.category}</div>
                <div>{item.name}</div>
                <div>{item.description}</div>
                <div>
                  {item.unit}
                  {item.price}
                </div>
                <div>{item.count}EA</div>
                <div>{item.departs}</div>
                <div>
                  {item.Images?.map((image) => (
                    <img
                      src={image.url}
                      alt="i"
                      key={image.url}
                      style={{ width: "80px" }}
                    />
                  ))}
                </div>
                vvv
              </div>
            </div>
            {/* <div className="btns">
              <button onClick={() => onUpdateClick(item)}>수정</button>
              <button onClick={() => toggleModal("")}>취소</button>
            </div> */}
          </div>
        </div>
      ) : undefined}
    </div>
  );
};

export default ModalForm;
