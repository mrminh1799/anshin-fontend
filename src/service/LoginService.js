import axiosHelper from "../common/axiosHelper";

export const loginToken = (user) => {
  return axiosHelper.post("http://localhost:8080/authenticate", user);
};
