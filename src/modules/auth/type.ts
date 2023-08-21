import { ActionType } from "typesafe-actions";
import { AxiosError } from "axios";
import { authData } from "../../lib/api/auth";
import * as actions from "./actions";
export type authState = {
  [key: string]: {} | null;
  loading: boolean;
  auth: string;
  error: AxiosError | null;
  login: authData;
  join: authData;
};
export type authAction = ActionType<typeof actions>;
