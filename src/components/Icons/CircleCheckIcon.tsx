import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export const CircleCheckIcon = (props: Omit<FontAwesomeIconProps, "icon">) => {
  return (
    <FontAwesomeIcon
      icon={faCircleCheck}
      {...props}
    />
  );
};
