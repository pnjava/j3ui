import { LoaderCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/Store";
import { TrainingTable } from "./TrainingTable/training-table";
import { getTrainingColumns } from "./TrainingTable/training-table-columns";
import FilterPanel from "./FilterPanel";
import { Training } from "../../lib/types/Training";
// import { getMockTrainings } from "../../services/RestService";
import TrainingForm from "../TrainingForm";
import ConfirmationDialog from "../custom-ui/ConfirmationDialog";
import * as actions from "../../services/actions/TrainingActions";
import { useNavigate } from "react-router-dom";

// const mockTrainings: Training[] = getMockTrainings().list;

const Landing = () => {
  const { state, trainings, user, LandingService, RestService, dispatch } =
    useContext(StoreContext);
  const {
    trainings: { data: trainingsData, trainFlag },
  } = trainings;

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchFormat, setSearchFormat] = useState<string>("");
  const [searchApprovalStatus, setSearchApprovalStatus] = useState<string>("");
  const [filteredTrainings, setFilteredTrainings] = useState(
    trainingsData || []
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState("");
  const [editData, setEditData] = useState<Training>();
  const [isConfirm, setIsConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [isView, setIsView] = useState(false);

  const app = location.pathname.toLowerCase().includes("revive")
    ? "REVIVE"
    : "VAPRS";

  useEffect(() => {
    setFilteredTrainings(
      (trainingsData
        ? Array.isArray(trainingsData)
          ? (trainingsData as Training[])
          : (Object.values(trainingsData) as Training[])
        : []
      )
        .filter(
          (training: Training) =>
            training.programId === app &&
            training.trainerId === user.currentUser.id
        )
        .filter(
          (training: Training) =>
            (!searchFormat ||
              training.format
                .toLocaleLowerCase()
                .includes(searchFormat.toLowerCase())) &&
            (!searchApprovalStatus ||
              training.status.toLowerCase() ===
                searchApprovalStatus.toLowerCase())
        )
    );
  }, [searchFormat, searchApprovalStatus, trainingsData]);

  useEffect(() => {
    const selectedTraining = (
      trainingsData
        ? Array.isArray(trainingsData)
          ? (trainingsData as Training[])
          : (Object.values(trainingsData) as Training[])
        : []
    ).find((training: Training) => training.id === editId);
    if (selectedTraining) {
      setEditData({
        ...selectedTraining,
      });
    } else {
      setEditData(null);
    }
  }, [editId]);

  useEffect(() => {
    const onInit = async () => {
      try {
        setIsLoading(true);
        await LandingService.getAllTrainings(dispatch, user);
      } catch (error) {
        console.error(
          `Error calling LandingService.getAllTrainings(): ${error}`
        );
      } finally {
        setIsLoading(false);
      }
    };
    onInit();
  }, [LandingService]);

  useEffect(() => {
    RestService?.saveStateSession(state);
  }, [state]);

  useEffect(() => {
    if (
      trainFlag &&
      (trainFlag as any).type === "update" &&
      (trainFlag as any).status === "success"
    ) {
      setEditId("");
      setShowEditModal(false);
      setIsView(false);
      dispatch(actions.CLEAR_TRAIN_FLAG());
    }
  }, [trainFlag]);

  const resetFilter = () => {
    setSearchFormat("");
    setSearchApprovalStatus("");
  };

  const handleEdit = (id) => {
    setEditId(id);
    setShowEditModal(true);
    setIsView(false);
  };

  const triggerView = (id) => {
    setEditId(id);
    setIsView(true);
    setShowEditModal(true);
  };

  const triggerDelete = (id) => {
    setDeleteId(id);
    setIsConfirm(true);
  };

  const handleDelete = async () => {
    await LandingService.deleteTraining(dispatch, user, { id: deleteId });
    setDeleteId(null);
    setIsConfirm(false);
  };

  const handleUpdate = async (payload: object) => {
    await LandingService.updateTraining(dispatch, user, payload);
  };

  const triggerUserEnrollment = (id) => {
    navigate(
      `/${
        location.pathname.toLowerCase().includes("revive") ? "revive" : "vaprs"
      }/trainer/${id}/user-enrollment`
    );
  };

  return (
    <>
      {/* Loader overlay */}
      {(isLoading || (trainFlag as any).status === "req") && (
        <div className="absolute inset-0 z-150 flex items-center justify-center bg-white/40">
          <LoaderCircle className="animate-spin w-10 h-10 text-blue-500" />
        </div>
      )}
      <main className="flex flex-col min-h-screen bg-white">
        <section className="w-full max-w-[1152px] mx-auto py-10 flex flex-col gap-6">
          <FilterPanel
            format={searchFormat}
            onFormatChange={(val) => setSearchFormat(val)}
            approvalStatus={searchApprovalStatus}
            onApprovalStatusChange={(val: string) =>
              setSearchApprovalStatus(val)
            }
            resetFilter={resetFilter}
          />
          <TrainingTable
            columns={getTrainingColumns(
              handleEdit,
              triggerDelete,
              triggerView,
              triggerUserEnrollment
            )}
            data={filteredTrainings}
          />
          {showEditModal && !!editData && (
            <TrainingForm
              initialData={editData}
              onSubmit={handleUpdate}
              onClose={() => {
                setEditId("");
                setShowEditModal(false);
                setIsView(false);
              }}
              isModal
              isView={isView}
              trainerId={editData?.trainerId || "101"}
              isLoading={(trainFlag as any).status === "req"}
            />
          )}
          <ConfirmationDialog
            open={isConfirm}
            onOpenChange={setIsConfirm}
            title="Delete Training"
            description="Are you sure to delete this training?"
            onConfirm={() => handleDelete()}
            confirmButtonText="Confirm"
          />
        </section>
      </main>
    </>
  );
};

export default Landing;

const toUpperCase = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
