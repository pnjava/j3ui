import * as React from "react";
import {
  Pagination as BasePagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../../components/ui/pagination";

interface PaginationProps {
  currentPage: number; // 0-indexed
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const getPaginationItems = (
  current: number,
  total: number
): (number | "ellipsis")[] => {
  const pages: (number | "ellipsis")[] = [];
  if (total <= 7) {
    for (let i = 0; i < total; i++) {
      pages.push(i);
    }
    return pages;
  }
  pages.push(0);
  if (current > 3) {
    pages.push("ellipsis");
  }
  let start = Math.max(1, current - 1);
  let end = Math.min(total - 2, current + 1);
  if (current <= 3) {
    start = 1;
    end = 3;
  }
  if (current >= total - 4) {
    start = total - 4;
    end = total - 2;
  }
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (current < total - 4) {
    pages.push("ellipsis");
  }
  pages.push(total - 1);
  return pages;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const pages = getPaginationItems(currentPage, totalPages);
  return (
    <BasePagination className={className}>
      <PaginationContent>
      <PaginationPrevious
        onClick={() => onPageChange(Math.max(currentPage - 1, 0))}
        {...({ disabled: currentPage === 0, className: "cursor-pointer" } as any)}
      />
        {pages.map((item, idx) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis className="cursor-pointer" />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                isActive={item === currentPage}
                onClick={() => onPageChange(item)}
                className="cursor-pointer"
              >
                {item + 1}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationNext
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages - 1))}
          {...({ disabled: currentPage === totalPages - 1, className: "cursor-pointer" } as any)}
        />
      </PaginationContent>
    </BasePagination>
  );
};
