import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IGoalData, IGoalDB, IInitalState } from "../../interfaces/goals"
import goalService from "./goalService"

const initialState: IInitalState = {
	goals: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: null,
}

//Create new goal
export const createGoal = createAsyncThunk("goals/create", async (goalData: IGoalData, thunkAPI) => {
	try {
		const token: any = thunkAPI.getState() //as { auth: { user: { token: string } } } //.auth.user.token

		return await goalService.createGoal(goalData, token.auth.user.token)
	} catch (err: any) {
		const message: string = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

//Get user goals
export const getGoals = createAsyncThunk("goals/getAll", async (_, thunkAPI) => {
	try {
		const token: any = thunkAPI.getState() //as { auth: { user: { token: string } } } //.auth.user.token

		return await goalService.getGoals(token.auth.user.token)
	} catch (err) {}
})

//Delete user goal
export const deleteGoal = createAsyncThunk("goals/delete", async (id: string, thunkAPI) => {
	try {
		const token: any = thunkAPI.getState() //as { auth: { user: { token: string } } } //.auth.user.token

		return await goalService.deleteGoal(id, token.auth.user.token)
	} catch (err: any) {
		const message: string = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

export const goalSlice = createSlice({
	name: "goal",
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createGoal.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createGoal.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				if (state.goals) state.goals.push(action.payload)
			})
			.addCase(createGoal.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload as "string"
			})
			.addCase(getGoals.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getGoals.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				if (state.goals) {
					console.log("payload", action.payload)

					state.goals = [...action.payload]
				}
			})
			.addCase(getGoals.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload as "string"
			})
			.addCase(deleteGoal.pending, (state) => {
				state.isLoading = true
			})
			.addCase(deleteGoal.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				//if (state.goals) state.goals.push(action.payload)
				state.goals.filter((goal: IGoalDB) => goal._id !== action.payload._id)
			})
			.addCase(deleteGoal.rejected, (state, action) => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				state.message = action.payload as "string"
			})
	},
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer
