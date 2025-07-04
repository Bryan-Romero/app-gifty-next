import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export const EnvelopeIcon = (props: Omit<FontAwesomeIconProps, 'icon'>) => {
  return <FontAwesomeIcon icon={faEnvelope} {...props} />
}
