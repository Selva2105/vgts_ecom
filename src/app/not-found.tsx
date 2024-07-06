'use client';

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

const NotFound = () => {
    const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center bg-background">
      <div className="mx-auto max-w-md text-center">
        <Image src="/images/not-found.jpg" alt="404 Error" width={450} height={450} className="mx-auto" />
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">Oops, page not found!</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist. But don&apos;t worry, you can find plenty of other great content on our
          site.
        </p>
        <div className="mt-6">
          <Button
            onClick={() => router.push('/')}
            className="inline-flex items-center rounded-md bg-primary p-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Go to Homepage
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound