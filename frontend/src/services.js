import axios from "axios";
import Constants from "./Constants";

export const getTrackerDetails = (key) => {
  return axios
    .get(Constants.BACKEND_URL + Constants.GET_TRACKER_STATS + key)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        // handle errors
      }
    });
};

export const createTracker = (data) => {
  return axios
    .post(Constants.BACKEND_URL + Constants.CREATE_TRACKER, data)
    .then((res) => {
      return res.data;
    });
};
