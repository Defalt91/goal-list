import axios from "axios"
import { IGoalData } from "../../interfaces/goals"

const API_URL = "/api/goals/"

//Create new goal
const createGoal = async (goalData: IGoalData, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.post(API_URL, goalData, config)

	return response.data
}

//Get user goal
const getGoals = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.get(API_URL, config)

	console.log("response", response.data)

	return response.data
}

//Delete user goal
const deleteGoal = async (goalId: string, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.delete(API_URL + goalId, config)

	return response.data
}

const goalService = {
	createGoal,
	getGoals,
	deleteGoal,
}

export default goalService
