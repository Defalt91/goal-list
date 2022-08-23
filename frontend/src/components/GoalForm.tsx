import { FC, FormEvent, useState } from "react"
import { useAppDispatch } from "../app/hooks"
import { createGoal } from "../redux/goals/goalSlice"

const GoalForm: FC = () => {
	const [text, setText] = useState("")
	const dispatch = useAppDispatch()

	const handleSubmti = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		dispatch(createGoal({ text }))
		setText("")
	}

	return (
		<section className="form">
			<form onSubmit={handleSubmti}>
				<div className="form-group">
					<label htmlFor="text">Goal</label>
					<input type="text" name="text" id="text" onChange={(e) => setText(e.target.value)} />
				</div>
				<div className="form-group">
					<button className="btn btn-block" type="submit">
						Add Goal
					</button>
				</div>
			</form>
		</section>
	)
}

export default GoalForm
