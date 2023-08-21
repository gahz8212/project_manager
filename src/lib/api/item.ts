import client from "./client";
export const inputImage = (images: FormData) => {
  console.log(images);
  // return client.post("/images", image);
};
export const inputItem = (item: ItemData) => {
  console.log(item);
  // return client.post("/item", item);
};
export type ItemData = {
  category: string;
  name: string;
  description: string;
  unit: string;
  price: number;
  departs: string;
  use: boolean;
  images: { url: string }[] | null;
};
