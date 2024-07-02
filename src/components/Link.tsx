import { LinkProps, Link as RouterLink } from "react-router-dom";

type Props = LinkProps;

const Link = ({ ...props }: Props) => {
  return (
    <RouterLink
      {...props}
      className="w-full rounded p-2 transition-colors duration-300 hover:bg-white/10"
    >
      {props.children}
    </RouterLink>
  );
};

export default Link;
