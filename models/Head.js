import { model, Schema } from "mongoose";
import { mongoose } from "mongoose";

const headSchema = new Schema({
  hid: Number,
  headname: String,
  total: Number,
  marks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mark",
  },
});

export const Head = model("Head", headSchema);
