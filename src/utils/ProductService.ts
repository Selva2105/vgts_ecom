import axios from 'axios';

export const fetchCategoryProducts = async (categoryId: number| string) => {
  try {
    const response = await axios.get(`https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

export const fetchCategoriesCall = async () => {
  try {
    const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

export const fetchProductById = async (ProductId: number| string) => {
  try {
    const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${ProductId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};