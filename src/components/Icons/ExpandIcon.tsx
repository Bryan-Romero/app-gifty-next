import { faExpand } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export const ExpandIcon = (props: Omit<FontAwesomeIconProps, "icon">) => {
  return (
    <FontAwesomeIcon
      icon={faExpand}
      {...props}
    />
  );
};
