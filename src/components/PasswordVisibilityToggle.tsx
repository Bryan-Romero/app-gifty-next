import { EyeIcon, EyeSlashIcon } from './Icons'

interface PasswordVisibilityToggleProps {
  isVisible: boolean
  onToggle: () => void
}

export const PasswordVisibilityToggle = ({ isVisible, onToggle }: PasswordVisibilityToggleProps) => {
  return (
    <button className="cursor-pointer focus:outline-none" type="button" onClick={onToggle}>
      {isVisible ? (
        <EyeSlashIcon className="pointer-events-none" size="1x" />
      ) : (
        <EyeIcon className="pointer-events-none" size="1x" />
      )}
    </button>
  )
}
