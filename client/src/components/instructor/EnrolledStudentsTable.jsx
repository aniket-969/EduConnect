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
import TablePagination from "./common/TablePagination";


export default function EnrolledStudentsTable({ enrolledStudents }) {
  
  const [sortField, setSortField] = useState(null);
  const [ascending, setAscending] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Sort logic
  const sortedData = (() => {
    if (!sortField) return enrolledStudents;
    const sorted = [...enrolledStudents].sort((a, b) => {
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
      <div className="overflow-x-auto rounded-md border border-border  flex flex-col justify-between">
        <Table className="max-w-full ">
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
          <TableBody className="border-b">
            {paginatedData.map((student, index) => (
              <TableRow
                key={index}
                className="hover:bg-accent/30 transition-colors border-b"
              >
                <TableCell className="px-4 py-3 text-center ">
                  {(page - 1) * pageSize + index + 1}
                </TableCell>
                <TableCell className="px-4 py-3">{student.studentName}</TableCell>
                <TableCell className="px-4 py-3">{student.courseTitle}</TableCell>
                <TableCell className="px-4 py-3 ">
                  {new Date(student.enrolledAt).toLocaleDateString()}
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
