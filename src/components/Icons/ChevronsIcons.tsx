import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export const ChevronRightIcon = (props: Omit<FontAwesomeIconProps, "icon">) => {
  return (
    <FontAwesomeIcon
      icon={faChevronRight}
      {...props}
    />
  );
};
export const ChevronLeftIcon = (props: Omit<FontAwesomeIconProps, "icon">) => {
  return (
    <FontAwesomeIcon
      icon={faChevronLeft}
      {...props}
    />
  );
};
