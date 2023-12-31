import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
export type userState = {
  user: { id: number; name: string; rank: string } | null;
  error: Error | null;
  userList: { id: number; name: string; rank: string }[];
};
export type userAction = ActionType<typeof actions>;
