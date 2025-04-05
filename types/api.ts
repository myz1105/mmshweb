import { addToast } from "@heroui/toast";
import { title } from "process";

export const BaseAddressAPI = "http://194.93.26.143:2035/api/";
export const BaseAddress = "http://194.93.26.143:2035/";
export const YandexMapUri =
  "https://suggest-maps.yandex.ru/v1/suggest?types=province,locality&print_address=1&apikey=a7296173-3647-4be5-9397-bc88c03ce61c&text=";
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

// Define the structure of the distance object
interface Distance {
  text: string; // Localized representation
  value: number; // Distance in meters
}

// Define the structure of the address component
interface AddressComponent {
  name: string; // Address component name
  kind: string; // Address component type
}

// Define the structure of the address object
interface Address {
  address: string; // Object's address
  formatted_address: string; // Formatted address
  component: AddressComponent[]; // Array of address components
}

// Define the structure of the result object
export interface Result {
  title: string; // Object name
  text: string; // Object name
  hl: string; // Highlighted fragment
  begin: number; // Start index for highlighting
  end: number; // End index for highlighting
  subtitle?: string; // Additional object name (optional)
  tags: string[]; // Object type tags
  distance?: Distance; // Distance to the object (optional)
  address: Address; // Address object
  uri: string; // Additional information about the object
}

// Define the structure of the API response
interface YandexMapResponse {
  results?: Result[]; // Array of results
}

// Example of using the type in a function
export const getPlaces = async (query: string): Promise<YandexMapResponse> => {
  if (!query) return { results: [] };
  try {
    const response = await fetch(`${YandexMapUri}${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: YandexMapResponse = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data from Yandex API:", error);
    return { results: [] }; // Return an empty results array in case of an error
  }
};
