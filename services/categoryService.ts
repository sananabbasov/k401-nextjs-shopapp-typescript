import { Category } from "@/interfaces/Category/category";

export async function getCategories(): Promise<Category[]> {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const response = await fetch(`https://localhost:7037/api/v1/Category/getall`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(`API response indicates failure: ${data.message}`);
    }
    return data.data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; // Rethrow the error to handle it at the caller level
  }
}



export async function getNavbarCategories(): Promise<Category[]> {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const response = await fetch(`https://localhost:7037/api/v1/Category/navbar`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(`API response indicates failure: ${data.message}`);
    }
    return data.data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; // Rethrow the error to handle it at the caller level
  }
}

