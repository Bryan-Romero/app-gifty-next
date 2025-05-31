"use client";

import { UserGiphy } from "@/types";
import { Avatar, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface UserSectionProps extends UserGiphy {
  className?: string;
}

export const UserSection = ({
  display_name,
  username,
  avatar_url,
  description,
  className,
}: UserSectionProps) => {
  const [read, setRead] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = descriptionRef.current;
    if (el) {
      setIsOverflowing(el.scrollHeight > 80); // 80px = altura máxima estimada para 3-4 líneas
    }
  }, [description]);

  return (
    <Card
      className={twMerge(
        "w-full md:max-w-[340px]",
        read || !isOverflowing ? "h-fit" : "max-h-40",
        className
      )}
    >
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={avatar_url}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {display_name ? display_name : "No name"}
            </h4>

            <h5 className="text-small tracking-tight text-default-400">
              {username ? `@${username}` : "No username"}
            </h5>
          </div>
        </div>
      </CardHeader>

      {description && (
        <>
          <CardBody
            className={twMerge(
              "px-3 py-0 text-small text-default-400 overflow-hidden hidden md:flex",
              !isOverflowing && "pb-3"
            )}
          >
            <p
              ref={descriptionRef}
              className={twMerge(
                "transition-all duration-300",
                !read && "line-clamp-3"
              )}
            >
              {description}
            </p>
          </CardBody>

          {isOverflowing && (
            <CardFooter className="gap-3 hidden md:flex justify-center ">
              <button
                onClick={() => setRead((prevState) => !prevState)}
                className="bg-transparent text-sm font-medium"
              >
                read {read ? "less" : "more"}
              </button>
            </CardFooter>
          )}
        </>
      )}
    </Card>
  );
};
