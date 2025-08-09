import { Link } from "react-router-dom";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "../ui/button";
import { cn } from "../../lib/utils";

interface LinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  disabled?: boolean;
  to: string;
  state?: object; // Add state prop
}

const LinkButton = ({ to, className, variant = 'default', disabled = false, children,state }: LinkButtonProps) => {
  return (
    <Link
      to={to}
      state={state}
      className={cn(
        buttonVariants({ variant }),
        className,
        disabled && 'pointer-events-none opacity-50',
      )}
    >
      { children }
    </Link>
  );
}

export default LinkButton;
