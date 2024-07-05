import axios from 'axios';

export const fetchProductById = async (ProductId: number| string) => {
  try {
    const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${ProductId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};