import * as React from "react";
import { toast } from "sonner";
import { getUploadUrl, uploadFileToUrl } from "../services/UploadService";
import { getErrorMessage } from "../lib/handleError";

interface UseUploadFileOptions {
  onUploadBegin?: () => void;
  onUploadProgress?: (data: { file: File; progress: number }) => void;
  skipPolling?: boolean;
  defaultUploadedFiles?: any[];
}

export function useUploadFile(
  endpoint: string,
  { defaultUploadedFiles = [], ...props }: UseUploadFileOptions = {}
) {
  const [uploadedFiles, setUploadedFiles] =
    React.useState<any[]>(defaultUploadedFiles);
  const [progresses, setProgresses] = React.useState<Record<string, number>>(
    {}
  );
  const [isUploading, setIsUploading] = React.useState(false);

  async function onUpload(files: File[]) {
    setIsUploading(true);
    try {
      const responses = await Promise.all(
        files.map(async (file) => {
          const uploadUrl = await getUploadUrl(endpoint, file);
          await uploadFileToUrl(file, uploadUrl, (progress) => {
            setProgresses((prev) => ({ ...prev, [file.name]: progress }));
            if (props.onUploadProgress) {
              props.onUploadProgress({ file, progress });
            }
          });
          return { fileName: file.name, uploadUrl };
        })
      );
      setUploadedFiles((prev) => [...prev, ...responses]);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setProgresses({});
      setIsUploading(false);
    }
  }

  return {
    onUpload,
    uploadedFiles,
    progresses,
    isUploading,
  };
}
