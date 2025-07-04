'use client'

import { useEffect, useRef, useState } from 'react'
import { Avatar, Card, CardBody, CardFooter, CardHeader } from '@heroui/react'
import { twMerge } from 'tailwind-merge'

import { UserGiphy } from '@/types'

interface UserSectionProps extends UserGiphy {
  className?: string
}

export const UserSection = ({ display_name, username, avatar_url, description, className }: UserSectionProps) => {
  const [read, setRead] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = descriptionRef.current
    if (el) {
      setIsOverflowing(el.scrollHeight > 80) // 80px = altura máxima estimada para 3-4 líneas
    }
  }, [description])

  return (
    <Card className={twMerge('w-full md:max-w-[340px]', read || !isOverflowing ? 'h-fit' : 'max-h-40', className)}>
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={avatar_url} />
          <div className="flex flex-col items-start justify-center gap-1">
            <h4 className="text-small text-default-600 leading-none font-semibold">
              {display_name ? display_name : 'No name'}
            </h4>

            <h5 className="text-small text-default-400 tracking-tight">{username ? `@${username}` : 'No username'}</h5>
          </div>
        </div>
      </CardHeader>

      {description && (
        <>
          <CardBody
            className={twMerge(
              'text-small text-default-400 hidden overflow-hidden px-3 py-0 md:flex',
              !isOverflowing && 'pb-3'
            )}
          >
            <p ref={descriptionRef} className={twMerge('transition-all duration-300', !read && 'line-clamp-3')}>
              {description}
            </p>
          </CardBody>

          {isOverflowing && (
            <CardFooter className="hidden justify-center gap-3 md:flex">
              <button onClick={() => setRead((prevState) => !prevState)} className="bg-transparent text-sm font-medium">
                read {read ? 'less' : 'more'}
              </button>
            </CardFooter>
          )}
        </>
      )}
    </Card>
  )
}
