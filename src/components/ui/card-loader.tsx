import React from 'react'
import { Card } from './card'
import { Skeleton } from './skeleton'

const CardLoader = () => {
    return (
        <div className="mx-10 mt-4">
            <h1 className="text-2xl font-bold">Categories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <Card key={index} className="flex flex-col space-y-3 w-full max-w-xs">
                        <Skeleton className="h-[125px] w-full rounded-t-lg bg-gray-300" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full bg-gray-300" />
                            <Skeleton className="h-4 w-full bg-gray-300" />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default CardLoader