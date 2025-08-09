import { toast } from "sonner";
import * as restService from "../services/RestService";
import { AxiosResponse } from "axios";

/**
 * Gets an upload URL for the given file.
 */
export async function getUploadUrl(
  endpoint: string,
  file: File
): Promise<string> {
  const payload = {
    fileName: (file as any).preview, // Assumes the file already has a preview property
    fileType: file.type || "text/plain",
    metadata: {},
    tags: {},
  };

  const response: AxiosResponse = await restService.call("POST", endpoint, payload)
  const responseData = response.data;

  if (!responseData.uploadURL) {
    throw new Error("No upload URL returned");
  }
  return responseData.uploadURL;
}

/**
 * Uploads the file to the given upload URL.
 */
export async function uploadFileToUrl(
  file: File,
  uploadUrl: string,
  onUploadProgress?: (progress: number) => void
) {
  const resp: AxiosResponse = await restService.call("PUT", uploadUrl, file, undefined, {
    headers: {
      'Content-Type': file.type,
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        onUploadProgress?.(progress);
      }
    },
  });
  if ('error' in resp) {
    toast.error('Upload failed');
    throw resp.error;
  }
  return resp;
}

/**
 * Downloads a file by calling the download endpoint.
 */
export async function downloadFile(file: File) {
  try {
    // Determine the full S3 key from the file object
    const fullPath = (file as any).Key || (file as any).preview || file.name;
    // Extract only the base filename (everything after the last "/")
    const simpleFileName = fullPath.split("/").pop() || fullPath;

    // Request the download URL from your API (which returns a signed URL)
    const response: AxiosResponse = await restService.call("POST", process.env.VITE_DOWNLOAD_URL, {
      fileName: fullPath, // Pass the full S3 key so the Lambda can generate the correct URL
    });
    if ('error' in response) {
      throw response.error;
    }
    const url = response.data.downloadUrl as string;

    // Fetch the file data as a Blob from the signed URL
    const fileResponse: AxiosResponse = await restService.call("GET", url, undefined, undefined, {
      responseType: "blob"
    });
    if ('error' in fileResponse) {
      throw fileResponse.error;
    }

    // Create a Blob URL from the file Blob
    const blobUrl = window.URL.createObjectURL(fileResponse.data);

    // Create an anchor element and trigger the download using the Blob URL
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = simpleFileName; // This will be used as the filename
    document.body.appendChild(a);
    a.click();
    a.remove();

    // Clean up the Blob URL
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
    toast.error("Download failed");
  }
}



export async function getAllFiles(directory?: string): Promise<any> {
  const response: AxiosResponse = await restService.call("POST",
    `${process.env.VITE_GET_FILES_BY_DIRECTORY_URL}`,
    {
      directory: directory || '',
    },
  );
  if ('error' in response) {
    throw response.error;
  }
  return response.data;
}
