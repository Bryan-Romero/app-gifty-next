import { faFaceFrown } from "@fortawesome/free-regular-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export const FaceFrownIcon = (props: Omit<FontAwesomeIconProps, "icon">) => {
  return (
    <FontAwesomeIcon
      icon={faFaceFrown}
      {...props}
    />
  );
};
