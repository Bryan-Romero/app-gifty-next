import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export const MoonFilledIcon = (props: Omit<FontAwesomeIconProps, "icon">) => (
  <FontAwesomeIcon
    icon={faMoon}
    {...props}
  />
);

export const SunFilledIcon = (props: Omit<FontAwesomeIconProps, "icon">) => (
  <FontAwesomeIcon
    icon={faSun}
    {...props}
  />
);
