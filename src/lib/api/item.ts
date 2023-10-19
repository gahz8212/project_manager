import client from "./client";
export const inputImage = (images: FormData) => {
  // console.log(images);
  return client.post("/post/images", images);
};
export const inputItem = (item: ItemData) => {
  // console.log(item);
  return client.post("/post/item", item);
};
export const relate = (itemId: RelData) => {
  // console.log('itemData',itemId)
  return client.post("/relation", itemId);
};
export const getRelate = () => {
  // console.log('getRelate')
  return client.get(`/getRelation`);
};
export type ItemData = {
  category: string;
  name: string;
  description: string;
  unit: string;
  price?: number;
  departs: { depart: string; count: number }[];
  use: boolean;

  images?: { url: string }[] | null;
};
export type RelData = {
  targetId: number[];
  sourceId: number[];
};
