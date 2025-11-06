import express from "express";
import Candidate from "../models/Candidate.js";




const router = express.Router();

router.get("/test", (req, res) => {
  res.send("✅ videoRoutes connected");
});


// upload base64 video
router.post("/upload/:candidateId", async (req, res) => {
  try {
    const { candidateId } = req.params;
    const { videoData } = req.body;

    if (!videoData) {
      return res.status(400).json({ message: "Video missing" });
    }

    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // store inside candidate document
    candidate.video = videoData;
    await candidate.save();

    return res.status(200).json({ message: "Video saved" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



// 📄 GET candidate info with video
router.get("/:id", async (req, res) => {
  const candidate = await Candidate.findById(req.params.id);
  if (!candidate) return res.status(404).json({ message: "Candidate not found" });

  res.json({
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    positionApplied: candidate.positionApplied,
    currentPosition: candidate.currentPosition,
    experience: candidate.experience,
    video: candidate.video,
  });
});

export default router;
