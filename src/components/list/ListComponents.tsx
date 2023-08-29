import React from "react";
import { ItemData } from "../../lib/api/item";
import Loading from "../common/loading/Loading";
type Props = {
  loading: boolean;
  list: ItemData[] | null;
  error: Error | null;
};
const ListComponents: React.FC<Props> = ({ loading, list, error }) => {
  return <div>{loading && <Loading />}</div>;
};

export default ListComponents;
