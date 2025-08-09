import * as actions from "./actions/SearchActions";
import * as restService from "./RestService";

export const searchMRN = async (dispatch: React.Dispatch<unknown>, mrn: string) => {
  dispatch(actions.SEARCH_MRN(mrn));

  const response = await restService.call("GET", "/todos?_limit=10");

  if (response?.status === 200) {

    const payload = { response: [...response.data] };

    dispatch(actions.SEARCH_MRN_SUCCESS(payload));
  }

  if (response?.error) {
    dispatch(actions.SEARCH_MRN_FAIL(response.error));
  }
};
