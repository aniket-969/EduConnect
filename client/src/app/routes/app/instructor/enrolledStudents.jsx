import EnrolledStudentsTable from "@/components/instructor/EnrolledStudentsTable";
import { fakeEnrolledStudents } from "@/data/fakeEnrolledStudents";
//import { useEnrolledStudents } from "@/hooks/useEnrolledStudents";

export default function EnrolledStudentsPage() {
  // const { data, isLoading } = useEnrolledStudents();

  //if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-2">
      <h2 className="text-2xl font-semibold mb-4">Enrolled Students</h2>
      <EnrolledStudentsTable enrolledStudents={fakeEnrolledStudents} />
    </div>
  );
}
