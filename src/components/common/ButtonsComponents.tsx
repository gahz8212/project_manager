import React from "react";

type Props = {
  onRead: () => void;
  onUpdate: () => void;
  onDelete: () => void;
};
const ButtonsComponents: React.FC<Props> = ({ onRead, onUpdate, onDelete }) => {
  // console.log(item.description);
  return (
    <div className="buttons">
      <button onClick={onUpdate}>수정</button>
      <button onClick={onDelete}>삭제</button>
      <button onClick={onRead}>닫기</button>
    </div>
  );
};

export default ButtonsComponents;
