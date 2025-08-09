import { useLocation } from "react-router-dom";

const subheaderList: any = [
  { url: "/revive", label: "Trainer - Manage Trainings" },
  { url: "/revive/trainer/trainings", label: "Trainer - Manage Trainings" },
  {
    url: "/revive/trainer/new-training",
    label: "Trainer - Enter Training Details",
  },
  {
    url: "/revive/trainer/:trainingId/user-enrollment",
    keyword: ["revive", "user-enrollment"],
    label: "Trainer - Enter User Enrollment",
  },
  {
    url: "/revive/admin/trainings",
    label: "Program Admin - Manage Trainings",
  },
  {
    url: "/revive/admin/completion-detail",
    label: "Program Admin - Trainer Completion Details",
  },
];

export function Subheader() {
  const location = useLocation();

  const checkKeywords = (url: string, keywords: string[]) => {
    return (
      keywords.filter((kw: string) => url.includes(kw)).length ===
      keywords.length
    );
  };

  return (
    <div className="border-b border-[rgba(128,128,128,0.3)] p-4 bg-[#02796b] p-4 w-full text-white text-2xl font-bold">
      {subheaderList.find(
        (item: any) =>
          item.url === location.pathname.toLowerCase() ||
          (item.keyword &&
            checkKeywords(location.pathname.toLowerCase(), item.keyword))
      )?.label ?? "TACTS - REVIVE"}
    </div>
  );
}
