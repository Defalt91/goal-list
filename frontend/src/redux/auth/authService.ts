import axios from "axios"
import { ILogUser, IRegUser } from "../../interfaces/auth"

const API_URL = "/api/users/"

//Register User
const register = async (userData: IRegUser) => {
	const response = await axios.post(API_URL, userData)

	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data))
	}

	return response.data
}

//Login User
const login = async (userData: ILogUser) => {
	const response = await axios.post(API_URL + "login", userData)

	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data))
	}

	return response.data
}

const logout = () => {
	localStorage.removeItem("user")
}

const authService = {
	register,
	login,
	logout,
}

export default authService
