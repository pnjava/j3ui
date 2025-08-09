import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import {
  ChevronRight,
  EllipsisVertical,
  Pencil,
  Eye,
  Trash,
  UserCircle,
} from "lucide-react";
import { PlanOverviewSectionBadge } from "../../custom-ui/PlanOverviewSectionBadge";
import { Training } from "../../../lib/types/Training";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown";
import { cn } from "../../../lib/utils";

const NavigateButton = ({
  row,
  handleEdit,
  handleDelete,
  triggerView,
  triggerUserEnrollment,
}: {
  row: any;
  handleEdit: (id) => void;
  handleDelete: (id) => void;
  triggerView: (id) => void;
  triggerUserEnrollment: (id) => void;
}) => {
  const navigate = useNavigate();
  const { id } = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <EllipsisVertical className="ml-1 inline" strokeWidth={3} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className={cn("px-4 py-2 hover:bg-gray-100")}>
          <Button
            variant="ghost"
            // size="icon"
            onClick={() => triggerView(id)}
          >
            <Eye className="ml-1 inline" strokeWidth={1} /> View
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className={cn("px-4 py-2 hover:bg-gray-100")}>
          <Button
            variant="ghost"
            // size="icon"
            onClick={() => handleEdit(id)}
          >
            <Pencil className="ml-1 inline" strokeWidth={1} /> Edit
          </Button>
        </DropdownMenuItem>
        {/* <DropdownMenuItem className={cn("px-4 py-2 hover:bg-gray-100")}>
          <Button
            variant="ghost"
            // size="icon"
            onClick={() => triggerUserEnrollment(id)}
          >
            <UserCircle className="ml-1 inline" strokeWidth={1} /> User
            Enrollment
          </Button>
        </DropdownMenuItem> */}
        <DropdownMenuItem className={cn("px-4 py-2 hover:bg-gray-100")}>
          <Button
            variant="ghost"
            // size="icon"
            onClick={() => handleDelete(id)}
          >
            <Trash className="ml-1 inline" strokeWidth={1} /> Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const getTrainingColumns = (
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
  triggerView: (id: string) => void,
  triggerUserEnrollment: (id: string) => void
): ColumnDef<Training>[] => [
  { accessorKey: "id", header: "Training ID", enableSorting: true },
  { accessorKey: "title", header: "Training Name", enableSorting: true },
  // { accessorKey: "trainerId", header: "Trainer ID", enableSorting: true },
  // { accessorKey: "trainerName", header: "Trainer Name", enableSorting: true },
  { accessorKey: "startDate", header: "Start Date", enableSorting: true },
  {
    accessorKey: "format",
    header: "Training Format",
    cell: ({ row }) => {
      const formatOptions = {
        Virtual: "Virtual (Zoom Link)",
        InPerson: "In-Person (Address)",
        Hybrid: "Hybrid",
      };

      return formatOptions[row.original.format];
    },
  },
  {
    accessorKey: "location",
    header: "Location of Training",
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Approval Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const badgeBgColor =
        status === "Approved"
          ? "green-600"
          : status === "Not Approved"
          ? "red-600"
          : status === "Waiting Approval"
          ? "yellow-500"
          : "white";
      return (
        <div
          className={`px-2 py-2 bg-${badgeBgColor} max-w-[120px] rounded-3xl flex justify-center items-center`}
        >
          <div className="text-center text-gray-900 text-xs font-medium">
            {status}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => (
      <NavigateButton
        row={row}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        triggerView={triggerView}
        triggerUserEnrollment={triggerUserEnrollment}
      />
    ),
  },
];
