import { faFacebook, faLinkedin, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export const FacebookIcon = (props: Omit<FontAwesomeIconProps, 'icon'>) => {
  return <FontAwesomeIcon icon={faFacebook} {...props} />
}

export const WhatsappIcon = (props: Omit<FontAwesomeIconProps, 'icon'>) => {
  return <FontAwesomeIcon icon={faWhatsapp} {...props} />
}

export const XTwitterIcon = (props: Omit<FontAwesomeIconProps, 'icon'>) => {
  return <FontAwesomeIcon icon={faXTwitter} {...props} />
}

export const LinkedinIcon = (props: Omit<FontAwesomeIconProps, 'icon'>) => {
  return <FontAwesomeIcon icon={faLinkedin} {...props} />
}
