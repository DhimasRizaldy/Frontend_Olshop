import { API_ENDPOINT } from '../../../utils/constants/endpoint';
import http from '../../../utils/constants/http';
import { useMutation, useQuery } from '@tanstack/react-query';

module.exports = {
  // service user profile
  userUpdateProfile: async ({ queryKey }) => {
    const [_key, _params] = queryKey;
    const { data } = await http.put(_key, { params: _params });
    console.log(data, 'Profil pengguna berhasil diperbarui');
    alert('Profil pengguna berhasil diperbarui');
    return data;
  },

  useUserUpdateProfile: (options) => {
    return useMutation(
      [API_ENDPOINT.UPDATE_PROFILE, options],
      userUpdateProfile,
    );
  },
};
