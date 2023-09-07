import React from "react";
// import { ItemData } from "../../lib/api/item";
type Props = {
  id: number;
  visible: boolean;
  toggleModal: () => void;
  onRemoveClick: (id: number) => void;
  // data: ItemData;
};
const ModalForm: React.FC<Props> = ({
  id,
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
            <div>선택한 아이템이 삭제됩니다.</div>
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
