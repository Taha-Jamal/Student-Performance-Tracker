// import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import { MarksFormProps, mark } from "./types";
// import axios from "axios";


// export default function CourseForm({ student, closeForm }: MarksFormProps) {
// 	const [mark, setMark] = useState<any>([]);

//   // const [students, setstudent] = useState<any[]>([]);

// 	const getCourseById = async () => {
// 		const response = (await axios.get(`/api/students/${student}`)).data;
// 		if (response !== null) {
// 			setMark(response);
//       console.log(response)
//       console.log(setMark)
// 		}
// 	};

// 	useEffect(() => {
// 		getCourseById();
// 	}, [student]);

// 	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// 		const { name, value } = e.currentTarget;
// 		setMark({ ...mark, [name]: value });
// 	};

//     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         closeForm();
//     }

// 	return (
// 		<div>
// 			{Object.keys(mark).length !== 0 && (
// 				<form onSubmit={handleSubmit}>
// 					<table>
// 						<tbody>
// 							<tr>
// 								<th>Id : </th>
// 								<td>
// 									{student._id}
// 									<input type="hidden" name="name" defaultValue={student.name} />
// 								</td>
// 							</tr>
// 							<tr>
// 								<th> : </th>
// 								<td>
// 									<input type="text" name="regno" value={student.regno} onChange={handleChange} />
// 								</td>
// 							</tr>
// 							<tr>
// 								<th>Title : </th>
// 								<td>
// 									<textarea name="title" id="quiz1" cols={30} rows={2} value={student.marks.map()} onChange={handleChange} />
// 								</td>
// 							</tr>
// 							<tr>
// 								<th>Semester : </th>
// 								<td>
// 									<input type="text" name="quiz2" value={student.map(s) => {s.marks.quiz2}} onChange={handleChange} />
// 								</td>
// 							</tr>
// 							<tr>
// 								<th>CrHr : </th>
// 								<td>
// 									<input type="text" name="ass1" value={course.crhr} onChange={handleChange} />
// 								</td>
// 							</tr>
// 							<tr>
// 								<td colSpan={2}>
// 									<input type="submit" value="Save" />
// 								</td>
// 							</tr>
// 						</tbody>
// 					</table>
// 				</form>
// 			)}
// 			{/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
// 		</div>
// 	);
// }


