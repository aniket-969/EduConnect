import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourse, useDeleteCourse } from "@/hooks/useCourse";
import CoursePreviewHero from "@/components/instructor/preview/CoursePreviewHero";
import CourseLearningObjectives from "@/components/student/course/courseLearningObjective";
import CoursePreviewCurriculum from "@/components/instructor/preview/CoursePreviewCurriculum";
import { Pencil, Trash2 } from "lucide-react";
import { paths } from "@/config/paths";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";

export default function InstructorCoursePreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: course, isLoading } = useCourse(id);
  const deleteCourseMutation = useDeleteCourse();
  const [showDialog, setShowDialog] = React.useState(false);

  const handleEdit = () => {
    navigate(paths.app.instructorDashboard.editcourses.getHref(id));
  };

  const handleDelete = () => {
    setShowDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCourseMutation.mutateAsync(id);
      toast.success("Course deleted successfully.");
      setShowDialog(false);
      navigate(paths.app.instructorDashboard.courses.getHref());
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not delete course.");
      setShowDialog(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!course) return <div>No course found.</div>;

  return (
    <div className="w-full px-4 space-y-8 ">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-2xl font-bold capitalize">Course Preview</h2>
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="w-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 transition"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
      <CoursePreviewHero course={course} />
      <CourseLearningObjectives
        objectives={course.learningObjectives}
        title="Learning Objectives"
      />
      <CoursePreviewCurriculum lessons={course.lessons} />
      {/* Add ratings/reviews section here if needed */}
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
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={confirmDelete}
              disabled={deleteCourseMutation.isLoading}
            >
              {deleteCourseMutation.isLoading ? "Deleting..." : "Delete"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
