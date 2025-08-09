import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Dropdown from "../../custom-ui/Dropdown";
import { Pagination } from "../../custom-ui/Pagination";
import { useMemo } from "react";

interface TrainingTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  // searchQuery: string;
}

const PAGE_SIZE_OPTIONS = [
  { label: "Show 10 results", value: "10" },
  { label: "Show 20 results", value: "20" },
  { label: "Show 30 results", value: "30" },
  { label: "Show 40 results", value: "40" },
];

export function TrainingTable<TData, TValue>({
  columns,
  data,
}: // searchQuery,
TrainingTableProps<TData, TValue>) {
  const filteredData = useMemo(() => {
    // if (!searchQuery) return data;
    return data;
  }, [data]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="rounded-md border mt-4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup, i) => (
            <TableRow
              key={`${headerGroup.id}-${i}`}
              className="bg-[#02796b] hover:bg-[#02796b]"
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-white select-none">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="bg-[#ffffff] select-none"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <h2>No results</h2>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 text-[#02796b]">
        <div className="w-60 mb-2 sm:mb-0">
          <Dropdown
            placeholder={`Show ${table.getState().pagination.pageSize} results`}
            value={`${table.getState().pagination.pageSize}`}
            options={PAGE_SIZE_OPTIONS}
            onChange={(value) => table.setPageSize(Number(value))}
          />
        </div>
        <div className="w-60 ml-2 text-center">{`${
          table.getFilteredRowModel().rows.length
        } Items`}</div>
        <Pagination
          currentPage={table.getState().pagination.pageIndex}
          totalPages={table.getPageCount()}
          onPageChange={(newPage) => table.setPageIndex(newPage)}
        />
      </div>
    </div>
  );
}
