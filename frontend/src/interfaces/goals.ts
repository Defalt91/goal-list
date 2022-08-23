export interface IGoalDB {
	_id: string
	user: string
	text: string
	createdAt: string
	updatedAt: string
	__v: number
}

export interface IInitalState {
	/* goals:
		| [
				{
					_id: string
					user: string
					text: string
					createdAt: string
					updatedAt: string
					__v: number
				}
		  ]
		| null */
	goals: Array<IGoalDB>
	isError: boolean
	isSuccess: boolean
	isLoading: boolean
	message: string | null
}

export interface IGoalData {
	text: string
}
