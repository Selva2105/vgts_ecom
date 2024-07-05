import React from 'react';

const CategoryHeader = ({ categoryName }: { categoryName: string }) => {
  return (
    <div className="category-header">
      <h1 className="text-2xl font-bold">{categoryName}</h1>
    </div>
  );
};

export default CategoryHeader;