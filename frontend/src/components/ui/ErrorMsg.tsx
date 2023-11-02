import { cn } from "../../utils/utils";

export const ErrorMsg = ({ errorMsg, className }: { errorMsg: string, className?: string }) => {
	return <span className={cn('text-error absolute -top-5 right-1 text-xs', className)}>{errorMsg}</span>;
};
