import { toast } from "sonner";
import { z } from "zod";

export function getErrorMessage(err: unknown): string {
  const unknownError = "Something went wrong, please try again later.";

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => issue.message);
    return errors.join("\n");
  } else if (err instanceof Error) {
    return err.message;
  } else {
    return unknownError;
  }
}

export function showErrorToast(err: unknown): void {
  const errorMessage = getErrorMessage(err);
  toast.error(errorMessage);
}
