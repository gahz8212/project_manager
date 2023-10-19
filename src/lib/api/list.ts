import client from "./client";

export const getList = () => client.get("/list");
export const searchList = (conditions: SearchData) => {
  // console.log("conditions", conditions);
  return client.post(`/search/`, conditions);
};
export const readItem = (id: number) => client.get(`/read/${id}`);
export const removeItem = (id: number) => {
  // console.log("id", id);
  return client.delete(`/remove/${id}`);
};
export const updateImage = (images: FormData) => {
  // console.log(images);
  return client.post("/update", images);
};
export const updateItem = (newItem: ItemData_list) => {
  // console.log(newItem);
  return client.patch(`/update/${newItem.id}`, newItem);
};
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
  column: string;
 
  Images: { url: string }[] | null;
}[];
export type ItemData_list = {
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
};
