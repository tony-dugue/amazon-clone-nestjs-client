import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {DisplayUser} from "./models/DisplayUser.interface";
import {Jwt} from "./models/Jwt";
import {NewUser} from "./models/NewUser";
import authService from "./services/auth.service";
import {RootState} from "../../store";

// TODO: move higher in global => refactorisation
interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface AuthState extends AsyncState {
  user?: DisplayUser | null;
  jwt?: Jwt;
  isAuthenticated?: boolean;
}

const initialState: AuthState = {
  user: null,  // user
  jwt: null,   // jwt
  isAuthenticated: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
}

export const register = createAsyncThunk(
  'auth/register',
  async (user: NewUser, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      return thunkAPI.rejectWithValue('la création du compte a échouée')
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    }
  },

  extraReducers: (builder => {
    builder
    // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })
  })
})

export const { reset } = authSlice.actions;

export const selectedUser = (state: RootState) => {
  return state.auth
}

export default authSlice.reducer;
