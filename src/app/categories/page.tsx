'use client';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/context/StoreContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const Categories = () => {
    const { categories, loading, error } = useStore();
    const router = useRouter();
  
    console.log(categories, loading, error);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="mx-10 mt-4">
            <h1 className="text-2xl font-bold">Categories</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {categories.map((category) => (
                    <Card
                        className="w-full max-w-xs cursor-pointer hover:shadow-lg"
                        key={category.id}
                        onClick={() => router.push(`/category/${category.id}`)}
                    >
                        <Image
                            src={category.image}
                            width="400"
                            height="250"
                            alt={category.name}
                            className="aspect-[1.6] object-cover"
                        />
                        <CardHeader className="p-4">
                            <CardTitle className="text-lg">{category.name}</CardTitle>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Categories;