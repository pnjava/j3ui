import { StoreContext } from "../context/Store";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export interface UserManagementRequest {
  messageId: number | string;
  status: string;
  message: string;
  requestor?: string;
  requestTime?: string;
}

interface UploadResult {
  fileName: string;
  requestTime?: string;
  requestor?: string;
  message?: string;
}

export function useUserManagementFile() {
  const [progresses, setProgresses] = useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [requests, setRequests] = useState<UserManagementRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const { user } = useContext(StoreContext);
  const fetchedOnce = useRef(false);

  const fetchMessages = useCallback(async () => {
    setLoadingRequests(true);
    try {
      const resp: Response = await window?.['DBHDS']?.userManagement.getSubmitMessages();
      const body = await resp.json() as { Items: any[] };
      const all = (body.Items || []).map((item) => ({
        messageId: String(item.message_id),
        status: item.status,
        message: item.details,
        requestor: item.application,
        requestTime: item.created_by_date,
      }));
      setRequests(all);
    } catch (err) {
      console.error("Failed to load user-management messages", err);
    } finally {
      setLoadingRequests(false);
    }
  }, []);

  useEffect(() => {
    if (fetchedOnce.current) return;
    fetchedOnce.current = true;
    fetchMessages();
  }, [fetchMessages]);

  // helper to dismiss a single message both in the portal and locally
  const dismissMessage = async(messageId: number | string) => {
    try {
      await window?.['DBHDS']?.userManagement.updateSubmitMessage(Number(messageId));
      setRequests((prev) => prev.filter((r) => r.messageId !== messageId));
    } catch (err) {
      console.error("Failed to dismiss message", messageId, err);
      toast.error("Unable to dismiss message");
    }
  }

  const clearUploadResult = () => setUploadResult(null);

  async function onUpload(files: File[]) {
    setIsUploading(true);
    setUploadResult(null);

    const now = new Date().toISOString();
    const requestor = `${user.currentUser.firstName} ${user.currentUser.lastName}`;
    const file = files[0];

    try {
      const resp = await window?.['DBHDS']?.userManagement.submitUserChanges(await file.text());
      const data = await resp.json();// { message: string }

      setUploadResult({
        fileName: file.name,
        requestTime: now,
        requestor,
        message: data.message,
      });
    } catch (err: any) {
      console.error("submitUserChanges failed: ", err);
      toast.error(err.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  }

  return {
    onUpload,
    requests,
    setRequests,
    isUploading,
    progresses,
    dismissMessage,
    loadingRequests,
    refreshMessages: fetchMessages,
    uploadResult,
    clearUploadResult,
  }
}
