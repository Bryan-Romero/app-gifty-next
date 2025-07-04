import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { twMerge } from 'tailwind-merge'

export const MoonFilledIcon = ({ className, ...props }: Omit<FontAwesomeIconProps, 'icon'>) => (
  <FontAwesomeIcon
    className={twMerge(
      'text-gray-500 transition-colors duration-200 ease-in-out hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
      className
    )}
    icon={faMoon}
    {...props}
  />
)

export const SunFilledIcon = ({ className, ...props }: Omit<FontAwesomeIconProps, 'icon'>) => (
  <FontAwesomeIcon
    className={twMerge(
      'text-gray-500 transition-colors duration-200 ease-in-out hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
      className
    )}
    icon={faSun}
    {...props}
  />
)
