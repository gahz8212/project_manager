import { ActionType } from "typesafe-actions";
import { ItemData } from "../../lib/api/item";
import * as actions from "./actions";
export type itemState = {
  loading: boolean;
  item: ItemData;
  error: string;
  status: string;
  images: { url: string }[] | null;
};
export type itemAction = ActionType<typeof actions>;
