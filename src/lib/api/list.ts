import client from "./client";

export const getList = () => client.get("/list");
export const searchList = (conditions: SearchData) =>
  client.get(`/search/${conditions}`);
export const readItem = (id: number) => client.get(`/search/${id}`);
export type SearchData = {
  category: string;
  name: string;
  description: string;
  unit: string;
  departs: string[];
  use: boolean;
};