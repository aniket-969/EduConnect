import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { useDeleteCourse } from "@/hooks/useCourse";
import { toast } from "react-toastify";


export default function DeleteCourseButton({
  courseId,
  onDeleted,
  buttonClassName = "inline-flex items-center gap-1 px-3 py-1.5 rounded text-sm font-medium",
  iconOnly = false,
  children = "Delete",
  stopPropagation = true,
}) {
  const [showDialog, setShowDialog] = useState(false);
  const deleteCourseMutation = useDeleteCourse();

  const handleDelete = (e) => {
    if (stopPropagation && e) e.stopPropagation();
    setShowDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCourseMutation.mutateAsync(courseId);
      toast.success("Course deleted successfully.");
      setShowDialog(false);
      if (onDeleted) onDeleted();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not delete course.");
      setShowDialog(false);
    }
  };

  return (
    <>
      <button
        className={buttonClassName}
        onClick={handleDelete}
        disabled={deleteCourseMutation.isLoading}
        title="Delete"
        type="button"
      >
        <Trash2
          className={`w-4 h-4 ${
            iconOnly ? "hover:text-red-700  cursor-pointer" : ""
          }`}
        />{" "}
        {!iconOnly && children}
      </button>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
          </DialogHeader>
          <div>
            Are you sure you want to delete this course? This action cannot be
            undone.
          </div>
          <DialogFooter>
            <button
              className="px-4 py-2 rounded bg-muted text-foreground hover:bg-muted/80"
              onClick={() => setShowDialog(false)}
              type="button"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={confirmDelete}
              disabled={deleteCourseMutation.isLoading}
              type="button"
            >
              {deleteCourseMutation.isLoading ? "Deleting..." : "Delete"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
