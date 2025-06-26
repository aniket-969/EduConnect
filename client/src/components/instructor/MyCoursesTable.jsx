import { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import TablePagination from "./common/TablePagination";
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

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1); // Reset to first page when search or sort changes
  }, [search, sortField, ascending]);

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
    return <ArrowUpDown className="inline w-4 h-4 ml-1 opacity-90" />;
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-end">
        <Input
          placeholder="Search by course title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="overflow-x-auto rounded-md border border-border min-h-[370px] flex flex-col justify-between">
        <Table className="w-full text-center ">
          <TableHeader className="sticky top-0 bg-primary text-muted-foreground z-2 ">
            <TableRow >
              <TableHead className="px-4 py-4 text-center ">#</TableHead>
              <TableHead
                onClick={() => handleSort("title")}
                className="px-4 py-4 cursor-pointer text-left "
              >
                Course Title <SortIcon field="title" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("studentCount")}
                className="px-4 py-4 cursor-pointer text-center "
              >
                Students <SortIcon field="studentCount" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("status")}
                className="px-4 py-4 cursor-pointer text-center "
              >
                Status <SortIcon field="status" />
              </TableHead>
              <TableHead
                onClick={() => handleSort("publishedAt")}
                className="px-4 py-3 cursor-pointer text-center "
              >
                Published On <SortIcon field="publishedAt" />
              </TableHead>
              <TableHead className="px-4 py-3 text-center ">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((course, index) => (
              <TableRow
                key={course.id}
                className="hover:bg-accent/30 transition-colors"
              > 
                <TableCell className="px-4 py-2">
                  {(page - 1) * pageSize + index + 1}
                </TableCell>
                <TableCell className="px-4 py-3 max-w-[250px] whitespace-normal break-words text-left">
                  {course.title}
                </TableCell>
                <TableCell className="px-4 py-2  ">{course.studentCount}</TableCell>
                <TableCell className="px-4 py-2 capitalize">{course.status}</TableCell>
                <TableCell className="px-4 py-2">
                  {course.status === "draft" || !course.publishedAt
                    ? " - "
                    : new Date(course.publishedAt).toLocaleDateString()}
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
        {totalPages > 1 && (
                  <TablePagination page={page} setPage={setPage} totalPages={totalPages} />
                )}
      </div>

      
    </div>
  );
}
