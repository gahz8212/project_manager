import client from "./client";

export const getList = () => client.get("/list");
export const getItem = (item: string) => client.get(`/search/:${item}`);
