import { addToast } from "@heroui/toast";
import { title } from "process";

export const BaseAddressAPI = "http://mmsh.digital/api/";
export const BaseAddress = "http://mmsh.digital/";
export const YandexMapUri =
  "https://suggest-maps.yandex.ru/v1/suggest?types=province,locality&print_address=1&apikey=a7296173-3647-4be5-9397-bc88c03ce61c&text=";
export const GeoCodeMapUri =
  "https://geocode-maps.yandex.ru/v1/?apikey=a12cdf2e-a3e5-463a-abf5-266c234dc626&results=1&format=json&geocode=";
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
export interface Address {
  countryCode?: string;
  formatted_address: string; // Formatted address
  component: AddressComponent[]; // Array of address components
  latitude?: string;
  longitude?: string;
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

export const getGeoPlaces = async (query: string): Promise<any> => {
  const address = query;
  const baseUrl = "https://geocode-maps.yandex.ru/v1/";
  const apiKey = "a12cdf2e-a3e5-463a-abf5-266c234dc626";
  const params = new URLSearchParams({
    apikey: apiKey,
    geocode: address,
    results: "1",
    lang: "ru_RU", // Use Russian for better local parsing
    format: "json",
  });
  if (!query) return null;
  try {
    const url = `${baseUrl}?${params.toString()}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const res = extractGeoData(data);
    return res;
  } catch (error) {
    console.error("Error fetching data from Yandex API:", error);
    return null;
  }
};

function extractGeoData(data: any): Address | null {
  try {
    const feature =
      data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject;
    if (!feature) throw new Error("GeoObject not found");

    const address = feature?.metaDataProperty?.GeocoderMetaData?.Address;
    const point = feature?.Point;

    if (!address || typeof address !== "object") {
      throw new Error("Invalid or missing address");
    }

    if (!point || typeof point.pos !== "string") {
      throw new Error("Invalid or missing point");
    }

    const { country_code, formatted, Components } = address;
    const [longitude, latitude] = point.pos.split(" ").map(Number);

    if (
      typeof country_code !== "string" ||
      typeof formatted !== "string" ||
      !Array.isArray(Components) ||
      isNaN(latitude) ||
      isNaN(longitude)
    ) {
      throw new Error("Invalid address or point structure");
    }

    return {
      countryCode: country_code,
      formatted_address: formatted,
      component: Components,
      latitude,
      longitude,
    };
  } catch (error) {
    console.error("Failed to extract geo data:", (error as Error).message);
    return null;
  }
}
