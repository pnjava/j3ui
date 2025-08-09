import { useEffect, useState } from "react";
import { LoaderCircle, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router";

const FormSubmissionOverlay = ({
  loading,
  success,
  message,
  redirectUrl,
  successMessage = "Submitted successfully!",
  failureMessage = "Submission failed. Please try again."
}) => {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);
  const [status, setStatus] = useState<"loading" | "success" | "error" | null>(null);

  useEffect(() => {
    if (loading) {
      setShowOverlay(true);
      setStatus("loading");
    }
  }, [loading]);

  useEffect(() => {
    if (success !== null) {
      setTimeout(() => {
        setStatus(success ? "success" : "error");
      }, 500);

      if (success) {
        setTimeout(() => {
          if (redirectUrl === "__reload__") {
            window.location.reload();
          } else if (redirectUrl?.startsWith("http")) {
            window.location.href = redirectUrl;
          } else {
            navigate(redirectUrl);
          }
        }, 1000);        
      } else {
        setTimeout(() => {
          setShowOverlay(false);
        }, 1500);
      }
    }
  }, [success, redirectUrl]);

  if (!showOverlay) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
      {status === "loading" && (
        <div className="flex flex-col items-center">
          <LoaderCircle className="animate-spin w-10 h-10 text-blue-500" />
          <p className="mt-4">Submitting...</p>
        </div>
      )}
      {status === "success" && (
        <div className="flex flex-col items-center">
          <CheckCircle className="w-10 h-10 text-green-500" />
          <p className="mt-4">{message || successMessage}</p>
          <p className="text-gray-500 mt-2">Redirecting...</p>
        </div>
      )}
      {status === "error" && (
        <div className="flex flex-col items-center">
          <XCircle className="w-10 h-10 text-red-500" />
          <p className="mt-4">{message || failureMessage}</p>
        </div>
      )}
    </div>
  );
};

export default FormSubmissionOverlay;
