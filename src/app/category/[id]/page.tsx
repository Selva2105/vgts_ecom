import React from 'react';
import CategoryDetails from './CategoryDetails';

const CategoryPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;

    return (
        <>
            <CategoryDetails categoryId={id} />
        </>
    );
};

export default CategoryPage;