import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export const CircleExclamationIcon = (
  props: Omit<FontAwesomeIconProps, "icon">
) => {
  return (
    <FontAwesomeIcon
      icon={faCircleExclamation}
      {...props}
    />
  );
};
