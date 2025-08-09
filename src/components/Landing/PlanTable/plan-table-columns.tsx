import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { ChevronRight } from "lucide-react";
import { PlanOverviewSectionBadge } from "../../../components/custom-ui/PlanOverviewSectionBadge";
import { Plan } from "../../../lib/types/Plan";

const NavigateButton = ({ row }: { row: any }) => {
  const navigate = useNavigate();
  const { individualId, planId } = row.original;

  return (
    <Button
      variant="ghost"
      onClick={() => navigate(`/dap/individuals/${individualId}/plans/${planId}`)}
    >
      <ChevronRight className="ml-1 inline" strokeWidth={3} />
    </Button>
  );
};

export const columns: ColumnDef<Plan>[] = [
  {
    accessorKey: "patientName",
    header: "Patient Name",
    cell: ({ row }) => {
      return (
        <div className="flex gap-4">
          <div className="w-[20px]">
            <strong>{Number(row.index) + 1}</strong>.
          </div>
          <div>
            {row.original.first_name} {row.original.last_name}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "dob",
    header: "DOB",
  },
  {
    accessorKey: "mrnId",
    header: "MRN ID#",
  },
  {
    accessorKey: "typeOfFunds",
    header: "Plan Type",
  },
  {
    id: "badge",
    accessorKey: "planStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status?.toLowerCase();
      return (
        <PlanOverviewSectionBadge
          status={status}
          isCustomRatePlanModification={
            row.original.isCustomRatePlanModification
          }
          planStartDate={row.original.plan_start_date}
          planEndDate={row.original.plan_end_date}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "lastActivity",
    header: "Last Activity",
    cell: ({ row }) => {
      const dateString = new Date(
        row.original.last_updated_date
      ).toDateString();
      const dateArr = dateString.split(" ");
      dateArr.shift();
      const newDate = dateArr.join(" ");
      return (
        <span>
          {newDate}{" "}
          {new Date(row.original.last_updated_date).toLocaleTimeString()}
        </span>
      );
    },
  },
  {
    accessorKey: "tbd",
    header: "",
    cell: ({ row }) => <NavigateButton row={row} />,
  },
];
