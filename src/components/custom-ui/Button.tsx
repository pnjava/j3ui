import { Button as UIButton } from "../ui/button";
import { cn } from "../../lib/utils";

export const outlineButtonClasses = "h-10 px-6 py-2 rounded-md border border-[#0f172a] text-[#0f172a] text-base font-medium font-inter leading-normal hover:text-[#00689a]";
export const defaultButtonClasses = "h-10 px-6 py-2 bg-[#00689a] rounded-md hover:bg-[#0f172a]/90 text-white text-base font-medium font-inter leading-normal";

const Button = (props: any) => {
  const { variant, className, children } = props;
  const classes = variant === "outline" ? outlineButtonClasses : defaultButtonClasses;

  return (
    <UIButton {...props} className={cn(classes, className)}>
      {children}
    </UIButton>
  )
};

export default Button;
