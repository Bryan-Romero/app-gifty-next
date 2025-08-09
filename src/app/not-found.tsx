'use client'

import { Button, Card, CardBody, CardFooter, CardHeader, Link } from '@heroui/react'

import { FaceFrownIcon } from '@/components/Icons'
import { NavbarMinimal } from '@/components/Navbar/minimal/NavbarMinimal'

export default function NotFound() {
  //IDWVaONxBtkcPOd6pc
  return (
    <>
      <NavbarMinimal />
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <Card className="max-w-md gap-2 p-4" shadow="md">
          <CardHeader className="flex justify-center">
            <FaceFrownIcon color="#ef4444" size="6x" />
          </CardHeader>

          <CardBody>
            <h1 className="mb-2 text-center text-3xl font-bold">404 - Page Not Found</h1>
            <p className="text-center text-gray-600">
              Sorry, the page you are looking for does not exist or has been moved.
            </p>
          </CardBody>

          <CardFooter className="flex justify-center">
            <Button as={Link} color="primary" href="/" variant="solid">
              Go to Homepage
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
