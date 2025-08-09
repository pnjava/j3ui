import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import {
  ChevronRight,
  EllipsisVertical,
  Pencil,
  Eye,
  Trash,
  CircleCheckBig,
  CircleX,
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
  triggerApprove,
}: {
  row: any;
  handleEdit: (id) => void;
  handleDelete: (id) => void;
  triggerView: (id) => void;
  triggerApprove: (id, type) => void;
}) => {
  const navigate = useNavigate();
  const { id, status } = row.original;

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
        <DropdownMenuItem className={cn("px-4 py-2 hover:bg-gray-100")}>
          <Button
            variant="ghost"
            // size="icon"
            onClick={() => triggerApprove(id, "Approved")}
            disabled={status === "Approved"}
          >
            <CircleCheckBig className="ml-1 inline" strokeWidth={1} /> Approve
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className={cn("px-4 py-2 hover:bg-gray-100")}>
          <Button
            variant="ghost"
            // size="icon"
            onClick={() => triggerApprove(id, "Not Approved")}
            disabled={status === "Not Approved"}
          >
            <CircleX className="ml-1 inline" strokeWidth={1} /> Deny
          </Button>
        </DropdownMenuItem>
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
  triggerApprove: (id: string, type: string) => void
): ColumnDef<Training>[] => [
  { accessorKey: "id", header: "ID", enableSorting: true },
  { accessorKey: "title", header: "Name", enableSorting: true },
  { accessorKey: "trainerId", header: "Trainer ID", enableSorting: true },
  { accessorKey: "trainerName", header: "Trainer Name", enableSorting: true },
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
    accessorKey: "classType",
    header: "Type of Training",
    cell: ({ row }) => {
      const typeOptions = {
        secure: "Secure",
        trainer_of_trainers: "Trainer of Trainers",
      };

      return typeOptions[row.original.classType];
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
        triggerApprove={triggerApprove}
      />
    ),
  },
];
