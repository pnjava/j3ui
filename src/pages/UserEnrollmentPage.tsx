import UserEnrollment from "../components/UserEnrollment";
import { useParams } from "react-router-dom";

export default function UserEnrollmentPage() {
  const { trainingId } = useParams();

  const handleUserEnrollment = (data) => {
    console.log("Created training:", data);
    // TODO: submit to API or state store
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <UserEnrollment onSave={handleUserEnrollment} trainingId={trainingId} />
    </div>
  );
}
