import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export const DownloadIcon = (props: Omit<FontAwesomeIconProps, 'icon'>) => {
  return <FontAwesomeIcon icon={faDownload} {...props} />
}
