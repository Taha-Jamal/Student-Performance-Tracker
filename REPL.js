import { db } from "../models/index.js";

const studentsWithDetails = await db.Student.aggregate([
  // Step 1: Join with the Mark collection
  {
    $lookup: {
      from: "marks",
      localField: "regno",
      foreignField: "regno",
      as: "marks",
      pipeline: [
        // Automatically populate student and head in the Mark collection
        {
          $lookup: {
            from: "heads",
            localField: "hid",
            foreignField: "hid",
            as: "head",
          },
        },
        {
          $unwind: "$head",
        },
      ],
    },
  },
  // Step 2: Calculate the total marks for each student
  {
    $addFields: {
      totalMarks: { $sum: "$marks.marks" },
    },
  },
  // Step 3: Determine the grade based on total marks
  {
    $lookup: {
      from: "grades",
      let: { totalMarks: "$totalMarks" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $gte: ["$$totalMarks", "$start"] },
                { $lte: ["$$totalMarks", "$end"] },
              ],
            },
          },
        },
      ],
      as: "grade",
    },
  },
  {
    $unwind: {
      path: "$grade",
      preserveNullAndEmptyArrays: true,
    },
  },
  // Step 4: Project the required fields
  {
    $project: {
      _id: 0,
      regno: 1,
      name: 1,
      marks: {
        $map: {
          input: "$marks",
          as: "mark",
          in: {
            mid: "$$mark.mid",
            marks: "$$mark.marks",
            head: "$$mark.head.headname",
            total: "$$mark.head.total",
          },
        },
      },
      totalMarks: 1,
      grade: "$grade.grade",
    },
  },
]).exec();

return studentsWithDetails;
