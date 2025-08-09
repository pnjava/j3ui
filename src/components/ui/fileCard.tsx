import { formatBytes } from "../../lib/utils";
import { downloadFile } from "../../services/UploadService";
import { Download } from "lucide-react";
import { Progress } from "./progress";

interface FileCardProps {
  file: any;
  onRemove?: () => void;
  progress?: number;
}

export function FileCard({ file, progress, onRemove }: FileCardProps) {
  const fileName =
    file.name || (file.Key ? file.Key.split("/").pop() : "Unknown File");
  const extension =
    (file.name || (file.Key ? file.Key : "")).split(".").pop()?.toUpperCase() ||
    "";
  const fileSize = file.size || file.Size || 0;

  const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await downloadFile(file);
  };

  return (
    <div className="flex-col justify-start items-start gap-2 inline-flex">
      <div className="self-stretch p-4 bg-white rounded-lg border border-[#cacbcc] flex-col justify-start items-start gap-4 flex">
        <div className="self-stretch justify-start items-center gap-4 inline-flex">
          <div className="w-12 h-12 p-2 bg-neutral-100 rounded border border-[#cacbcc] flex justify-center items-center">
            <div className="text-[#53575a] text-sm font-normal font-inter leading-7">
              {extension}
            </div>
          </div>
          <div className="grow shrink basis-0 h-[42px] flex-col justify-start items-start gap-0.5 inline-flex">
            <div className="self-stretch grow shrink basis-0 text-[#3b3e40] text-sm font-medium font-inter leading-tight">
              {fileName}
            </div>
            <div className="self-stretch grow shrink basis-0 justify-start items-center gap-2 inline-flex">
              <div className="text-[#53575a] text-sm font-normal font-inter leading-tight">
                {formatBytes(fileSize)}
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleDownload}
              className="p-2 bg-white rounded justify-center items-center flex cursor-pointer"
            >
              <div className="w-6 h-6 relative overflow-hidden">
                <Download
                  className="w-full h-full text-[#53575a]"
                  aria-hidden="true"
                />
              </div>
            </button>
          </div>
        </div>
        {progress !== undefined && <Progress value={progress} />}
      </div>
    </div>
  );
}
