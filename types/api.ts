export const BaseAddress = "http://194.93.26.143:2035/api/";
export let Token = "";

// Function to set the token
export const setToken = (newToken: string) => {
  Token = newToken;
};

interface Client {
  id: number;
  name: string;
  surname: string;
  img: {
    id: number;
    name: string;
    img64: string;
    img128: string;
    img256: string;
    img512: string;
    priorId: number;
    prior: string;
  };
}

export let Client: Client | undefined;

// Function to set the token
export const setClient = (clnt: Client) => {
  Client = clnt;
};
