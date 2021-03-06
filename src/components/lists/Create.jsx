import React, { useEffect } from "react";
import { Formik } from "formik";
import { Button, Form, Input, FormGroup, Label, Container } from "reactstrap";
import APIURL from "../../helpers/environment";

function Create(props) {
	function valueSelect(values) {
		for (var propName in values) {
			if (values[propName] === "") {
				delete values[propName];
			}
		}
		createTask(values);
	}
	function createTask(task) {
		fetch(`${APIURL}/task`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: props.sessionToken,
			}),
			body: JSON.stringify({ task }),
		}).then((response) => {
			if (response.ok) {
				//props.listFetch();
				props.createToggle();
			} else alert("task not created");
		});
	}

	return (
		<Container>
			<Formik
				initialValues={{
					title: "",
					description: "",
					time_estimate: "",
					due: "",
					listId: 3,
				}}
				onSubmit={(values, actions) => {
					return valueSelect(values);
					/* setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						actions.setSubmitting(false);
					}, 1000); */
				}}
			>
				{(props) => (
					<Form onSubmit={props.handleSubmit}>
						<FormGroup>
							<Label for="title">Title</Label>
							<Input
								type="text"
								name="title"
								id="create-title"
								placeholder="task title"
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.title}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="description">description (optional)</Label>
							<Input
								type="text"
								name="description"
								id="create-description"
								placeholder="task description"
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.description}
							/>
						</FormGroup>

						<FormGroup>
							<Label for="time_estimate">
								time estimate (optional: answer in minutes)
							</Label>
							<Input
								type="number"
								min="0"
								name="time_estimate"
								id="create-time_estimate"
								placeholder="task time_estimate"
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.time_estimate}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="time_estimate">due date (optional)</Label>
							<Input
								type="datetime-local"
								name="due"
								min={new Date()}
								id="create-due"
								placeholder="task due"
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.due}
							/>
						</FormGroup>

						{props.errors.name && <div id="feedback">{props.errors.name}</div>}
						<Button type="submit">Submit</Button>
					</Form>
				)}
			</Formik>
			<br />
			<Button onClick={() => props.createToggle()}>Cancel</Button>
		</Container>
	);
}

export default Create;
