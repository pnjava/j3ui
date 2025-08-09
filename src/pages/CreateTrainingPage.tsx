import { useContext, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { StoreContext } from "../context/Store";
import TrainingForm from "../components/TrainingForm";
import { useNavigate } from "react-router";
import * as actions from "../services/actions/TrainingActions";

export default function CreateTrainingPage() {
  const { trainings, user, LandingService, dispatch } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const {
    trainings: { trainFlag },
  } = trainings;
  const trainerId = "101"; // replace with dynamic trainer ID if needed

  const handleCreate = async (payload) => {
    console.log("Created training: ", payload);
    // TODO: submit to API or state store
    await LandingService.createNewTraining(dispatch, user, payload);
  };

  useEffect(() => {
    if (
      trainFlag &&
      (trainFlag as any).type === "new" &&
      (trainFlag as any).status === "success"
    ) {
      dispatch(actions.CLEAR_TRAIN_FLAG());
      navigate(
        `/${
          location.pathname.toLowerCase().includes("revive")
            ? "revive"
            : "vaprs"
        }/trainer/trainings`
      );
    }
  }, [trainFlag]);

  return (
    <>
      {(trainFlag as any).status === "req" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/40">
          <LoaderCircle className="animate-spin w-10 h-10 text-blue-500" />
        </div>
      )}
      <div className="max-w-3xl mx-auto p-6">
        <TrainingForm
          onSubmit={handleCreate}
          trainerId={trainerId}
          isModal={false}
          isLoading={(trainFlag as any).status === "req"}
        />
      </div>
    </>
  );
}
