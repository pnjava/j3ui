import * as React from "react";
import { Upload } from "lucide-react";
import Dropzone, {
  type DropzoneProps,
  type FileRejection,
} from "react-dropzone";
import { toast } from "sonner";
import { cn } from "../../lib/utils";
import { useControllableState } from "../../hooks/useControllableState";
import { FileCard } from "./fileCard";
import { useFormContext } from "react-hook-form";

interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: File[];
  onValueChange?: (files: File[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
  progresses: Record<string, number>;
  accept?: DropzoneProps["accept"];
  maxSize?: number;
  maxFileCount?: number;
  multiple?: boolean;
  disabled?: boolean;
  planId?: string;// Make `planId` optional as we are using this component on Admin Settings page
  hideUploader?: boolean;// New prop to control whether the dropzone is shown
  prefix?: string;// New prop for file preview folder prefix
  hidePreviews?: boolean;// New prop to hide the preview section (Admin Settings - User Management)
  fieldName?: string;// New prop to allow scrolling to this element when there's a validation error
}

// Helper function to generate a unique preview path.
// If there's a collision among already-added files, append a "-XX" suffix.
export const getUniquePreview = (
  prefix: string,
  file: File,
  existingPaths: string[]
): string => {
  const base = file.name.replace(/(\.\w+)?$/, "");
  const ext = file.name.slice(base.length);
  let candidate = `${prefix}${file.name}`;
  let counter = 1;
  while (existingPaths.includes(candidate)) {
    const suffix = counter.toString().padStart(2, "0");
    candidate = `${prefix}${base}-${suffix}${ext}`;
    counter++;
  }
  return candidate;
}

export function FileUploader({
  value: valueProp,
  onValueChange,
  onUpload,
  progresses,
  accept = { "image/*": [] },
  maxSize = 2 * 1024 * 1024,
  maxFileCount = 1,
  multiple = false,
  disabled = false,
  className,
  prefix = "",
  hideUploader = false,
  hidePreviews = false,
  fieldName = "documentationFiles",
  ...dropzoneProps
}: FileUploaderProps) {
  // 1) controllable files state
  const [files, setFiles] = useControllableState<File[]>({
    prop: valueProp,
    onChange: onValueChange,
  });

  // 2) try to grab trigger from RHF, or fallback to no-op
  let trigger: (name?: string | string[]) => Promise<boolean>;
  try {
    const form = useFormContext();
    trigger = form.trigger;
  } catch {
    trigger = async () => true;
  }

  // 3) handle new drops
  const onDrop = React.useCallback(
    (accepted: File[], rejected: FileRejection[]) => {
      // enforce single-file if needed
      if (!multiple && maxFileCount === 1 && accepted.length > 1) {
        return toast.error("Cannot upload more than 1 file at a time");
      }
      if ((files?.length || 0) + accepted.length > maxFileCount) {
        return toast.error(`Cannot upload more than ${maxFileCount} files`);
      }

      const existingPaths = files?.map((f: any) => f.preview) ?? [];
      const newFiles = accepted.map((file) =>
        Object.assign(file, { preview: getUniquePreview(prefix, file, existingPaths) })
      );

      const updated = [...(files || []), ...newFiles];
      setFiles(updated);

      rejected.forEach(({ file }) =>
        toast.error(`File ${file.name} rejected`)
      );

      if (onUpload && newFiles.length) {
        const target =
          newFiles.length > 0
            ? `${newFiles.length} file${newFiles.length > 1 ? "s" : ""}`
            : "file";
        toast.promise(onUpload(newFiles), {
          loading: `Uploading ${target}...`,
          success: () => `${target} uploaded`,
          error: `Failed to upload ${target}`,
        });
      }

      // re-run validation on your field
      trigger(fieldName);
    },
    [files, maxFileCount, multiple, onUpload, setFiles, prefix, trigger, fieldName]
  );

  // 4) handle removals
  const onRemove = React.useCallback(
    (idx: number) => {
      const next = files?.filter((_, i) => i !== idx) ?? [];
      setFiles(next);
      onValueChange?.(next);
      trigger(fieldName);
    },
    [files, setFiles, onValueChange, trigger, fieldName]
  );

  // 5) revoke previews on unmount
  React.useEffect(() => {
    return () => {
      files?.forEach((f: any) => {
        if (typeof f.preview === "string") URL.revokeObjectURL(f.preview);
      });
    };
  }, [files]);

  const isDisabled = disabled || (files?.length ?? 0) >= maxFileCount;
  const { onError, ...safeDropzoneProps } = dropzoneProps;
  return (
    <div className={cn("relative flex flex-col gap-6 overflow-hidden", className)}>
      {!hideUploader && (
        <Dropzone
          onDrop={onDrop as any}
          accept={accept}
          maxSize={maxSize}
          maxFiles={maxFileCount}
          multiple={multiple}
          disabled={isDisabled}
          {...safeDropzoneProps}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={cn(
                "group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isDragActive && "border-muted-foreground/50",
                isDisabled && "pointer-events-none opacity-60",

              )}
            >
              <input id={fieldName} {...getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <div className="rounded-full border p-3">
                  <Upload className="text-muted-foreground size-7" />
                </div>
                {isDragActive ? (
                  <p className="font-medium text-muted-foreground">
                    Drop the files here
                  </p>
                ) : (
                  <>
                    <p className="font-medium text-muted-foreground">
                      Choose a file to upload and attach
                    </p>
                    <p className="text-sm text-muted-foreground/70">
                      {Object.values(accept).join(", ").toUpperCase() || "CSV, XLSX, XLSM, PDF"} format(s), up to 5 MB.
                      Maximum of {maxFileCount} file(s) can be attached.
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </Dropzone>
      )}

      {!hidePreviews && (
        <>
          {files && files.length ? (
            <div className="flex flex-col gap-4">
              {files.map((file, idx) => (
                <FileCard
                  key={((file as any).preview) || idx}
                  file={file}
                  onRemove={() => onRemove(idx)}
                  progress={progresses[file.name]}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-sm text-muted-foreground my-6">
              No files available for download.
            </div>
          )}
        </>
      )}
    </div>
  );
}
