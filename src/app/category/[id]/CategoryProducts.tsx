/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/types/product';


const CategoryProducts = ({ products }: { products: Product[] }) => {
    console.log(products)
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4">
            {products.map((product) => (
                <Card
                    className="w-full max-w-xs cursor-pointer hover:shadow-lg flex flex-col justify-between"
                    key={product.id}
                >
                    <img
                        src={product.images[0].toString()}
                        width="400"
                        height="250"
                        alt={product.category.name}
                        className="aspect-[1.6] object-cover"
                    />
                    <CardHeader className="p-4">
                        <CardTitle className="text-lg">{product.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>₹ {product.price} /-</p>
                    </CardContent>
                    <CardFooter>
                        <Button className='w-full'>
                            Add to Cart
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default CategoryProducts;