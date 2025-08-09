import { useState, useContext, useEffect } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";
import { navigateToUrl } from "single-spa";
import { StoreContext } from "../../context/Store";
import { Training } from "../../lib/types/Training";

interface UserEnrollmentFormProps {
  trainingId: string;
  onSave: (data: EnrollmentData) => void;
  //   onAddAnother: () => void;
  //   onDone: () => void;
}

export interface EnrollmentData {
  trainingId: string;
  trainerId: string;
  firstName: string;
  lastName: string;
  zipCode: string;
  email: string;
  gender: string;
  race: string;
}

export default function UserEnrollmentForm({
  trainingId,
  onSave,
}: //   onAddAnother,
//   onDone,
UserEnrollmentFormProps) {
  const { user, trainings, dispatch, LandingService } =
    useContext(StoreContext);
  const [form, setForm] = useState<EnrollmentData>({
    trainingId,
    trainerId: user.currentUser.id,
    firstName: "",
    lastName: "",
    zipCode: "",
    email: "",
    gender: "",
    race: "",
  });

  const {
    trainings: { data: trainingsData, trainFlag },
  } = trainings;
  const app = location.pathname.toLowerCase().includes("revive")
    ? "REVIVE"
    : "VAPRS";

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [trainingList, setTrainingList] = useState<Training[]>([]);

  useEffect(() => {
    const onInit = async () => {
      try {
        await LandingService.getAllTrainings(dispatch, user);
      } catch (error) {
        console.error(
          `Error calling LandingService.getAllTrainings(): ${error}`
        );
      }
    };
    onInit();
  }, [LandingService]);

  useEffect(() => {
    setTrainingList(
      trainingsData.filter(
        (item: Training) =>
          item.trainerId === user.currentUser.id && item.programId === app
      )
    );
  }, [trainingsData, user]);

  const handleChange = (field: keyof EnrollmentData, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z]+([-' ][A-Za-z]+)*$/;
    const zipRegex = /^\d{5}(-\d{4})?$/;

    if (!form.trainingId) newErrors.trainingId = "Training ID is required";
    if (!form.firstName) newErrors.firstName = "First Name is required";
    if (!form.lastName) newErrors.lastName = "Last Name is required";
    if (!form.email) newErrors.email = "Participant Email Address is required";
    if (!form.zipCode) newErrors.zip = "Zip Code is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.race) newErrors.race = "Race is required";
    if (form.email && !emailRegex.test(form.email))
      newErrors.email = "Participant Email Address is invalid";
    if (form.firstName && !nameRegex.test(form.firstName))
      newErrors.firstName = "First Name is invalid";
    if (form.lastName && !nameRegex.test(form.lastName))
      newErrors.lastName = "Last Name is invalid";
    if (form.lastName && !nameRegex.test(form.lastName))
      newErrors.lastName = "Last Name is invalid";
    if (form.zipCode && !zipRegex.test(form.zipCode))
      newErrors.zip = "Zip Code is invalid";
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave(form);
  };

  const handleAddAnother = () => {
    // onSave(form);
    setForm({
      trainingId: trainingId || "",
      trainerId: user.currentUser.id,
      firstName: "",
      lastName: "",
      zipCode: "",
      email: "",
      gender: "",
      race: "",
    });
    // onAddAnother();
  };

  return (
    <div className="space-y-4 p-4 w-full max-w-md mx-auto">
      <div className="space-y-1">
        <label className="block text-sm font-medium">Training Name</label>
        <Select
          value={form.trainingId}
          onValueChange={(value) => handleChange("trainingId", value)}
          disabled={!!trainingId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select training" />
          </SelectTrigger>
          <SelectContent>
            {trainingList.map((item: Training) => (
              <SelectItem key={item.id} value={`${item.id}`}>
                {item.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.trainingId && (
          <p className="text-red-500 text-sm mt-1">{errors.trainingId}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Trainer ID</label>
        <Input
          type="text"
          value={form.trainerId}
          disabled
          // className="disabled:opacity-100 disabled:border-[rgb(148_163_184_var(--tw-border-opacity,1))]"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">First Name</label>
        <Input
          type="text"
          value={form.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Last Name</label>
        <Input
          type="text"
          value={form.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Zip Code</label>
        <Input
          type="text"
          value={form.zipCode}
          onChange={(e) => handleChange("zipCode", e.target.value)}
        />
        {errors.zip && (
          <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">
          Participant Email Address
        </label>
        <Input
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Gender</label>
        <Select
          value={form.gender}
          onValueChange={(value) => handleChange("gender", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Non-Binary">Non-Binary</SelectItem>
            <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Race</label>
        <Select
          value={form.race}
          onValueChange={(value) => handleChange("race", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select race" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="White">White</SelectItem>
            <SelectItem value="Black">Black</SelectItem>
            <SelectItem value="Asian">Asian</SelectItem>
            <SelectItem value="Native">Native</SelectItem>
            <SelectItem value="More than 1 Race">More than 1 Race</SelectItem>
          </SelectContent>
        </Select>
        {errors.race && (
          <p className="text-red-500 text-sm mt-1">{errors.race}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 py-4">
        <Button
          variant="outline"
          className="px-6 h-8 border-[#00689a] gap-2"
          onClick={() => navigateToUrl("/revive/trainer/trainings")}
        >
          <div className="text-[#00689a] text-xs font-medium font-inter leading-none">
            Cancel
          </div>
        </Button>
        <Button
          variant="outline"
          className="px-6 h-8 border-[#00689a] gap-2"
          onClick={handleAddAnother}
        >
          <div className="text-[#00689a] text-xs font-medium font-inter leading-none">
            Add Another
          </div>
        </Button>
        <Button
          className="px-6 h-8 bg-[#00689a] border-[#00689a] gap-2"
          onClick={handleSave}
        >
          <div className="text-xs font-medium font-inter leading-none">
            Save Participant
          </div>
        </Button>
      </div>
    </div>
  );
}
