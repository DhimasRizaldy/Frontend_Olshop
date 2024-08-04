import { API_ENDPOINT } from "../../../utils/constants/endpoint";
import http from "../../../utils/constants/http";
import { useMutation, useQuery } from "@tanstack/react-query";

module.exports = {
  // service user profile
  userUpdateProfile: async ({ queryKey }) => {
    const [_key, _params] = queryKey;
    const { data } = await http.put(_key, { params: _params });
    console.log(data, "User update success");
    alert("User update success");
    return data;
  },

  useUserUpdateProfile: (options) => {
    return useMutation(
      [API_ENDPOINT.UPDATE_PROFILE, options],
      userUpdateProfile
    );
  },
};
