import { useState } from "react";
import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export default function EnrolledStudentsTable({ data }) {
  const [sortField, setSortField] = useState(null);
  const [ascending, setAscending] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Sort logic
  const sortedData = (() => {
    if (!sortField) return data;
    const sorted = [...data].sort((a, b) => {
      const valA =
        sortField === "enrolledAt"
          ? new Date(a[sortField])
          : a[sortField].toLowerCase();
      const valB =
        sortField === "enrolledAt"
          ? new Date(b[sortField])
          : b[sortField].toLowerCase();
      if (valA < valB) return ascending ? -1 : 1;
      if (valA > valB) return ascending ? 1 : -1;
      return 0;
    });
    return sorted;
  })();

  const handleSort = (field) => {
    if (sortField === field) {
      if (ascending) {
        setAscending(false);
      } else {
        setSortField(null);
      }
    } else {
      setSortField(field);
      setAscending(true);
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField === field) {
      return ascending ? (
        <ArrowUp className="w-4 h-4 ml-1 inline" />
      ) : (
        <ArrowDown className="w-4 h-4 ml-1 inline" />
      );
    }
    return <ArrowUpDown className="w-4 h-4 ml-1 inline opacity-90" />;
  };

  const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(sortedData.length / pageSize);

  

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-md border border-border min-h-[370px] flex flex-col justify-between">
        <Table className="max-w-full  ">
          <TableHeader className="sticky top-0 bg-primary text-muted-foreground z-1 ">
            <TableRow>
              <TableHead className="px-4 py-4 text-center ">#</TableHead>
              <TableHead
                className="px-4 py-4 cursor-pointer"
                onClick={() => handleSort("studentName")}
              >
                Student Name <SortIcon field="studentName" />
              </TableHead>
              <TableHead
                className="px-4 py-4 cursor-pointer "
                onClick={() => handleSort("courseTitle")}
              >
                Course Title <SortIcon  field="courseTitle" />
              </TableHead>
              <TableHead
                className="px-4 py-4 cursor-pointer"
                onClick={() => handleSort("enrolledAt")}
              >
                Enrolled Date <SortIcon field="enrolledAt" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((student, index) => (
              <TableRow
                key={index}
                className="hover:bg-accent/30 transition-colors"
              >
                <TableCell className="px-4 py-4 text-center ">
                  {(page - 1) * pageSize + index + 1}
                </TableCell>
                <TableCell className="px-4 py-4">{student.studentName}</TableCell>
                <TableCell className="px-4 py-4">{student.courseTitle}</TableCell>
                <TableCell className="px-4 py-4 ">
                  {new Date(student.enrolledAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {totalPages > 1 && (
        <div className=" flex justify-center border-t-2 p-2 bg-primary/5">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={page === 1}
                  onClick={() => setPage(1)}
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {page > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (pg) =>
                    pg !== 1 &&
                    pg !== totalPages &&
                    Math.abs(pg - page) <= 1
                )
                .map((pg) => (
                  <PaginationItem key={pg}>
                    <PaginationLink
                      href="#"
                      isActive={pg === page}
                      onClick={() => setPage(pg)}
                    >
                      {pg}
                    </PaginationLink>
                  </PaginationItem>
                ))}

              {page < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {totalPages > 1 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={page === totalPages}
                    onClick={() => setPage(totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
      </div>
       
    </div>
  );
}
