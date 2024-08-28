// reducers/authReducer.ts
import { SET_USER_ROLE } from '../actions/authTypes';

// Tipe untuk state auth
interface AuthState {
  user: {
    role: string | null; // Role dapat berupa string atau null
  };
}

// Tipe untuk action yang digunakan dalam authReducer
interface SetUserRoleAction {
  type: typeof SET_USER_ROLE;
  payload: string; // Payload berupa string untuk role
}

// Gabungkan semua jenis action yang mungkin digunakan dalam reducer ini
type AuthAction = SetUserRoleAction;

// State awal
const initialState: AuthState = {
  user: {
    role: null, // Nilai default role adalah null
  },
};

// Reducer untuk auth
const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case SET_USER_ROLE:
      return {
        ...state,
        user: {
          ...state.user,
          role: action.payload, // Mengatur peran pengguna dari payload
        },
      };
    default:
      return state;
  }
};

export default authReducer;
