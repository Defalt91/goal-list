import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import authReducer from "../redux/auth/authSlice"
import goalReducer from "../redux/goals/goalSlice"

export const store = configureStore({
	reducer: {
		auth: authReducer,
		goals: goalReducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
