import React from "react";
import { ListData } from "../../lib/api/list";
import Loading from "../common/loading/Loading";
type Props = {
  loading: boolean;
  list: ListData | [];
  error: Error | null;
};
const ListComponents: React.FC<Props> = ({ loading, list, error }) => {
  if (!list) return null;
  if (error) return null;
  return (
    <div>
      {loading && <Loading />}
      {list.map((item) => {
        return (
          <div>
            <div>
              <b>{item.category}</b>
              <div>
                <b>품명:{item.name}</b>
                <b>단가:{item.unit}</b>
                {item.price}
                <b>갯수:{item.count}</b>
              </div>
              <div>
                {item.departs}
                {/* {item.use} */}
              </div>
              <textarea>{item.description}</textarea>
            </div>
            <div>
              {item.Images?.map((image) => (
                <img src={image.url} alt=""></img>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListComponents;
