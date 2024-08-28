// actions/authActions.ts

import { SET_USER_ROLE } from './authTypes';

// Definisikan tipe untuk action creator
interface SetUserRoleAction {
  type: typeof SET_USER_ROLE; // Tipe harus sama dengan nilai dari SET_USER_ROLE
  payload: string | null; // Tipe payload di sini bisa string atau null, tergantung dari implementasi
}

// Action creator untuk mengatur peran pengguna
export const setUserRole = (role: string | null): SetUserRoleAction => ({
  type: SET_USER_ROLE,
  payload: role,
});
