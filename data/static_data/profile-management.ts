export let Client: any | undefined;
export const setClient = (clnt: any) => {
  Client = clnt;
};
export const getClient = () => {
  return Client;
};
export const clearClient = () => {
  Client = undefined;
};
