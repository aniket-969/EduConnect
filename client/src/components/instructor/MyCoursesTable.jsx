import { useState, useMemo } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

export default function MyCoursesTable({ data }) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(null);
  const [ascending, setAscending] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filteredData = useMemo(() => {
    return data.filter((course) =>
      course.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;
    return [...filteredData].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === "publishedAt") {
        valA = new Date(valA);
        valB = new Date(valB);
      } else if (typeof valA === "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return ascending ? -1 : 1;
      if (valA > valB) return ascending ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortField, ascending]);

  const paginatedData = sortedData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (field) => {
    if (sortField === field) {
      setAscending(!ascending);
    } else {
      setSortField(field);
      setAscending(true);
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField === field) {
      return ascending ? (
        <ArrowUp className="inline w-4 h-4 ml-1" />
      ) : (
        <ArrowDown className="inline w-4 h-4 ml-1" />
      );
    }
    return <ArrowUpDown className="inline w-4 h-4 ml-1 opacity-30" />;
  };

  return (
    <div className="w-full space-y-4">
      <Input
        placeholder="Search by course title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="overflow-x-auto rounded-md border border-border">
        <Table className="min-w-full">
          <TableHeader className="sticky top-0 bg-muted z-10 text-muted-foreground">
            <TableRow>
              <TableHead className="px-4 py-3">#</TableHead>
              <TableHead
                onClick={() => handleSort("title")}
                className="px-4 py-3 cursor-pointer"
              >
                Course Title <SortIcon field="title" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("studentCount")}
                className="px-4 py-3 cursor-pointer"
              >
                Students <SortIcon field="studentCount" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("status")}
                className="px-4 py-3 cursor-pointer"
              >
                Status <SortIcon field="status" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("publishedAt")}
                className="px-4 py-3 cursor-pointer"
              >
                Published On <SortIcon field="publishedAt" />
              </TableHead>
              <TableHead className="px-4 py-3">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((course, index) => (
              <TableRow key={course.id} className="hover:bg-accent/30">
                <TableCell className="px-4 py-2">{(page - 1) * pageSize + index + 1}</TableCell>
                <TableCell className="px-4 py-2">{course.title}</TableCell>
                <TableCell className="px-4 py-2">{course.studentCount}</TableCell>
                <TableCell className="px-4 py-2">{course.status}</TableCell>
                <TableCell className="px-4 py-2">
                  {new Date(course.publishedAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-4 py-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, i) => {
              const pg = i + 1;
              return (
                <PaginationItem key={pg}>
                  <PaginationLink
                    href="#"
                    isActive={pg === page}
                    onClick={() => setPage(pg)}
                  >
                    {pg}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {totalPages > 5 && page < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
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
    </div>
  );
}
