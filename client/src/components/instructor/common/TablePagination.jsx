import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export default function TablePagination({ page, setPage, totalPages }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center  p-2 ">
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
                pg !== 1 && pg !== totalPages && Math.abs(pg - page) <= 1
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
  );
}
