import { ActionType } from "typesafe-actions";
import { ItemData, ListData, SearchData } from "../../lib/api/list";
import * as actions from "./actions";
export type listState = {
  list: ListData;
  item: ItemData | null;
  loading: boolean;
  error: Error | null;
  search: SearchData;
};
export type listAction = ActionType<typeof actions>;
