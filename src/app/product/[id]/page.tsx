import React from 'react';
import ProductDetails from './ProductDetails';

const ProductPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;

    return (
        <>
            <ProductDetails productId={id} />
        </>
    );
};

export default ProductPage;