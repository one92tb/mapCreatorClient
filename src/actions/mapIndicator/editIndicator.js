import {
  axiosInstance
} from "../../axiosInstance";
export const EDITING_INDICATOR = "EDITING_INDICATOR";
export const EDITED_INDICATOR_SUCCESS = "EDITED_INDICATOR_SUCCESS";
export const EDITED_INDICATOR_ERROR = "EDITED_INDICATOR_ERROR";

const editedIndicatorSuccess = indicator => ({
  type: EDITED_INDICATOR_SUCCESS,
  indicator
});

const editedIndicatorError = error => ({
  type: EDITED_INDICATOR_ERROR,
  error
});

export const editIndicator = (id, propertyName, value) => dispatch => {
  console.log(id,propertyName, value);
  dispatch({
    type: EDITING_INDICATOR
  });
  axiosInstance
    .patch(`/api/indicators/${id}`, {
      [propertyName]: value
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => {
      console.log(res.data);
      dispatch(editedIndicatorSuccess(res.data));
    })
    .catch(error => {
      console.log(error);
      dispatch(editedIndicatorError(error));
    });
};
