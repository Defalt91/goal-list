import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import Spinner from "../components/Spinner"
import { ILogUser } from "../interfaces/auth"
import { login, reset } from "../redux/auth/authSlice"

const Login: FC = () => {
	const [formData, setFormData] = useState<ILogUser>({
		email: "",
		password: "",
	})

	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { user, message, isLoading, isError, isSuccess } = useAppSelector((state) => state.auth)

	useEffect(() => {
		if (isError) {
			toast.error(message)

			dispatch(reset())
		}
		if (isSuccess || user) {
			navigate("/")
		}
	}, [user, isError, isSuccess, message, navigate, dispatch])

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [event.target.name]: event.target.value })
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		dispatch(login(formData))
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<section className="heading">
			<h1>
				<FaSignInAlt /> Login
			</h1>
			<p>Login and start estting your goals</p>
			<section className="form">
				<form className="form" onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							placeholder="Enter your email"
							autoComplete="off"
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							placeholder="Enter your password"
							onChange={handleChange}
						/>
					</div>
					<div className="form-gorup">
						<button className="btn btn-block">LOGIN</button>
					</div>
				</form>
			</section>
		</section>
	)
}

export default Login
