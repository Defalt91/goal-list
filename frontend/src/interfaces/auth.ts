export interface IRegUser {
	name: string
	email: string
	password: string
	confirmPass?: string
}
export interface ILogUser {
	email: string
	password: string
}
export interface IDBUser {
	_id: string
	name: string
	email: string
	token: string
}
export interface IInitialAuthState {
	user: IDBUser | null
	isError: boolean
	isSuccess: boolean
	isLoading: boolean
	message: string
}
export interface IReduxSate {
	auth: IInitialAuthState
}
