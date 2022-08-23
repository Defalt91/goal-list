import { FC } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { logout, reset } from "../redux/auth/authSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"

const Header: FC = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { user } = useAppSelector((state) => state.auth)

	const onLogout = () => {
		dispatch(logout())
		dispatch(reset())
		navigate("/")
	}

	return (
		<header className="header">
			<div className="logo">
				<Link to="/">GoalSetter</Link>
			</div>
			<ul>
				{user ? (
					<button className="btn" onClick={onLogout}>
						<FaSignOutAlt /> Logout
					</button>
				) : (
					<>
						<li>
							<Link to="login">
								<FaSignInAlt /> Login
							</Link>
						</li>
						<li>
							<Link to="register">
								<FaUser /> Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	)
}

export default Header
