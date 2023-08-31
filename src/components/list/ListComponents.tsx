import React from "react";
import { ListData } from "../../lib/api/list";
import Loading from "../common/loading/Loading";

type Props = {
  loading: boolean;
  list: ListData | [];
  error: Error | null;
  children: React.ReactNode;
};
const ListComponents: React.FC<Props> = ({
  loading,
  list,
  error,
  children,
}) => {
  if (!list) return null;
  if (error) return null;
  return (
    <div>
      <div className="space"></div>
      {children}
      {loading && <Loading />}
      <div className="list-wrapper">
        {list.map((item) => {
          return (
            <div className="list-item" key={item.id}>
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
              <textarea value={item.description} readOnly></textarea>
              <div>
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
    </div>
  );
};

export default ListComponents;
