import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import { FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import Spinner from "../components/Spinner"
import { IReduxSate, IRegUser } from "../interfaces/auth"
import { register, reset } from "../redux/auth/authSlice"

const Register: FC = () => {
	const [formData, setFormData] = useState<IRegUser>({
		name: "",
		email: "",
		password: "",
		confirmPass: "",
	})

	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const { user, message, isLoading, isError, isSuccess } = useAppSelector((state: IReduxSate) => state.auth)

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

		if (formData.password !== formData.confirmPass) {
			toast.error("Passwords do not match")
		} else {
			const userData = {
				name: formData.name,
				email: formData.email,
				password: formData.password,
			}

			dispatch(register(userData))
		}
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<section className="heading">
			<h1>
				<FaUser /> Register
			</h1>
			<p>Please create an account</p>
			<section className="form">
				<form className="form" onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							id="name"
							name="name"
							placeholder="Enter your name"
							autoComplete="off"
							onChange={handleChange}
						/>
					</div>
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
					<div className="form-group">
						<input
							type="password"
							className="form-control"
							id="confirmPass"
							name="confirmPass"
							placeholder="Re-type your password"
							onChange={handleChange}
						/>
					</div>
					<div className="form-gorup">
						<button className="btn btn-block">REGISTER</button>
					</div>
				</form>
			</section>
		</section>
	)
}

export default Register
