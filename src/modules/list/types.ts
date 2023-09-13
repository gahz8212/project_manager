import { ActionType } from "typesafe-actions";
import { ItemData_list, ListData, SearchData } from "../../lib/api/list";
import * as actions from "./actions";
export type listState = {
  [key: string]: {} | null;
  list: ListData;
  // item: ItemData_list | null;
  loading: boolean;
  error: Error | null;
  search: SearchData;
  originalItem: ItemData_list;
  updateImages: { url: string }[] | null;
};
export type listAction = ActionType<typeof actions>;
