import { ChangeEvent, FC, FormEvent, useState } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { ILogUser } from "../interfaces/auth"

const Login: FC = () => {
	const [formData, setFormData] = useState<ILogUser>({
		email: "",
		password: "",
	})

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [event.target.name]: event.target.value })
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
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
