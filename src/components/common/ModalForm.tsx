import React from "react";
import { ItemData_list } from "../../lib/api/list";
type Props = {
  id: number;
  item: ItemData_list;
  visible: boolean;
  toggleModal: () => void;
  onRemoveClick: (id: number) => void;
  onUpdateClick: (item: ItemData_list) => void;
  // data: ItemData;
};
const ModalForm: React.FC<Props> = ({
  id,
  item,
  visible,
  toggleModal,
  onRemoveClick,
  // data,
}) => {
  return (
    <div>
      {visible && (
        <div className="modalblock">
          <div className="confirm">
            <div>{id}</div>
            <div>{item.name}</div>
            <div className="btns">
              <button onClick={() => onRemoveClick(id)}>삭제</button>
              <button onClick={toggleModal}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalForm;
