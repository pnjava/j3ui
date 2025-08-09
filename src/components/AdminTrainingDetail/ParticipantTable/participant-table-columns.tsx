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
import { Training } from "../../../lib/types/Training";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown";
import { cn } from "../../../lib/utils";
import { EnrollmentData } from "@/components/UserEnrollment";
import { IParticipant } from "../TrainingTable/training-table";

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

export const getParticipantColumns = (): // handleEdit: (id: string) => void,
// handleDelete: (id: string) => void,
// triggerView: (id: string) => void,
// triggerApprove: (id: string, type: string) => void
ColumnDef<IParticipant>[] => [
  // { accessorKey: "id", header: "ID", enableSorting: true },
  { accessorKey: "email", header: "Email", enableSorting: true },
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      return `${firstName} ${lastName}`;
    },
    enableSorting: true,
  },
  { accessorKey: "age", header: "Age", enableSorting: true },
  { accessorKey: "zip", header: "Zip", enableSorting: true },
  { accessorKey: "gender", header: "Gender", enableSorting: true },
  { accessorKey: "race", header: "Race", enableSorting: true },
  {
    accessorKey: "naloxoneDispensed",
    header: "Naloxone Dispensed?",
    cell: ({ row }) => {
      const naloxone = row.original.naloxoneDispensed;
      const badgeBgColor =
        naloxone === "Y"
          ? "green-600"
          : naloxone === "N"
          ? "red-600"
          : "gray-600";
      return (
        <div className="flex justify-center w-full">
          <div
            className={`px-2 py-2 bg-${badgeBgColor} w-[35px] rounded-3xl flex justify-center items-center`}
          >
            <div className="text-center text-white text-xs font-medium">
              {naloxone}
            </div>
          </div>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "kitsDistributed",
    header: "Kits Distributed?",
    cell: ({ row }) => {
      const kit = row.original.kitsDistributed;
      const badgeBgColor =
        kit === "Y" ? "green-600" : kit === "N" ? "red-600" : "gray-600";
      return (
        <div className="flex justify-center w-full">
          <div
            className={`px-2 py-2 bg-${badgeBgColor} w-[35px] rounded-3xl flex justify-center items-center`}
          >
            <div className="text-center text-white text-xs font-medium">
              {kit}
            </div>
          </div>
        </div>
      );
    },
    enableSorting: true,
  },
  // {
  //   accessorKey: "actions",
  //   header: "",
  //   cell: ({ row }) => (
  //     <NavigateButton
  //       row={row}
  //       handleEdit={handleEdit}
  //       handleDelete={handleDelete}
  //       triggerView={triggerView}
  //       triggerApprove={triggerApprove}
  //     />
  //   ),
  // },
];
