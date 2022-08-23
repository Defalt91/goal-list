import { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import GoalForm from "../components/GoalForm"
/* import GoalItem from "../components/GoalItem" */
import Spinner from "../components/Spinner"
import { IGoalDB } from "../interfaces/goals"
import { deleteGoal, getGoals } from "../redux/goals/goalSlice"

const Dashboard: FC = () => {
	const navigate = useNavigate()
	const { user } = useAppSelector((state) => state.auth)
	const dispatch = useAppDispatch()
	const { goals, isLoading, isError, message } = useAppSelector((state) => state.goals)

	useEffect(() => {
		if (isError) {
			console.log(message)
		}
		if (!user) {
			navigate("/login")
		}

		dispatch(getGoals())
	}, [user, navigate, isError, message, dispatch])

	const delGoal = (goalid: string) => {
		dispatch(deleteGoal(goalid))

		dispatch(getGoals())
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<section className="heading">
				<h1>Welcome {user && user.name}</h1>
				<p>Golas components</p>
			</section>
			<GoalForm />
			<section className="content">
				{goals && goals.length > 0 ? (
					goals!.map((goal: IGoalDB) => (
						<div key={goal._id} className="goals">
							<div className="goal">
								<div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
								<h2>{goal.text}</h2>
								<button className="close" onClick={() => delGoal(goal._id)}>
									X
								</button>
							</div>
						</div>
					))
				) : (
					<h3>You have no goals</h3>
				)}
			</section>
		</>
	)
}

export default Dashboard
