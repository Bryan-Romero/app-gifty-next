import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export const XMarkIcon = (props: Omit<FontAwesomeIconProps, 'icon'>) => {
  return <FontAwesomeIcon icon={faXmark} {...props} />
}
