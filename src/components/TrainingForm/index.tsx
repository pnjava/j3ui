import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { X } from "lucide-react";
import clsx from "clsx";
import { Input } from "../ui/input";
import { DatePicker } from "../custom-ui/DatePicker";
import { Button } from "../ui/button";
import { Training } from "@/lib/types/Training";
import { StoreContext } from "../../context/Store";

interface TrainingFormProps {
  initialData?: Training;
  onSubmit: (data: Training) => void;
  onClose?: () => void;
  isModal?: boolean;
  trainerId: string;
  isView?: boolean;
  isLoading?: boolean;
}

export interface TrainingData {
  id: string;
  title: string;
  startDate: string;
  format: "Virtual" | "InPerson" | "Hybrid";
  location: string;
  classType: "secure" | "trainer_of_trainers";
  trainerId: string;
}

const generateRandomId = () =>
  Math.floor(1000 + Math.random() * 9000).toString();

export default function TrainingForm({
  initialData,
  onSubmit,
  onClose,
  isModal = false,
  trainerId,
  isView = false,
  isLoading = false,
}: TrainingFormProps) {
  const { user } = useContext(StoreContext);
  const [form, setForm] = useState<Training>({
    ...initialData,
    id: initialData?.id || generateRandomId(),
    trainerId: user.currentUser.id,
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.title) newErrors.title = "Training name is required";
    if (!form.startDate) newErrors.startDate = "Start date is required";
    if (!form.location) newErrors.location = "Location is required";
    if (!form.classType) newErrors.classType = "Type of Training is required";
    if (!form.format) newErrors.format = "Format is required";
    return newErrors;
  };

  const toUpperCase = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({
      ...form,
      trainerName: `${toUpperCase(user.currentUser.firstName)} ${toUpperCase(
        user.currentUser.lastName
      )}`,
      trainerId: user.currentUser.id,
      programId: "REVIVE",
    });
    // if (onClose) onClose();
  };

  const handleChange = (field: keyof TrainingData, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const content = (
    <div className="space-y-4 p-4 w-full px-6 overflow-y-auto">
      {/* <div className="space-y-2">
        <label className="block text-sm font-medium">Training ID</label>
        <Input type="text" value={form.id} readOnly={!!initialData} />
      </div> */}

      <div className="space-y-2">
        <label className="block text-sm font-medium">Training Name</label>
        <Input
          type="text"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className={clsx(errors.title && "border-red-500")}
          disabled={isView}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Training Start Date</label>
        <DatePicker
          value={form.startDate}
          onChange={(date) =>
            handleChange(
              "startDate",
              date ? date.toISOString().split("T")[0] : ""
            )
          }
          disableFutureDates={false}
          disabled={isView}
        />
        {errors.startDate && (
          <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Training Format</label>
        <Select
          value={form.format}
          onValueChange={(value) => handleChange("format", value)}
          disabled={isView}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Virtual">Virtual (Zoom Link)</SelectItem>
            <SelectItem value="InPerson">In-Person (Address)</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>
        {errors.format && (
          <p className="text-red-500 text-sm mt-1">{errors.format}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Location of Training
        </label>
        <Input
          type="text"
          value={form.location}
          onChange={(e) => handleChange("location", e.target.value)}
          className={clsx(errors.location && "border-red-500")}
          disabled={isView}
        />
        {errors.location && (
          <p className="text-red-500 text-sm mt-1">{errors.location}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Type of Training</label>
        <Select
          value={form.classType}
          onValueChange={(value) => handleChange("classType", value)}
          disabled={isView}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="secure">Secure</SelectItem>
            <SelectItem value="trainer_of_trainers">
              Trainer of Trainers
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.classType && (
          <p className="text-red-500 text-sm mt-1">{errors.classType}</p>
        )}
      </div>
    </div>
  );
  const footer = (
    <div className="flex justify-end gap-2 border-t py-4 px-6">
      <Button
        variant="outline"
        className="px-6 h-8 border-gray-900 gap-2"
        onClick={() => (initialData ? onClose() : navigate(-1))}
      >
        <div className="text-gray-900 text-xs font-medium font-inter leading-none">
          {isView ? "Close" : "Cancel"}
        </div>
      </Button>
      {!isView && (
        <Button
          variant="outline"
          className="px-6 h-8 border-[#00689a] gap-2"
          onClick={handleSubmit}
          disabled={!form.classType || !form.format || isLoading}
        >
          <div className="text-[#00689a] text-xs font-medium font-inter leading-none">
            {initialData ? "Update" : "Create"}
          </div>
        </Button>
      )}
    </div>
  );

  if (isModal) {
    return (
      <DialogPrimitive.Root open onOpenChange={onClose}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-10 bg-black/80" />
          <DialogPrimitive.Content className="fixed left-1/2 top-1/2 max-h-[90vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 z-10 w-full bg-white p-0 shadow-lg sm:rounded-lg overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <DialogPrimitive.Title className="text-lg font-semibold">
                {isView
                  ? "Training Detail"
                  : initialData
                  ? "Edit Training"
                  : "Create Training"}
              </DialogPrimitive.Title>
              <DialogPrimitive.Close className="text-gray-600 hover:text-black">
                <X />
              </DialogPrimitive.Close>
            </div>
            <div className="max-h-[calc(85vh-100px)] overflow-y-auto">
              {content}
            </div>
            {footer}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-8">
      {content}
      {footer}
    </div>
  );
}
