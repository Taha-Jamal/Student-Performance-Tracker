import express from "express";
const router = express.Router();
import { db } from "../models/index.js";
import { Mark } from "../models/Mark.js";

router.get("/students", async (req, res) => {
  try {
    const studentsWithDetails = await db.Student.aggregate([
      {
        $lookup: {
          from: "marks",
          localField: "regno",
          foreignField: "regno",
          as: "marks",
          pipeline: [
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
      {
        $addFields: {
          totalMarks: { $sum: "$marks.marks" },
        },
      },
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
      {
        $project: {
          _id: 1,
          regno: 1,
          name: 1,
          marks: {
            $map: {
              input: "$marks",
              as: "mark",
              in: {
                mid: "$$mark.mid",
                hid: "$$mark.hid",
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

    res.status(200).json(studentsWithDetails);
  } catch (error) {
    res.status(500).send(error);
  }
  //   res.status(200).json(students);
});

router.get("/students/:id", async (req, res) => {
  const student = await db.Student.findOne({ _id: req.params.id });
  res.status(200).json(student);
});

router.post("/students/:id", async (req, res) => {
  // const student = await db.Student.updateOne({ _id: req.params.id });
  try {
    await Promise.all(
      req.body.marks.map(async (mark) => {
        await db.Mark.updateOne(
          { regno: req.params.id, hid: mark.hid },
          { $set: { marks: mark.marks } }
          // (err, doc) => {}
        );
      })
    );
    res.status(200).json({});
  } catch (error) {
    res.status(500).send(error);
  }
});

// router.post("/students/save", async (req, res) => {
//   const session = await db.Student.startSession();
//   session.startTransaction();
//   try {
//     const students = req.body;
//     const studentsWithDetails = await db.Student.insertMany(students, {
//       session,
//     });
//     await session.commitTransaction();
//     session.endSession();
//     res.status(200).json(studentsWithDetails);
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     res.status(500).send(error);
//   }
// });

export default router;
