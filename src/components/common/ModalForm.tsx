import React from "react";
import { ItemData } from "../../lib/api/item";
type Props = {
  id: number;
  data: ItemData;
  // visible: boolean;
  // onRemoveClick: (id: number) => void;
  // toggleModal: () => void;
};
const ModalForm: React.FC<Props> = ({
  id,
  data,
  // visible,
  // toggleModal,
  // onRemoveClick,
}) => {
  return (
    <div>
      {/* {visible && ( */}
      <div className="modalblock">
        {id}
        {/* <button onClick={() => onRemoveClick(id)}>삭제</button>
          <button onClick={toggleModal}>취소</button> */}
      </div>
      {/* )} */}
    </div>
  );
};

export default ModalForm;
