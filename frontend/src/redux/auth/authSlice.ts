import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IDBUser, IInitialAuthState, ILogUser, IRegUser } from "../../interfaces/auth"
import authService from "./authService"

//get user from localstorage
const user: IDBUser | null = JSON.parse(localStorage.getItem("user")!)

const initialState: IInitialAuthState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
}

//Register user
export const register = createAsyncThunk("auth/register", async (user: IRegUser, thunkAPI) => {
	try {
		return await authService.register(user)
	} catch (err: any) {
		const message: string = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

//Login user
export const login = createAsyncThunk("auth/login", async (user: ILogUser, thunkAPI) => {
	try {
		return await authService.login(user)
	} catch (err: any) {
		const message: string = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

//Logout user
export const logout = createAsyncThunk("auth/logout", () => {
	authService.logout()
})

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.user = null
			state.isLoading = false
			state.isSuccess = false
			state.isError = false
			state.message = ""
		},
	},
	extraReducers: (builder: ActionReducerMapBuilder<IInitialAuthState>) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload as "string"
				state.user = null
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload as "string"
				state.user = null
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null
			})
	},
})

export const { reset } = authSlice.actions
export default authSlice.reducer
