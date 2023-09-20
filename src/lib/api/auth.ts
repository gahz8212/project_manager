import client from "./client";
export const login = (data: authData) => {
  console.log("loginData", data);
  return client.post("/auth/login", data);
};
export const join = (data: authData) => {
  console.log("joinData", data);
  return client.post("/auth/join", data);
};
export const check = () => client.get("/auth/check");
export const logout = () => client.get("/auth/logout");
export const getUsers = () => {
  return client.get("/auth/getUsers");
};
export type authData = {
  email: string;
  password: string;
  name?: string;
  rank?: string;
};
