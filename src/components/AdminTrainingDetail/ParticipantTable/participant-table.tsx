import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
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
import { useMemo, useState } from "react";

interface ParticipantTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  renderExpandedContent?: (row: TData) => React.ReactNode;
}

const PAGE_SIZE_OPTIONS = [
  { label: "Show 5 results", value: "5" },
  { label: "Show 10 results", value: "10" },
  { label: "Show 20 results", value: "20" },
  { label: "Show 30 results", value: "30" },
  { label: "Show 40 results", value: "40" },
];

export function ParticipantTable<TData, TValue>({
  columns,
  data,
  renderExpandedContent,
}: ParticipantTableProps<TData, TValue>) {
  const [expanded, setExpanded] = useState({});

  const filteredData = useMemo(() => {
    return data;
  }, [data]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: { expanded },
    onExpandedChange: setExpanded,
    getRowCanExpand: () => !!renderExpandedContent, // Allow expansion if prop is provided
  });

  return (
    <div className="rounded-md border mt-4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup, i) => (
            <TableRow
              key={`${headerGroup.id}-${i}`}
              className="bg-[#074369] hover:bg-[#074369]"
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
            table.getRowModel().rows.map((row, index) => (
              <React.Fragment key={row.id}>
                <TableRow
                  className={`select-none cursor-pointer ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </React.Fragment>
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
