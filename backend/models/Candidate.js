import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  positionApplied: { type: String, required: true },
  currentPosition: { type: String, required: true },
  experience: { type: Number, required: true },

  resume: {
    data: Buffer,
    contentType: String,
    originalName: String,
  },

  // Store video as Base64 string or file path
  video: { type: String, default: "" },
});

export default mongoose.model("Candidate", CandidateSchema);
