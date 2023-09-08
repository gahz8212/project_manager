import { ActionType } from "typesafe-actions";
import { ItemData, ListData, SearchData } from "../../lib/api/list";
import * as actions from "./actions";
export type listState = {
  [key: string]: {} | null;
  list: ListData;
  item: ItemData;
  loading: boolean;
  error: Error | null;
  search: SearchData;
  originalItem: ItemData | null;
};
export type listAction = ActionType<typeof actions>;
