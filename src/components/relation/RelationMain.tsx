import React, { useState } from "react";
import { ListData } from "../../lib/api/list";
import Item from "./Item";
import Column from "./Column";
import { COLUMN_NAMES } from "./constance";
type Props = {
  list: {}[];
  setItems: React.Dispatch<React.SetStateAction<{}[]>>;
};
const RelationMain: React.FC<Props> = ({ list, setItems }) => {
  console.log(list);
  const newItems = list.map((prev) => ({
    ...prev,
    ...{ column: COLUMN_NAMES.HEADER },
  }));

  return (
    <div>
      <Item setItems={setItems}></Item>
      {/* <Column></Column>  */}
    </div>
    //   <div className="rel_container">
    //     <div className="space"></div>
    //     <div className="rel_header">
    //       {list &&
    //         list.map((item) => (
    //           <div key={item.id} className="rel_item">
    //             <div className="item_info">
    //               <div className="category">{item.category}</div>
    //               <div className="name">{item.name}</div>
    //               <div className="price">
    //                 {item.unit}
    //                 {item.price}
    //               </div>
    //               <div className="departs">{item.departs}</div>

    //               <div className="item_image">
    //                 {item.Images && <img src={item?.Images[0]?.url} alt="" />}
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //     </div>
    //     <div className="rel_wrapper">
    //       <div className="rel_upper">upper</div>
    //       <div className="rel_current">current</div>
    //       <div className="rel_lower">lower</div>
    //     </div>
    //   </div>
  );
};

export default RelationMain;
