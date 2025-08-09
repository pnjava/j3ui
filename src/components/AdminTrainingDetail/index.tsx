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

// const mockTrainings: Training[] = getMockTrainings().list;

const AdminTrainingDetail = () => {
  const { state, trainings, user, LandingService, RestService, dispatch } =
    useContext(StoreContext);
  const {
    trainings: { data: trainingsData, trainFlag },
  } = trainings;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchFormat, setSearchFormat] = useState<string>("");
  const [searchApprovalStatus, setSearchApprovalStatus] = useState<string>("");
  // const [searchType, setSearchType] = useState<string>("");
  // const [searchId, setSearchId] = useState<string>("");
  // const [searchTrainerId, setSearchTrainerId] = useState<string>("");
  const [searchTrainerName, setSearchTrainerName] = useState<string>("");
  // const [searchLocation, setSearchLocation] = useState<string>("");
  // const [searchStart, setSearchStart] = useState<string>("");

  const [filteredTrainings, setFilteredTrainings] = useState(
    trainingsData || []
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [editId, setEditId] = useState("");
  const [editData, setEditData] = useState<Training>();
  const [isConfirm, setIsConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [isView, setIsView] = useState(false);

  useEffect(() => {
    setFilteredTrainings(
      (trainingsData
        ? Array.isArray(trainingsData)
          ? (trainingsData as Training[])
          : (Object.values(trainingsData) as Training[])
        : []
      ).filter(
        (training: Training) =>
          (!searchTrainerName ||
            training.trainerName
              .toLocaleLowerCase()
              .includes(searchTrainerName.toLowerCase())) &&
          (!searchFormat ||
            training.format
              .toLocaleLowerCase()
              .includes(searchFormat.toLowerCase())) &&
          (!searchApprovalStatus ||
            training.status.toLowerCase() ===
              searchApprovalStatus.toLowerCase())
      )
    );
  }, [searchFormat, searchApprovalStatus, searchTrainerName, trainingsData]);

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
      ["new", "update"].includes((trainFlag as any).type) &&
      (trainFlag as any).status === "success"
    ) {
      setEditId("");
      setShowEditModal(false);
      setIsView(false);
      setCreateModal(false);
      dispatch(actions.CLEAR_TRAIN_FLAG());
    }
  }, [trainFlag]);

  const resetFilter = () => {
    setSearchFormat("");
    setSearchApprovalStatus("");
    // setSearchId("");
    // setSearchTrainerId("");
    setSearchTrainerName("");
    // setSearchStart("");
    // setSearchLocation("");
    // setSearchType("");
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

  const triggerApprove = (id, type) => {
    handleApprove(id, type);
  };

  const handleApprove = async (id, type) => {};

  const handleDelete = async () => {
    await LandingService.deleteTraining(dispatch, user, { id: deleteId });
    setDeleteId(null);
    setIsConfirm(false);
  };

  const handleUpdate = async (payload: object) => {
    await LandingService.updateTraining(dispatch, user, payload);
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
            // id={searchId}
            // onIdChange={(val) => setSearchId(val)}
            // trainerId={searchTrainerId}
            // onTrainerIdChange={(val) => setSearchTrainerId(val)}
            trainerName={searchTrainerName}
            onTrainerNameChange={(val) => setSearchTrainerName(val)}
            // start={searchStart}
            // onStartChange={(val) => setSearchStart(val)}
            // location={searchLocation}
            // onLocationChange={(val) => setSearchLocation(val)}
            format={searchFormat}
            onFormatChange={(val) => setSearchFormat(val)}
            approvalStatus={searchApprovalStatus}
            onApprovalStatusChange={(val: string) =>
              setSearchApprovalStatus(val)
            }
            // classType={searchType}
            // onClassTypeChange={(val) => setSearchType(val)}
            resetFilter={resetFilter}
            // triggerCreateModal={() => setCreateModal(true)}
          />
          <TrainingTable
            columns={getTrainingColumns(
              handleEdit,
              triggerDelete,
              triggerView,
              triggerApprove
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
          {createModal && (
            <TrainingForm
              onSubmit={handleUpdate}
              onClose={() => {
                setCreateModal(false);
                setIsView(false);
              }}
              isModal
              trainerId={"101"}
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

export default AdminTrainingDetail;
