import { ChangeEvent, FormEvent, useState } from "react";
import { MarksFormProps, student } from "./types";
import axios from "axios";

export default function MarksForm({ student, closeForm }: MarksFormProps) {
  // Assuming `mark` contains keys like quiz1, quiz2, assig1, assig2, etc.
  const [marksData, setMarksData] = useState<student>(student);
  const [marks, setMarks] = useState<number>(0);
  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    // Use a functional state update to ensure we always have the latest state
    setMarksData((currentMarksData) => {
      // Make a deep copy of the current marks data
      const updatedMarks = currentMarksData.marks.map((mark, markIndex) =>
        index === markIndex
          ? { ...mark, marks: parseFloat(e.target.value) }
          : mark
      );
      console.log("updatedMarks", updatedMarks);

      // Return the updated marks data object
      return { ...currentMarksData, marks: updatedMarks };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/students/save", marksData);
      console.log("Response data:", res.data); // Logging the response data for debugging
      // Handle the response as needed
    } catch (error) {
      console.error("There was an error saving the data:", error);
      // Handle the error accordingly
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <th>Name : </th>
              <td>{student.name}</td>
            </tr>
            <tr>
              <th>Reg No : </th>
              <td>{student.regno}</td>
            </tr>
            {student.marks.map((m, index) => (
              <tr key={index}>
                <th>{m.head.toString()}</th>
                <td>
                  <input
                    type="number"
                    name={m.marks.toString()}
                    value={
                      marks?.toString() !== "0"
                        ? marks.toString()
                        : m.marks.toString()
                    } // Convert the number to a string for the input value
                    onChange={(e) => {
                      setMarks(parseFloat(e.target.value)); // Convert the value to a number
                      handleChange(index, e);
                    }}
                  />
                </td>
              </tr>
            ))}
            {/* Add more input fields for other mark types if needed */}
          </tbody>
        </table>
        <button type="submit">Save</button>
        <button onClick={closeForm}>Close</button>
      </form>
    </div>
  );
}
