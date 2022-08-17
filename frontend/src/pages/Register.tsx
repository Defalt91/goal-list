import { ChangeEvent, FC, FormEvent, useState } from "react"
import { FaUser } from "react-icons/fa"
import { IRegUser } from "../interfaces/auth"

const Register: FC = () => {
	const [formData, setFormData] = useState<IRegUser>({
		name: "",
		email: "",
		password: "",
		confirmPass: "",
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
