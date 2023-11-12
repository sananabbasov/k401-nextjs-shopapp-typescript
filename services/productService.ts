interface Slider {
  id: number,
  product_name: string,
  price: number,
  photo_url: string
}


export async function getProducts(page: number): Promise<any> {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const response = await fetch(`https://localhost:7037/api/v1/Product/getall?page=${page}`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; // Rethrow the error to handle it at the caller level
  }
}

export async function getFeaturedProducts(): Promise<Slider[]>  {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const response = await fetch(`https://localhost:7037/api/v1/Product/featured`);
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