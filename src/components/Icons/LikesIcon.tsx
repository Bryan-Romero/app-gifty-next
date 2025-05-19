import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fafullHeart } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export const LikeIcon = (props: Omit<FontAwesomeIconProps, "icon">) => {
  return (
    <FontAwesomeIcon
      icon={fafullHeart}
      {...props}
    />
  );
};

export const NotLikeIcon = (props: Omit<FontAwesomeIconProps, "icon">) => {
  return (
    <FontAwesomeIcon
      icon={faHeart}
      {...props}
    />
  );
};
