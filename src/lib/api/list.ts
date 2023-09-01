import client from "./client";

export const getList = () => client.get("/list");
export const searchList = (conditions: SearchData) => {
  console.log("conditions", conditions);
  return client.post(`/search/`, conditions);
};
export const readItem = (id: number) => client.get(`/search/${id}`);
export type SearchData = {
  category: string;
  name: string;
  description: string;
  unit: string;
  departs: string[];
  use: boolean;
};
export type ListData = {
  id: number;
  category: string;
  name: string;
  description: string;
  unit: string;
  price: number;
  departs: string;
  count: number;
  use: boolean;
  Images?: { url: string }[] | null;
}[];
