import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export const SearchIcon = (props: Omit<FontAwesomeIconProps, 'icon'>) => {
  return <FontAwesomeIcon icon={faMagnifyingGlass} {...props} />
}
