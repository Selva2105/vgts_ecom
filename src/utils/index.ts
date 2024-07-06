import { CartItem } from "@/types/product";

export const getProductCount = (cart :CartItem[] ,productId: number) => {
    const cartItem = cart.find(item => item.product.id === productId);
    return cartItem ? cartItem.count : 0;
};

export const getFirstImageUrl = (images: string[]): string => {
    const cleanedString = images[0].replace(/[\[\]"]/g, '');
    const parsedImages = cleanedString.split(',');
    return parsedImages[0];
  };