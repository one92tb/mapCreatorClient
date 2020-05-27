import {
  axiosInstance
} from "../../axiosInstance";

export const DELETING_ACCOUNT = "DELETING_ACCOUNT";
export const DELETED_ACCOUNT_SUCCESS = "DELETED_ACCOUNT_SUCCESS";
export const DELETED_ACCOUNT_ERROR = "DELETED_ACCOUNT_ERROR";

const deletedAccountSuccess = id => ({
  type: DELETED_ACCOUNT_SUCCESS,
  id
});

const deletedAccountError = error => ({
  type: DELETED_ACCOUNT_ERROR,
  error
});

export const deleteAccount = id => dispatch => {
  dispatch({
    type: DELETING_ACCOUNT
  });
  axiosInstance
    .delete(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => {
      dispatch(deletedAccountSuccess(res.data.id));
    })
    .catch(error => {
      dispatch(deletedAccountError(error));
    });
};
