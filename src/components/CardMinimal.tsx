'use client'

import React from 'react'
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/react'

interface CardMinimalProps {
  title: string
  body: React.ReactNode
  footer: React.ReactNode
  otherElement?: React.ReactNode
}

export const CardMinimal = ({ body, footer, title, otherElement = null }: CardMinimalProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md p-4" shadow="md">
        <CardHeader>
          <h3 className="text-lg font-semibold">{title}</h3>
        </CardHeader>

        <CardBody>{body}</CardBody>

        <CardFooter className="flex flex-row justify-end gap-3">{footer}</CardFooter>
      </Card>

      {otherElement}
    </div>
  )
}
