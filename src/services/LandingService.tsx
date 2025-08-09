import * as actions from "./actions/TrainingActions";
import * as restService from "./RestService";
import { Training } from "@/lib/types/Training";

import { toast } from "sonner";

const HOST = `${process.env.VITE_TRAININGS_ENDPOINT}`;

/**
 * @function
 * @name getAllTrainings
 * @description Fetches the list of plans from the API based on the query string parameter.
 * @param {string} query The query string used to filter the plans.
 * @returns {Promise<void>} A promise that resolves when the data is fetched and processed.
 */

export const getAllTrainings = async (
  dispatch: React.Dispatch<unknown>,
  user
) => {
  dispatch(actions.GET_ALL_TRAININGS());
  const currentUser = user?.currentUser;

  const response = await restService.call("GET", `${HOST}/trainings`);

  if (response?.status === 200) {
    try {
      const all: Training[] = Array.isArray(response?.data)
        ? response.data.filter((t: Training) => !t.isDeleted)
        : [];

      dispatch(actions.GET_ALL_TRAININGS_SUCCESS(all));
    } catch (error) {
      console.error(`Error retrieving trainings for role: ${error}`);
    }
  }

  if (response?.error) {
    dispatch(actions.GET_ALL_TRAININGS_FAIL([]));
  }
};

export const createNewTraining = async (
  dispatch: React.Dispatch<unknown>,
  user,
  payload
) => {
  dispatch(actions.CREATE_NEW_TRAINING_REQUEST());
  const currentUser = user?.currentUser;

  delete payload.id;

  const response = await restService.call("POST", `${HOST}/trainings`, payload);

  if (response?.status === 201) {
    try {
      toast.success("Successfully create new training.");
      dispatch(
        actions.CREATE_NEW_TRAINING_SUCCESS({ ...response.data, ...payload })
      );
      await getAllTrainings(dispatch, user);
    } catch (error) {
      toast.error(error);
      console.error(`Error retrieving trainings for role: ${error}`);
    }
  }

  if (response?.error) {
    dispatch(actions.CREATE_NEW_TRAINING_FAILURE(response));
    toast.error(
      `Failed to create new training: ${response?.error?.message}. Try again later.`
    );
  }
};

export const updateTraining = async (
  dispatch: React.Dispatch<unknown>,
  user,
  payload
) => {
  dispatch(actions.UPDATE_TRAINING_REQUEST());

  const id = payload.id;
  delete payload.id;
  delete payload.rejectionReason;

  const response = await restService.call(
    "PUT",
    `${HOST}/trainings/${id}`,
    payload
  );

  if (response?.status === 204) {
    try {
      toast.success("Successfully updated training.");
      dispatch(actions.UPDATE_TRAINING_SUCCESS({}));
      await getAllTrainings(dispatch, user);
    } catch (error) {
      toast.error(error);
      console.error(`Error retrieving trainings for role: ${error}`);
    }
  }

  if (response?.error) {
    toast.error(
      `Failed to update training: ${response?.error?.message}. Try again later.`
    );
    dispatch(actions.UPDATE_TRAINING_FAILURE(response));
  }
};

export const deleteTraining = async (
  dispatch: React.Dispatch<unknown>,
  user,
  payload
) => {
  // dispatch(actions.CLEAR_TRAIN_FLAG());

  const id = payload.id;

  const response = await restService.call("DELETE", `${HOST}/trainings/${id}`);

  if (response?.status === 200) {
    try {
      toast.success("Successfully deleted training.");
      // dispatch(actions.UPDATE_TRAINING_SUCCESS({}));
      // dispatch(actions.CLEAR_TRAIN_FLAG());
      await getAllTrainings(dispatch, user);
    } catch (error) {
      toast.error(error);
      console.error(`Error retrieving trainings for role: ${error}`);
    }
  }

  if (response?.error) {
    toast.error(
      `Failed to delete training: ${response?.error?.message}. Try again later.`
    );
    // dispatch(actions.UPDATE_TRAINING_FAILURE(response));
  }
};

export const approveTraining = async (
  dispatch: React.Dispatch<unknown>,
  user,
  payload
) => {
  // dispatch(actions.CLEAR_TRAIN_FLAG());

  const id = payload.id;

  const response = await restService.call(
    "POST",
    `${HOST}/trainings/${id}/approve?status=${payload.status}`
  );

  if (response?.status === 200) {
    try {
      toast.success("Successfully approved training.");
      // dispatch(actions.UPDATE_TRAINING_SUCCESS({}));
      // dispatch(actions.CLEAR_TRAIN_FLAG());
      await getAllTrainings(dispatch, user);
    } catch (error) {
      toast.error(error);
      console.error(`Error approving trainings: ${error}`);
    }
  }

  if (response?.error) {
    toast.error(
      `Failed to delete training: ${response?.error?.message}. Try again later.`
    );
    // dispatch(actions.UPDATE_TRAINING_FAILURE(response));
  }
};
